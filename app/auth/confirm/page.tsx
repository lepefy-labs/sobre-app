'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getLangFromStorage, getT } from '@/lib/i18n'

function ConfirmInner() {
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

    async function verify() {
      const supabase = createClient()

      // @supabase/supabase-js v2.43 does not include the code_verifier in
      // verifyOtp() for pkce_ tokens, so Supabase returns user but session:null.
      // Read the verifier from the cookie set by signInWithOtp() and POST
      // directly to /auth/v1/verify so the PKCE exchange completes correctly.
      if (token_hash!.startsWith('pkce_')) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const ref = new URL(supabaseUrl).hostname.split('.')[0]
        const cookieName = `sb-${ref}-auth-token-code-verifier`
        const match = document.cookie
          .split(';')
          .find(c => c.trim().startsWith(cookieName + '='))
        const codeVerifier = match
          ? decodeURIComponent(match.trim().slice(cookieName.length + 1))
          : null

        if (codeVerifier) {
          const res = await fetch(`${supabaseUrl}/auth/v1/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            },
            body: JSON.stringify({ token_hash, type, code_verifier: codeVerifier }),
          })
          const body = await res.json()
          if (body.access_token && body.refresh_token) {
            await supabase.auth.setSession({
              access_token: body.access_token,
              refresh_token: body.refresh_token,
            })
            router.replace(redirectTo)
            return
          }
        }
      }

      // Fallback for non-PKCE tokens (standard OTP)
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token_hash!,
        type: type as 'magiclink' | 'signup' | 'email',
      })
      if (error || !data.user) {
        router.replace('/auth/login?error=auth_callback_failed')
      } else {
        router.replace(redirectTo)
      }
    }

    verify()
  }, [router, searchParams])

  const loadingText = getT(getLangFromStorage()).auth.confirm.loading

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <p className="text-sm text-stone-400">{loadingText}</p>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <p className="text-sm text-stone-400">{getT(getLangFromStorage()).auth.confirm.loading}</p>
        </div>
      }
    >
      <ConfirmInner />
    </Suspense>
  )
}
