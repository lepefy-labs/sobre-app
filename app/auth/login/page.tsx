'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      setError('Qualcosa è andato storto. Riprova.')
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-light tracking-tight text-stone-800">
            Sobre
          </h1>
          <p className="text-sm text-stone-500">
            L'energia giusta, dove conta.
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-stone-600">
                La tua email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="nome@email.com"
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
              {loading ? 'Invio in corso...' : 'Continua con email →'}
            </button>

            <p className="text-xs text-stone-400 text-center">
              Nessuna password. Ti inviamo un link magico.
            </p>
          </form>
        ) : (
          <div className="text-center space-y-4 py-8">
            <div className="text-4xl">✉️</div>
            <h2 className="text-xl font-light text-stone-800">
              Controlla la tua email
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed">
              Abbiamo inviato un link a <strong>{email}</strong>.
              <br />
              Clicca il link per accedere.
            </p>
            <button
              onClick={() => { setSent(false); setEmail('') }}
              className="text-sm text-stone-400 underline underline-offset-2"
            >
              Usa un'altra email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
