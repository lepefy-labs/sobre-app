import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { getFreeContent } from '@/lib/content/getFreeContent'
import type { ContentLang, NotificationSlot } from '@/types/database'

export const dynamic = 'force-dynamic'

const VALID_SLOTS: NotificationSlot[] = ['morning', 'evening']

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-internal-secret')
  if (!secret || secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const userId = searchParams.get('user_id')
  const slotParam = searchParams.get('slot')

  if (!userId || !slotParam || !VALID_SLOTS.includes(slotParam as NotificationSlot)) {
    return NextResponse.json({ error: 'Missing or invalid params' }, { status: 400 })
  }

  const slot = slotParam as NotificationSlot
  const supabase = createServiceClient()

  const { data: profileRaw } = await supabase
    .from('profiles')
    .select('lang')
    .eq('id', userId)
    .maybeSingle()

  if (!profileRaw) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 })
  }

  const lang = (profileRaw as { lang: ContentLang }).lang

  const content = await getFreeContent(supabase, userId, lang, slot)

  return NextResponse.json({ content })
}
