'use server'

import { createClient } from '@/lib/supabase/server'
import { getFreeContent } from '@/lib/content/getFreeContent'
import type { ContentType, ContentLang, MoodValue, NotificationSlot } from '@/types/database'

export type SubscriptionStatus = 'free' | 'pro' | 'cancelled' | 'past_due'

export type HomeData = {
  user: { name: string | null }
  lang: ContentLang
  content: {
    id: string
    type: ContentType
    title: string | null
    body: string
    tags: string[]
  } | null
  todayMood: MoodValue | null
  subscriptionStatus: SubscriptionStatus
}

type ProfileRow = { name: string | null; lang: ContentLang; subscription_status: SubscriptionStatus | null }
type MoodRow = { value: MoodValue }
type RpcRow = { content_id: string; content_type: ContentType; title: string | null; body: string; tags: string[] }

export async function getHomeData(slot: NotificationSlot): Promise<HomeData> {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Utente non autenticato')

  const today = new Date().toISOString().split('T')[0]

  const { data: profileRaw } = await supabase
    .from('profiles')
    .select('name, lang, subscription_status')
    .eq('id', user.id)
    .single()
  const profile = profileRaw as ProfileRow | null

  const { data: todayMoodRaw } = await supabase
    .from('moods')
    .select('value')
    .eq('user_id', user.id)
    .eq('slot', slot)
    .eq('recorded_date', today)
    .maybeSingle()
  const todayMood: MoodValue | null = (todayMoodRaw as MoodRow | null)?.value ?? null

  // Try personalized content via DB function
  const { data: fnRaw } = await supabase.rpc('get_today_content' as never, {
    p_user_id: user.id,
    p_slot: slot,
  } as never)
  const rpcRows = fnRaw as RpcRow[] | null

  if (rpcRows && rpcRows.length > 0) {
    const row = rpcRows[0]
    return {
      user: { name: profile?.name ?? null },
      lang: profile?.lang ?? 'it',
      content: { id: row.content_id, type: row.content_type, title: row.title, body: row.body, tags: row.tags },
      todayMood,
      subscriptionStatus: profile?.subscription_status ?? 'free',
    }
  }

  // Fallback: query contents table
  const lang: ContentLang = profile?.lang ?? 'it'
  const content = await getFreeContent(supabase, user.id, lang, slot)

  return { user: { name: profile?.name ?? null }, lang, content, todayMood, subscriptionStatus: profile?.subscription_status ?? 'free' }
}

export async function saveMood(
  slot: NotificationSlot,
  value: MoodValue
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { success: false, error: 'Utente non autenticato' }

  const today = new Date().toISOString().split('T')[0]

  const { error } = await supabase.from('moods').upsert(
    { user_id: user.id, value, slot, recorded_date: today, note: null } as never,
    { onConflict: 'user_id,slot,recorded_date', ignoreDuplicates: false }
  )

  return error ? { success: false, error: error.message } : { success: true }
}
