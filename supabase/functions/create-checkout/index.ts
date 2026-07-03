// supabase functions deploy create-checkout
import Stripe from 'npm:stripe'
import { createClient } from 'npm:@supabase/supabase-js'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  const { plan, successUrl, cancelUrl } = await req.json()
  const authHeader = req.headers.get('Authorization')!
  const token = authHeader.replace('Bearer ', '')
  const { data: { user } } = await supabase.auth.getUser(token)
  if (!user) return new Response('Unauthorized', { status: 401 })

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const priceId = plan === 'monthly'
    ? Deno.env.get('STRIPE_PRICE_MONTHLY')!
    : Deno.env.get('STRIPE_PRICE_YEARLY')!

  const session = await stripe.checkout.sessions.create({
    customer: subscription?.stripe_customer_id ?? undefined,
    customer_email: subscription?.stripe_customer_id ? undefined : user.email,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { supabase_user_id: user.id },
  })

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
