'use server'

import { createClient } from '@/lib/supabase/server'
import type { ContentLang } from '@/types/database'

interface OnboardingPayload {
  name: string
  lang: ContentLang
  morningTime: string
  eveningTime: string
}

interface OnboardingResult {
  success: boolean
  error?: string
}

export async function saveOnboarding(
  payload: OnboardingPayload
): Promise<OnboardingResult> {
  const supabase = createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    console.error('saveOnboarding error:', authError)
    return { success: false, error: 'not_authenticated' }
  }

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email ?? '',
      name: payload.name || null,
      lang: payload.lang,
      notif_morning_time: payload.morningTime,
      notif_evening_time: payload.eveningTime,
      onboarding_completed: true,
    } as never)

  if (error) {
    console.error('saveOnboarding error:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
