import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import type { User } from '@supabase/supabase-js'

// Force dynamic so Vercel never caches this route and strips Set-Cookie headers.
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard/home'

  // Collect cookies that Supabase wants to persist and apply them manually to
  // the final redirect response. We cannot use next/headers cookieStore.set()
  // here because those writes go into Next.js's implicit response, not into the
  // explicit NextResponse.redirect() we return — so the browser would receive
  // the redirect with no Set-Cookie headers and the session would be lost.
  //
  // IMPORTANT: we do NOT call supabase.auth.getUser() after the OTP/code
  // exchange. getUser() internally calls getSession(), which reads from
  // getAll() — still seeing the original empty request cookies, not the ones
  // just written by verifyOtp. In some @supabase/ssr versions this causes a
  // second setAll() call with maxAge=0 that overwrites the valid session
  // cookies in pendingCookies, effectively deleting the session before the
  // browser ever receives it. Instead we use the User object returned directly
  // by verifyOtp / exchangeCodeForSession.
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
    if (!error) user = data.user
  } else if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'magiclink' | 'signup' | 'email',
    })
    if (!error) user = data.user
  }

  if (!user) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
  }

  // Check onboarding using the User returned by the auth operation — no
  // extra getUser() call that would read stale empty request cookies.
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

  // Attach every cookie Supabase asked to set (session chunks, code-verifier
  // deletion, etc.) to the redirect response so the browser stores them.
  pendingCookies.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options as object)
  })

  return response
}
