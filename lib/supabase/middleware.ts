import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

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
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as object)
          )
        },
      },
    }
  )

  // IMPORTANT: do not add any code between createServerClient and getUser().
  // A simple mistake here could make session tokens expire and users get
  // randomly logged out. getUser() validates the token with the Supabase
  // Auth server on every request — do not replace with getSession().
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  const protectedRoutes = ['/dashboard', '/onboarding', '/profile']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  if (user && (pathname.startsWith('/auth/login') || pathname === '/lang' || pathname.startsWith('/landing'))) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/home'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: return supabaseResponse so that refreshed session cookies
  // are forwarded to the browser. Returning a new NextResponse here would
  // lose the refreshed tokens.
  return supabaseResponse
}
