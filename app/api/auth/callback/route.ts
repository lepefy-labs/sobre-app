import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import type { User } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard/home'

  // PKCE magic-link tokens (pkce_ prefix) cannot be verified server-side
  // because @supabase/supabase-js v2.43 does not forward the code_verifier
  // in the verifyOtp() request body, causing Supabase to return user but
  // session: null. The code_verifier lives in the browser cookie set by
  // signInWithOtp(). Delegate to the client-side /auth/confirm page, which
  // uses createBrowserClient — the browser handles the PKCE exchange natively
  // and stores the session in cookies automatically.
  if (token_hash?.startsWith('pkce_') && type) {
    const confirmUrl = new URL(`${origin}/auth/confirm`)
    confirmUrl.searchParams.set('token_hash', token_hash)
    confirmUrl.searchParams.set('type', type)
    confirmUrl.searchParams.set('redirectTo', redirectTo)
    return NextResponse.redirect(confirmUrl)
  }

  const pendingCookies: { name: string; value: string; options?: object }[] = []

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          pendingCookies.push(...cookiesToSet)
        },
      },
    }
  )

  let user: User | null = null

  if (code) {
    // OAuth / PKCE authorization code — exchangeCodeForSession reads the
    // code-verifier cookie and completes the exchange.
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) user = data.user
  } else if (token_hash && type) {
    // Standard OTP (non-PKCE): plain token_hash, verifyOtp works correctly.
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'magiclink' | 'signup' | 'email',
    })
    if (!error) user = data.user
  }

  if (!user) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
  }

  let destination = `${origin}${redirectTo}`

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', user.id)
    .single<{ onboarding_completed: boolean }>()

  if (profile && !profile.onboarding_completed) {
    destination = `${origin}/onboarding`
  }

  const response = NextResponse.redirect(destination)

  pendingCookies.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options as object)
  })

  return response
}
