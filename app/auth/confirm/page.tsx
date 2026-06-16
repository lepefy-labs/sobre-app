'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

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

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <p className="text-sm text-stone-400">Accesso in corso…</p>
        </div>
      }
    >
      <ConfirmInner />
    </Suspense>
  )
}
