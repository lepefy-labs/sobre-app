import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Escludi:
     * - _next/static (file statici)
     * - _next/image (image optimization)
     * - favicon.ico
     * - manifest.json, sw.js (PWA)
     * - /api/webhooks (webhook Stripe: autenticato via signature)
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icons|api/webhooks).*)',
  ],
}
