import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard/home'

  const supabase = createClient()

  // Flusso PKCE con code (OAuth)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return handlePostAuth(supabase, origin, redirectTo)
    }
  }

  // Flusso magic link con token_hash
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'magiclink' | 'signup' | 'email',
    })
    if (!error) {
      return handlePostAuth(supabase, origin, redirectTo)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
}

async function handlePostAuth(
  supabase: ReturnType<typeof import('@/lib/supabase/server').createClient>,
  origin: string,
  redirectTo: string
) {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single<{ onboarding_completed: boolean }>()

    if (profile && !profile.onboarding_completed) {
      return NextResponse.redirect(`${origin}/onboarding`)
    }
  }

  return NextResponse.redirect(`${origin}${redirectTo}`)
}
