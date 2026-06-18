import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

type SubscriptionStatus = 'free' | 'pro' | 'cancelled' | 'past_due'

function mapStripeStatus(status: string): SubscriptionStatus {
  if (status === 'active') return 'pro'
  if (status === 'past_due') return 'past_due'
  return 'cancelled'
}

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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.supabase_user_id
    const stripeCustomerId = typeof session.customer === 'string' ? session.customer : null
    const stripeSubscriptionId = typeof session.subscription === 'string' ? session.subscription : null

    if (userId) {
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
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription
    const subscriptionId = subscription.id
    const newStatus = mapStripeStatus(subscription.status)

    await supabase
      .from('subscriptions' as never)
      .update({ status: newStatus } as never)
      .eq('stripe_subscription_id', subscriptionId)

    const { data: sub } = await supabase
      .from('subscriptions' as never)
      .select('user_id')
      .eq('stripe_subscription_id', subscriptionId)
      .maybeSingle()

    const userId = (sub as { user_id: string } | null)?.user_id
    if (userId) {
      await supabase
        .from('profiles')
        .update({ subscription_status: newStatus } as never)
        .eq('id', userId)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const subscriptionId = subscription.id

    await supabase
      .from('subscriptions' as never)
      .update({ status: 'cancelled' } as never)
      .eq('stripe_subscription_id', subscriptionId)

    const { data: sub } = await supabase
      .from('subscriptions' as never)
      .select('user_id')
      .eq('stripe_subscription_id', subscriptionId)
      .maybeSingle()

    const userId = (sub as { user_id: string } | null)?.user_id
    if (userId) {
      await supabase
        .from('profiles')
        .update({ subscription_status: 'cancelled' } as never)
        .eq('id', userId)
    }
  }

  return NextResponse.json({ received: true })
}
