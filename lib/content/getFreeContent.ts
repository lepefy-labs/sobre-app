import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, ContentType, ContentLang, MoodValue, NotificationSlot } from '@/types/database'

type ContentRow = { id: string; type: ContentType; title: string | null; body: string; tags: string[] }
type MoodRow = { value: MoodValue }

export type FreeContent = {
  id: string
  type: ContentType
  title: string | null
  body: string
  tags: string[]
} | null

export async function getFreeContent(
  supabase: SupabaseClient<Database>,
  userId: string,
  lang: ContentLang,
  slot: NotificationSlot
): Promise<FreeContent> {
  const today = new Date().toISOString().split('T')[0]

  const { data: lastMoodRaw } = await supabase
    .from('moods')
    .select('value')
    .eq('user_id', userId)
    .eq('recorded_date', today)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  const lastMood: MoodValue | null = (lastMoodRaw as MoodRow | null)?.value ?? null

  const baseQuery = supabase
    .from('contents')
    .select('id, type, title, body, tags')
    .eq('lang', lang)
    .eq('slot', slot)
    .eq('is_active', true)

  const { data: contentsRaw } = await (
    lastMood !== null
      ? baseQuery.or(`mood_target.is.null,mood_target.eq.${lastMood}`)
      : baseQuery.is('mood_target', null)
  ).limit(50)
  const contents = contentsRaw as ContentRow[] | null

  if (!contents || contents.length === 0) return null

  const picked = contents[Math.floor(Math.random() * contents.length)]
  return { id: picked.id, type: picked.type, title: picked.title, body: picked.body, tags: picked.tags }
}
