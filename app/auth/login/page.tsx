'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getLangFromStorage, getT } from '@/lib/i18n'
import type { ContentLang } from '@/types/database'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<ContentLang>('it')

  useEffect(() => { setLang(getLangFromStorage()) }, [])

  const t = getT(lang).auth.login
  const supabase = createClient()

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })

    if (error) {
      setError(t.errorGeneric)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-light tracking-tight text-stone-800">
            {t.title}
          </h1>
          <p className="text-sm text-stone-500">
            {t.subtitle}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-stone-600">
                {t.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-white text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-3 rounded-2xl bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? t.buttonLoading : t.buttonCta}
            </button>

            <p className="text-xs text-stone-400 text-center">
              {t.noPassword}
            </p>
          </form>
        ) : (
          <div className="text-center space-y-4 py-8">
            <div className="text-4xl">✉️</div>
            <h2 className="text-xl font-light text-stone-800">
              {t.checkEmailTitle}
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed">
              {t.checkEmailBody}<strong>{email}</strong>.
              <br />
              {t.checkEmailInstruction}
            </p>
            <button
              onClick={() => { setSent(false); setEmail('') }}
              className="text-sm text-stone-400 underline underline-offset-2"
            >
              {t.checkEmailBack}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
