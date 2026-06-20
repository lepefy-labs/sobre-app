'use server'

import { createClient } from '@/lib/supabase/server'

export async function saveOneSignalPlayerId(
  playerId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { success: false, error: 'Utente non autenticato' }

  const { error } = await supabase
    .from('profiles')
    .update({ onesignal_player_id: playerId } as never)
    .eq('id', user.id)

  return error ? { success: false, error: error.message } : { success: true }
}
