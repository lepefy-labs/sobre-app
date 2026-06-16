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
    // Standard PKCE OAuth code — exchangeCodeForSession reads the
    // code-verifier cookie and completes the PKCE exchange.
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) user = data.user

  } else if (token_hash && type) {

    if (token_hash.startsWith('pkce_')) {
      // @supabase/supabase-js v2.43 verifyOtp() does not forward the
      // code_verifier when calling POST /auth/v1/verify, so the Supabase
      // server verifies the OTP identity but refuses to create a session
      // (returns user: {...}, session: null). pendingCookies stays empty and
      // the browser receives no Set-Cookie headers — hence the auth loop.
      //
      // Fix: POST directly to /auth/v1/verify with the code_verifier already
      // stored in the browser cookie by signInWithOtp(). On success, call
      // setSession() so the SSR storage adapter fires setAll() and writes the
      // session tokens into pendingCookies.
      const projectRef = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname.split('.')[0]
      const codeVerifier = request.cookies.get(
        `sb-${projectRef}-auth-token-code-verifier`
      )?.value

      const verifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({
            token_hash,
            type,
            ...(codeVerifier ? { code_verifier: codeVerifier } : {}),
          }),
        }
      )

      if (verifyRes.ok) {
        const tokenData = await verifyRes.json() as {
          access_token?: string
          refresh_token?: string
          error?: string
        }

        if (tokenData.access_token && tokenData.refresh_token) {
          // setSession() decodes the JWT locally and calls _saveSession()
          // → setAll() → pendingCookies gets the session chunks.
          const { data, error } = await supabase.auth.setSession({
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
          })
          if (!error) user = data.user
        }
      }

    } else {
      // Standard OTP magic-link (non-PKCE): plain token_hash, verifyOtp works.
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as 'magiclink' | 'signup' | 'email',
      })
      if (!error) user = data.user
    }
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

  // Attach every cookie Supabase wrote (session chunks + code-verifier
  // deletion) to the redirect so the browser stores the session.
  pendingCookies.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options as object)
  })

  return response
}
