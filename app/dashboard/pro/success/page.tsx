'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getLangFromStorage, getT } from '@/lib/i18n'
import type { ContentLang } from '@/types/database'

export default function ProSuccessPage() {
  const [lang, setLang] = useState<ContentLang>('it')

  useEffect(() => { setLang(getLangFromStorage()) }, [])

  const t = getT(lang).dashboard.pro

  return (
    <div className="min-h-screen bg-stone-50 px-5 pt-14 pb-8 flex flex-col gap-6 max-w-sm mx-auto">
      <div>
        <p className="text-xs text-stone-400 uppercase tracking-widest font-light">{t.successWelcome}</p>
        <h1 className="mt-1 text-2xl font-light text-stone-800">{t.successTitle}</h1>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-3">
        <p className="text-stone-700 font-light leading-relaxed">
          {t.successBody}
        </p>
        <p className="text-sm text-stone-400 font-light">
          {t.successNote}
        </p>
      </div>

      <Link
        href="/dashboard/home"
        className="w-full bg-stone-800 text-white rounded-xl py-3 text-sm font-light tracking-wide text-center"
      >
        {t.successCta}
      </Link>
    </div>
  )
}
