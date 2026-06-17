'use server'

import { createClient } from '@/lib/supabase/server'
import type { ContentType, ContentLang, MoodValue, NotificationSlot } from '@/types/database'

export type HomeData = {
  user: { name: string | null }
  content: {
    id: string
    type: ContentType
    title: string | null
    body: string
    tags: string[]
  } | null
  todayMood: MoodValue | null
}

type ProfileRow = { name: string | null; lang: ContentLang }
type MoodRow = { value: MoodValue }
type ContentRow = { id: string; type: ContentType; title: string | null; body: string; tags: string[] }
type RpcRow = { content_id: string; content_type: ContentType; title: string | null; body: string; tags: string[] }

export async function getHomeData(slot: NotificationSlot): Promise<HomeData> {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Utente non autenticato')

  const today = new Date().toISOString().split('T')[0]

  const { data: profileRaw } = await supabase
    .from('profiles')
    .select('name, lang')
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
      content: { id: row.content_id, type: row.content_type, title: row.title, body: row.body, tags: row.tags },
      todayMood,
    }
  }

  // Fallback: query contents table
  const lang: ContentLang = profile?.lang ?? 'it'

  const { data: lastMoodRaw } = await supabase
    .from('moods')
    .select('value')
    .eq('user_id', user.id)
    .eq('recorded_date', today)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  const lastMood: MoodValue | null = (lastMoodRaw as MoodRow | null)?.value ?? null

  let query = supabase
    .from('contents')
    .select('id, type, title, body, tags')
    .eq('lang', lang)
    .eq('slot', slot)
    .eq('is_active', true)

  if (lastMood !== null) {
    query = query.or(`mood_target.is.null,mood_target.eq.${lastMood}`)
  } else {
    query = query.is('mood_target', null)
  }

  const { data: contentsRaw } = await query.limit(50)
  const contents = contentsRaw as ContentRow[] | null

  let content: HomeData['content'] = null
  if (contents && contents.length > 0) {
    const picked = contents[Math.floor(Math.random() * contents.length)]
    content = { id: picked.id, type: picked.type, title: picked.title, body: picked.body, tags: picked.tags }
  }

  return { user: { name: profile?.name ?? null }, content, todayMood }
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
    { user_id: user.id, value, slot, recorded_date: today, note: null },
    { onConflict: 'user_id,slot,recorded_date', ignoreDuplicates: false }
  )

  return error ? { success: false, error: error.message } : { success: true }
}
