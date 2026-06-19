'use client'

import { useState, useEffect } from 'react'
import { getLangFromStorage, getT } from '@/lib/i18n'
import type { ContentLang } from '@/types/database'

type Plan = 'monthly' | 'yearly'

export default function ProUpgrade({ subscriptionStatus }: { subscriptionStatus: string }) {
  const [plan, setPlan] = useState<Plan>('yearly')
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState<ContentLang>('it')

  useEffect(() => { setLang(getLangFromStorage()) }, [])

  const t = getT(lang).dashboard.pro

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: plan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(false)
    }
  }

  const isPro = subscriptionStatus === 'pro'

  return (
    <div className="min-h-screen bg-stone-50 px-5 pt-14 pb-8 flex flex-col gap-6 max-w-sm mx-auto">
      <div>
        <p className="text-xs text-stone-400 uppercase tracking-widest font-light">{t.planLabel}</p>
        <h1 className="mt-1 text-2xl font-light text-stone-800">{t.title}</h1>
      </div>

      {isPro ? (
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <p className="text-xs text-stone-400 uppercase tracking-widest font-light mb-1">{t.statusLabel}</p>
          <p className="text-stone-800 font-light">{t.statusActive}</p>
          <p className="text-sm text-stone-400 font-light mt-2">
            {t.statusActiveDesc}
          </p>
        </div>
      ) : (
        <>
          <div className="flex bg-white rounded-2xl border border-stone-100 p-1">
            <button
              onClick={() => setPlan('monthly')}
              className={`flex-1 py-2 rounded-xl text-sm font-light transition-colors ${
                plan === 'monthly'
                  ? 'bg-stone-800 text-white'
                  : 'text-stone-400'
              }`}
            >
              {t.toggleMonthly}
            </button>
            <button
              onClick={() => setPlan('yearly')}
              className={`flex-1 py-2 rounded-xl text-sm font-light transition-colors flex items-center justify-center ${
                plan === 'yearly'
                  ? 'bg-stone-800 text-white'
                  : 'text-stone-400'
              }`}
            >
              <span>{t.toggleAnnual}</span>
              <span className="bg-amber-100 text-amber-700 text-[10px] font-medium px-2 py-0.5 rounded-full ml-1.5">
                {t.savingsBadge}
              </span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
            {plan === 'monthly' ? (
              <div>
                <p className="text-3xl font-light text-stone-800">{t.priceMonthly}</p>
                <p className="text-sm text-stone-400 font-light">{t.priceMonthlyNote}</p>
              </div>
            ) : (
              <div>
                <p className="text-3xl font-light text-stone-800">{t.priceAnnual}</p>
                <p className="text-sm text-stone-400 font-light">{t.priceAnnualNote}</p>
              </div>
            )}

            <ul className="flex flex-col gap-2">
              {[t.feature1, t.feature2, t.feature3].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-stone-600 font-light">
                  <span className="text-stone-400 mt-0.5">✦</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="mt-2 w-full bg-stone-800 text-white rounded-xl py-3 text-sm font-light tracking-wide disabled:opacity-50 transition-opacity"
            >
              {loading ? t.buttonLoading : plan === 'monthly' ? t.buttonMonthly : t.buttonAnnual}
            </button>
          </div>

          <p className="text-xs text-stone-400 font-light text-center">
            {t.cancelNote}
          </p>
        </>
      )}
    </div>
  )
}
