'use server'

import { createClient } from '@/lib/supabase/server'
import type { ContentType, MoodValue, NotificationSlot } from '@/types/database'

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

export async function getHomeData(slot: NotificationSlot): Promise<HomeData> {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Utente non autenticato')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('name, lang')
    .eq('id', user.id)
    .single()

  // Check mood already recorded today for this slot
  const today = new Date().toISOString().split('T')[0]
  const { data: todayMoodRow } = await supabase
    .from('moods')
    .select('value')
    .eq('user_id', user.id)
    .eq('slot', slot)
    .eq('recorded_date', today)
    .maybeSingle<{ value: MoodValue }>()

  const todayMood: MoodValue | null = todayMoodRow?.value ?? null

  // Try personalized content via DB function
  const { data: fnResult } = await supabase.rpc(
    'get_today_content',
    { p_user_id: user.id, p_slot: slot } as never
  )

  type RpcRow = { content_id: string; content_type: ContentType; title: string | null; body: string; tags: string[] }
  const rpcRows = fnResult as RpcRow[] | null

  if (rpcRows && rpcRows.length > 0) {
    const row = rpcRows[0]
    return {
      user: { name: profile?.name ?? null },
      content: {
        id: row.content_id,
        type: row.content_type,
        title: row.title,
        body: row.body,
        tags: row.tags,
      },
      todayMood,
    }
  }

  // Fallback: query contents table
  const lang = profile?.lang ?? 'it'

  // Get last mood of the day (any slot) for mood_target matching
  const { data: lastMoodRow } = await supabase
    .from('moods')
    .select('value')
    .eq('user_id', user.id)
    .eq('recorded_date', today)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle<{ value: MoodValue }>()

  const lastMood: MoodValue | null = lastMoodRow?.value ?? null

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

  // Random ordering via postgres random — limit 1
  const { data: contents } = await query.limit(50)

  let content: HomeData['content'] = null
  if (contents && contents.length > 0) {
    const picked = contents[Math.floor(Math.random() * contents.length)]
    content = {
      id: picked.id,
      type: picked.type,
      title: picked.title,
      body: picked.body,
      tags: picked.tags,
    }
  }

  return {
    user: { name: profile?.name ?? null },
    content,
    todayMood,
  }
}

export async function saveMood(
  slot: NotificationSlot,
  value: MoodValue
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Utente non autenticato' }
  }

  const today = new Date().toISOString().split('T')[0]

  const { error } = await supabase.from('moods').upsert(
    {
      user_id: user.id,
      value,
      slot,
      recorded_date: today,
      note: null,
    },
    { onConflict: 'user_id,slot,recorded_date', ignoreDuplicates: false }
  )

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
