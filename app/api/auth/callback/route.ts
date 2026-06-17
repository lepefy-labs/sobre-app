import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard/home'

  // Accumulate cookies written by the Supabase client during auth exchange
  // and apply them manually to the redirect response.
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

  let userId: string | null = null

  if (code) {
    // OAuth or PKCE authorization code — reads code_verifier from cookies
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) userId = data.user?.id ?? null
  } else if (token_hash && type) {
    // Email OTP (magic link / signup confirmation)
    // In @supabase/supabase-js >= 2.64 the code_verifier is read automatically
    // from the request cookies and sent to Supabase, completing the PKCE exchange.
    const { data, error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (!error) userId = data.user?.id ?? null
  }

  if (!userId) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
  }

  // Check onboarding status and redirect accordingly
  let destination = `${origin}${redirectTo}`

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', userId)
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
