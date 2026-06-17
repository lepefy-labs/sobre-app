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
    throw new Error('Utente non autenticato')
  }

  const { name, lang, morningTime, eveningTime } = payload

  const { error } = await supabase
    .from('profiles')
    .update({
      name,
      lang,
      notif_morning_time: morningTime,
      notif_evening_time: eveningTime,
      onboarding_completed: true,
    })
    .eq('id', user.id)

  if (error) {
    return { success: false, error: 'Qualcosa è andato storto. Riprova.' }
  }

  return { success: true }
}
