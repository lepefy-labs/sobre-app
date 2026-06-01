import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard/home'

  if (code) {
    const supabase = createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Controlla se l'utente ha completato l'onboarding
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', user.id)
          .single()

        // Nuovo utente: vai all'onboarding
        if (profile && !profile.onboarding_completed) {
          return NextResponse.redirect(`${origin}/onboarding`)
        }
      }

      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  // Errore: redirect al login con messaggio
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
}
