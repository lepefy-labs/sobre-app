import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

const PRICE_IDS: Record<'monthly' | 'yearly', string> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY!,
  yearly: process.env.STRIPE_PRICE_YEARLY!,
}

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Non autenticato' }, { status: 401 })
  }

  const body = await request.json()
  const planKey = body.priceId as 'monthly' | 'yearly'
  const priceId = PRICE_IDS[planKey]
  if (!priceId) {
    return NextResponse.json({ error: 'Piano non valido' }, { status: 400 })
  }

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .maybeSingle()

  const stripeCustomerId = (sub as { stripe_customer_id: string | null } | null)?.stripe_customer_id

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/dashboard/pro/success`,
    cancel_url: `${baseUrl}/dashboard/pro`,
    ...(stripeCustomerId
      ? { customer: stripeCustomerId }
      : { customer_email: user.email }),
    metadata: { supabase_user_id: user.id },
  })

  return NextResponse.json({ url: session.url })
}
