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

  // ── DIAGNOSTIC LOG 1 ──────────────────────────────────────────────────────
  // Expected in Vercel logs:
  //   [cb:params] { hasCode: false, hasTokenHash: true, tokenHashPrefix: 'pkce_xxxxx', type: 'magiclink' }
  //   [cb:cookies] ['sb-xxx-auth-code-verifier', ...]   ← must include the verifier
  //
  // If tokenHashPrefix starts with 'pkce_' AND 'sb-xxx-auth-code-verifier' is
  // NOT in the cookie list, verifyOtp will fail because the PKCE code verifier
  // is missing (link opened in a different browser/device than where OTP was requested).
  console.log('[cb:params]', {
    hasCode: !!code,
    hasTokenHash: !!token_hash,
    tokenHashPrefix: token_hash?.substring(0, 15),
    type,
  })
  console.log('[cb:cookies]', request.cookies.getAll().map(c => c.name))
  // ─────────────────────────────────────────────────────────────────────────

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
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    // ── DIAGNOSTIC LOG 2a ──────────────────────────────────────────────────
    // Expected (success): [cb:code] { error: null, hasUser: true, pendingCookiesCount: 2+ }
    // If error: the code is expired or the code-verifier cookie is missing.
    console.log('[cb:code]', {
      error: error?.message ?? null,
      hasUser: !!data?.user,
      userId: data?.user?.id ?? null,
      pendingCookiesCount: pendingCookies.length,
      pendingCookieNames: pendingCookies.map(c => c.name),
    })
    // ────────────────────────────────────────────────────────────────────────

    if (!error) user = data.user
  } else if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'magiclink' | 'signup' | 'email',
    })

    // ── DIAGNOSTIC LOG 2b ──────────────────────────────────────────────────
    // Expected (success): [cb:otp] { error: null, hasUser: true, pendingCookiesCount: 2+ }
    //
    // If error is 'invalid otp' or 'Token has expired' → token already used or stale.
    // If error is 'PKCE flow' or similar → verifyOtp is the wrong method for pkce_ tokens;
    //   the token should be passed to exchangeCodeForSession() instead.
    // If pendingCookiesCount === 0 even on success → setAll is never called;
    //   session is not persisted and the browser gets no cookies.
    console.log('[cb:otp]', {
      error: error?.message ?? null,
      errorCode: (error as { code?: string } | null)?.code ?? null,
      hasUser: !!data?.user,
      userId: data?.user?.id ?? null,
      pendingCookiesCount: pendingCookies.length,
      pendingCookieNames: pendingCookies.map(c => c.name),
    })
    // ────────────────────────────────────────────────────────────────────────

    if (!error) user = data.user
  }

  if (!user) {
    console.log('[cb:fail] no user after auth — redirecting to error')
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

  console.log('[cb:success]', {
    userId: user.id,
    destination,
    cookiesOnResponse: response.cookies.getAll().map(c => c.name),
  })

  return response
}
