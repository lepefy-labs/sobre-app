'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveOnboarding } from './actions'
import type { ContentLang } from '@/types/database'

export default function OnboardingPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [lang, setLang] = useState<ContentLang>('it')
  const [morningTime, setMorningTime] = useState('08:00')
  const [eveningTime, setEveningTime] = useState('21:00')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit() {
    setLoading(true)
    setErrorMsg(null)
    try {
      const result = await saveOnboarding({ name, lang, morningTime, eveningTime })
      if (!result.success) {
        setErrorMsg(result.error ?? 'Qualcosa è andato storto. Riprova.')
        setLoading(false)
        return
      }
      router.push('/dashboard/home')
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Qualcosa è andato storto. Riprova.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-sm mx-auto px-6 pb-32">
        {/* Logo */}
        <div className="pt-16 pb-8 text-center">
          <h1 className="text-3xl font-light text-stone-800">Sobre</h1>
          <p className="text-xs text-stone-400 mt-1">Il tuo spazio di riflessione quotidiana</p>
        </div>

        {/* Sottotitolo */}
        <p className="text-sm text-stone-500 mb-8 text-center">
          Pochi secondi per iniziare.
        </p>

        {/* Nome */}
        <div className="mb-6">
          <label className="block text-xs text-stone-500 mb-2">
            Come ti chiami?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Il tuo nome"
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          />
        </div>

        {/* Lingua */}
        <div className="mb-6">
          <label className="block text-xs text-stone-500 mb-2">Lingua</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setLang('it')}
              className={`flex-1 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                lang === 'it'
                  ? 'bg-stone-800 text-white'
                  : 'border border-stone-200 text-stone-500'
              }`}
            >
              🇮🇹 Italiano
            </button>
            <button
              type="button"
              onClick={() => setLang('fr')}
              className={`flex-1 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                lang === 'fr'
                  ? 'bg-stone-800 text-white'
                  : 'border border-stone-200 text-stone-500'
              }`}
            >
              🇫🇷 Français
            </button>
          </div>
        </div>

        {/* Divisore */}
        <div className="border-t border-stone-100 mb-6" />

        {/* Orari notifiche */}
        <div className="mb-8">
          <label className="block text-xs text-stone-500 mb-4">
            Quando vuoi riceverci?
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700">☀️ Mattino</span>
              <input
                type="time"
                value={morningTime}
                onChange={(e) => setMorningTime(e.target.value)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-stone-700">🌙 Sera</span>
              <input
                type="time"
                value={eveningTime}
                onChange={(e) => setEveningTime(e.target.value)}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
            </div>
          </div>
          <p className="text-xs text-stone-400 mt-3">
            Puoi cambiare questi orari in qualsiasi momento.
          </p>
        </div>

        {/* Errore */}
        {errorMsg && (
          <p className="text-sm text-red-500 text-center mb-4">{errorMsg}</p>
        )}
      </div>

      {/* CTA sticky */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-safe pt-4 bg-stone-50/90 backdrop-blur-sm">
        <div className="max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-stone-800 text-white text-sm font-medium disabled:opacity-60 transition-opacity"
          >
            {loading ? 'Un momento...' : 'Inizia →'}
          </button>
        </div>
      </div>
    </div>
  )
}
