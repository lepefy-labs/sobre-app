'use client'

import { useState } from 'react'

type Plan = 'monthly' | 'yearly'

export default function ProUpgrade({ subscriptionStatus }: { subscriptionStatus: string }) {
  const [plan, setPlan] = useState<Plan>('yearly')
  const [loading, setLoading] = useState(false)

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
        <p className="text-xs text-stone-400 uppercase tracking-widest font-light">Piano</p>
        <h1 className="mt-1 text-2xl font-light text-stone-800">Sobre Pro</h1>
      </div>

      {isPro ? (
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <p className="text-xs text-stone-400 uppercase tracking-widest font-light mb-1">Stato</p>
          <p className="text-stone-800 font-light">Abbonamento attivo ✦</p>
          <p className="text-sm text-stone-400 font-light mt-2">
            Hai accesso completo a tutti i contenuti Pro.
          </p>
        </div>
      ) : (
        <>
          {/* Toggle */}
          <div className="flex bg-white rounded-2xl border border-stone-100 p-1">
            <button
              onClick={() => setPlan('monthly')}
              className={`flex-1 py-2 rounded-xl text-sm font-light transition-colors ${
                plan === 'monthly'
                  ? 'bg-stone-800 text-white'
                  : 'text-stone-400'
              }`}
            >
              Mensile
            </button>
            <button
              onClick={() => setPlan('yearly')}
              className={`flex-1 py-2 rounded-xl text-sm font-light transition-colors flex items-center justify-center ${
                plan === 'yearly'
                  ? 'bg-stone-800 text-white'
                  : 'text-stone-400'
              }`}
            >
              <span>Annuale</span>
              <span className="bg-amber-100 text-amber-700 text-[10px] font-medium px-2 py-0.5 rounded-full ml-1.5">
                Risparmia il 37%
              </span>
            </button>
          </div>

          {/* Plan card */}
          <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
            {plan === 'monthly' ? (
              <>
                <div>
                  <p className="text-3xl font-light text-stone-800">€3,99</p>
                  <p className="text-sm text-stone-400 font-light">al mese</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-3xl font-light text-stone-800">€29,99</p>
                  <p className="text-sm text-stone-400 font-light">all'anno · equivale a €2,50/mese</p>
                </div>
              </>
            )}

            <ul className="flex flex-col gap-2">
              {[
                'Contenuti illimitati mattina e sera',
                'Storico dell\'umore completo',
                'Accesso prioritario ai nuovi contenuti',
              ].map((f) => (
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
              {loading ? 'Reindirizzamento...' : plan === 'monthly' ? 'Attiva il piano mensile →' : 'Attiva il piano annuale →'}
            </button>
          </div>

          <p className="text-xs text-stone-400 font-light text-center">
            Puoi disdire in qualsiasi momento.
          </p>
        </>
      )}
    </div>
  )
}
