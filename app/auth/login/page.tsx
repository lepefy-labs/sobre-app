'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getLangFromStorage, getT } from '@/lib/i18n'
import type { ContentLang } from '@/types/database'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [resent, setResent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<ContentLang>('it')

  useEffect(() => { setLang(getLangFromStorage()) }, [])

  useEffect(() => {
    if (!resent) return
    const timeout = setTimeout(() => setResent(false), 3000)
    return () => clearTimeout(timeout)
  }, [resent])

  const t = getT(lang).auth.login
  const tv = getT(lang).auth.verify
  const supabase = createClient()

  async function sendOtp() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    })
    return error
  }

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const error = await sendOtp()

    if (error) {
      setError(t.errorGeneric)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setVerifying(true)
    setError(null)

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    })

    if (error) {
      setError(tv.errorInvalid)
      setVerifying(false)
      return
    }

    router.push('/dashboard/home')
  }

  async function handleResend() {
    setError(null)
    const error = await sendOtp()
    if (error) {
      setError(t.errorGeneric)
      return
    }
    setResent(true)
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
          <form onSubmit={handleSendCode} className="space-y-4">
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
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-light text-stone-800">
                {tv.title}
              </h2>
              <p className="text-sm text-stone-500">
                {tv.subtitle} <strong>{email}</strong>
              </p>
            </div>

            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={e => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              placeholder={tv.codePlaceholder}
              maxLength={6}
              autoFocus
              required
              style={{
                textAlign: 'center',
                fontSize: '2rem',
                letterSpacing: '0.5em',
                border: '1px solid #e7e5e4',
                borderRadius: '1rem',
                padding: '0.75rem 1rem',
                width: '100%',
              }}
              className="bg-white text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition"
            />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={verifying || code.length < 6}
              className="w-full py-3 rounded-2xl bg-stone-800 text-white text-sm font-medium hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {verifying ? tv.buttonLoading : tv.buttonCta}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs">
              <button
                type="button"
                onClick={handleResend}
                disabled={resent}
                className="text-stone-400 underline underline-offset-2 disabled:no-underline"
              >
                {resent ? tv.resendConfirm : tv.resend}
              </button>
              <button
                type="button"
                onClick={() => { setSent(false); setCode(''); setError(null) }}
                className="text-stone-400 underline underline-offset-2"
              >
                {tv.changeEmail}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
