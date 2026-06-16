'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Client-side PKCE magic-link confirmation.
//
// The server-side callback cannot complete the PKCE exchange for pkce_ tokens
// because @supabase/supabase-js v2.43 does not send the code_verifier in
// verifyOtp(). The code_verifier lives in a browser cookie written by
// signInWithOtp(). Here the browser Supabase client handles the full PKCE
// exchange natively and stores the session in cookies automatically.
export default function ConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const redirectTo = searchParams.get('redirectTo') ?? '/dashboard/home'

    if (!token_hash || !type) {
      router.replace('/auth/login?error=invalid_link')
      return
    }

    const supabase = createClient()

    supabase.auth
      .verifyOtp({ token_hash, type: type as 'magiclink' | 'signup' | 'email' })
      .then(({ data, error }) => {
        if (error || !data.user) {
          router.replace('/auth/login?error=auth_callback_failed')
        } else {
          router.replace(redirectTo)
        }
      })
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <p className="text-sm text-stone-400">Accesso in corso…</p>
    </div>
  )
}
