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
    // Standard PKCE OAuth/email code — exchangeCodeForSession reads the
    // code-verifier cookie and completes the PKCE exchange.
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) user = data.user
  } else if (token_hash) {
    if (token_hash.startsWith('pkce_')) {
      // Supabase PKCE magic-link: the URL carries token_hash=pkce_xxx (not
      // ?code=xxx) but the value IS a PKCE authorization code.
      // verifyOtp() would return the user but NO session and never call
      // setAll(), so the browser ends up with zero session cookies.
      // exchangeCodeForSession() reads the code-verifier already stored in
      // the browser cookie and completes the PKCE exchange correctly.
      const { data, error } = await supabase.auth.exchangeCodeForSession(token_hash)
      if (!error) user = data.user
    } else if (type) {
      // Standard OTP magic-link (non-PKCE): token_hash is a plain OTP hash.
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

  pendingCookies.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options as object)
  })

  return response
}
