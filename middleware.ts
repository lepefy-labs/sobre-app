import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Escludi:
     * - _next/static, _next/image (asset statici)
     * - favicon.ico, manifest.json, sw.js, icons (PWA)
     * - /api/auth/callback (il callback gestisce i cookie da solo — il
     *   middleware non ha sessione in questo punto e non deve interferire)
     * - /api/webhooks (webhook Stripe: autenticato via signature)
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icons|api/auth/callback|api/webhooks).*)',
  ],
}
