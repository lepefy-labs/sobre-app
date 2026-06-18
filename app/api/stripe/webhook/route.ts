import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

type SubscriptionStatus = 'free' | 'pro' | 'cancelled' | 'past_due'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Firma non valida' }, { status: 400 })
  }

  const supabase = createServiceClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id
      const stripeCustomerId = typeof session.customer === 'string' ? session.customer : null
      const stripeSubscriptionId = typeof session.subscription === 'string' ? session.subscription : null

      if (!userId) break

      await supabase.from('subscriptions' as never).upsert(
        {
          user_id: userId,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          status: 'pro',
        } as never,
        { onConflict: 'user_id' }
      )

      await supabase
        .from('profiles')
        .update({ subscription_status: 'pro' } as never)
        .eq('id', userId)

      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription

      let status: SubscriptionStatus
      if (subscription.status === 'active') status = 'pro'
      else if (subscription.status === 'past_due') status = 'past_due'
      else status = 'cancelled'

      const { data: existingSub } = await supabase
        .from('subscriptions' as never)
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single()

      const userId = (existingSub as { user_id: string } | null)?.user_id
      if (!userId) break

      await supabase
        .from('subscriptions' as never)
        .update({ status } as never)
        .eq('stripe_subscription_id', subscription.id)

      await supabase
        .from('profiles')
        .update({ subscription_status: status } as never)
        .eq('id', userId)

      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription

      const { data: existingSub } = await supabase
        .from('subscriptions' as never)
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single()

      const userId = (existingSub as { user_id: string } | null)?.user_id
      if (!userId) break

      await supabase
        .from('subscriptions' as never)
        .update({ status: 'cancelled' } as never)
        .eq('stripe_subscription_id', subscription.id)

      await supabase
        .from('profiles')
        .update({ subscription_status: 'cancelled' } as never)
        .eq('id', userId)

      break
    }
  }

  return NextResponse.json({ received: true })
}
