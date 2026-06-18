import Link from 'next/link'
import type { ContentLang } from '@/types/database'

const copy = {
  it: {
    eyebrow: '✦ Benessere quotidiano',
    headline: "L'energia giusta,\ndove conta.",
    subtitle: 'Due momenti al giorno per stare meglio. Un pensiero la mattina, una storia la sera.',
    cta: 'Inizia gratis →',
    note: 'Nessuna carta richiesta.',
  },
  fr: {
    eyebrow: '✦ Bien-être quotidien',
    headline: 'La bonne énergie,\nlà où ça compte.',
    subtitle: 'Deux moments par jour pour aller mieux. Une pensée le matin, une histoire le soir.',
    cta: 'Commencer gratuitement →',
    note: 'Aucune carte requise.',
  },
}

export default function HeroSection({ lang }: { lang: ContentLang }) {
  const t = copy[lang]
  return (
    <section className="pt-24 pb-20 px-6">
      <div className="max-w-sm mx-auto md:max-w-2xl text-center space-y-8">
        <p className="text-sm text-amber-600 font-medium tracking-wide">{t.eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-light text-stone-800 leading-tight tracking-tight whitespace-pre-line">
          {t.headline}
        </h1>
        <p className="text-stone-500 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          {t.subtitle}
        </p>
        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="inline-block bg-stone-800 text-white rounded-2xl py-3 px-8 text-sm font-medium hover:bg-stone-700 transition"
          >
            {t.cta}
          </Link>
          <p className="text-xs text-stone-400">{t.note}</p>
        </div>
      </div>
    </section>
  )
}
