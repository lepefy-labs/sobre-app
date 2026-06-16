import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard/home'

  // Accumulate cookies that Supabase wants to set, then apply them to the
  // final redirect response. Using next/headers cookieStore.set() here would
  // write into the framework's implicit response, not into our NextResponse.redirect(),
  // so the browser would receive the redirect with no Set-Cookie headers and
  // the session would be lost immediately.
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

  let authFailed = true

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) authFailed = false
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'magiclink' | 'signup' | 'email',
    })
    if (!error) authFailed = false
  }

  if (authFailed) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
  }

  let destination = `${origin}${redirectTo}`

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single<{ onboarding_completed: boolean }>()

    if (profile && !profile.onboarding_completed) {
      destination = `${origin}/onboarding`
    }
  }

  const response = NextResponse.redirect(destination)

  // Attach session cookies to the redirect so the browser stores them.
  pendingCookies.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options as object)
  })

  return response
}
