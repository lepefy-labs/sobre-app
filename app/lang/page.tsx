'use client'
import { useRouter } from 'next/navigation'
import { setLangInStorage } from '@/lib/i18n'
import type { ContentLang } from '@/types/database'

export default function LangPage() {
  const router = useRouter()
  function choose(lang: ContentLang) {
    setLangInStorage(lang)
    router.push('/auth/login')
  }
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8 text-center">
        <h1 className="text-4xl font-light text-stone-800">Sobre</h1>
        <div className="flex flex-col gap-3">
          <button onClick={() => choose('it')}
            className="w-full py-4 rounded-2xl border border-stone-200 bg-white text-stone-800 text-lg hover:bg-stone-50 transition">
            🇮🇹 Italiano
          </button>
          <button onClick={() => choose('fr')}
            className="w-full py-4 rounded-2xl border border-stone-200 bg-white text-stone-800 text-lg hover:bg-stone-50 transition">
            🇫🇷 Français
          </button>
        </div>
      </div>
    </div>
  )
}
