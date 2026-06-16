import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as object)
          )
        },
      },
    }
  )

  const { data: { user }, error: getUserError } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // ── DIAGNOSTIC LOG ────────────────────────────────────────────────────────
  // Expected after a successful callback redirect to /dashboard/home:
  //   [mw] { pathname: '/dashboard/home', hasUser: true, userId: 'uuid...', error: null }
  //
  // If hasUser is false here, the session cookies from the callback were not
  // received by the browser. Check:
  //   1. [cb:success] log — were cookiesOnResponse non-empty?
  //   2. Browser DevTools → Network → the callback redirect response headers:
  //      must include Set-Cookie with sb-xxx-auth-token(.0/.1) entries.
  //   3. [cb:otp] error — was verifyOtp actually successful?
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding') || pathname.startsWith('/profile')) {
    console.log('[mw]', {
      pathname,
      hasUser: !!user,
      userId: user?.id ?? null,
      error: getUserError?.message ?? null,
      incomingCookieNames: request.cookies.getAll().map(c => c.name),
    })
  }
  // ─────────────────────────────────────────────────────────────────────────

  const protectedRoutes = ['/dashboard', '/onboarding', '/profile']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirectTo', pathname)
    const response = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach(cookie => {
      response.cookies.set(cookie.name, cookie.value, cookie)
    })
    return response
  }

  if (user && pathname.startsWith('/auth/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/home'
    const response = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach(cookie => {
      response.cookies.set(cookie.name, cookie.value, cookie)
    })
    return response
  }

  return supabaseResponse
}
