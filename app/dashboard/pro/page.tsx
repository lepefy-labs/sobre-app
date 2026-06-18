import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProUpgrade from './ProUpgrade'

export default async function ProPage() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  const subscriptionStatus = (profile as { subscription_status: string } | null)?.subscription_status ?? 'free'

  return <ProUpgrade subscriptionStatus={subscriptionStatus} />
}
