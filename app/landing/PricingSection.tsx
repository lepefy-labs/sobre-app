import Link from 'next/link'
import type { ContentLang } from '@/types/database'

const copy = {
  it: {
    title: 'Semplice e trasparente',
    free: {
      name: 'Free',
      sub: 'Per iniziare',
      price: '€0',
      features: ['Contenuti dalla libreria curata', 'Una lingua a scelta', 'Mood check-in giornaliero'],
      cta: 'Inizia gratis',
    },
    pro: {
      name: 'Pro',
      sub: 'Per chi vuole di più',
      price: '€3,99/mese',
      note: 'o €29,99/anno · risparmia il 37%',
      badge: '✦ Più popolare',
      features: ['Tutto il piano Free', 'Contenuti generati da AI sul tuo umore', 'Storico umore completo', 'Accesso prioritario ai nuovi contenuti'],
      cta: 'Prova Pro',
    },
  },
  fr: {
    title: 'Simple et transparent',
    free: {
      name: 'Free',
      sub: 'Pour commencer',
      price: '€0',
      features: ['Contenus de la bibliothèque', 'Une langue au choix', "Check-in d'humeur quotidien"],
      cta: 'Commencer',
    },
    pro: {
      name: 'Pro',
      sub: 'Pour aller plus loin',
      price: '€3,99/mois',
      note: "ou €29,99/an · économisez 37%",
      badge: '✦ Le plus populaire',
      features: ['Tout le plan Free', 'Contenus générés par IA selon votre humeur', "Historique d'humeur complet", 'Accès prioritaire aux nouveaux contenus'],
      cta: 'Essayer Pro',
    },
  },
}

export default function PricingSection({ lang }: { lang: ContentLang }) {
  const t = copy[lang]
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-sm mx-auto md:max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-light text-stone-800 text-center mb-12">{t.title}</h2>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Free */}
          <div className="border border-stone-200 rounded-2xl p-6 space-y-6">
            <div className="space-y-1">
              <p className="text-xs text-stone-400 uppercase tracking-widest">{t.free.name}</p>
              <p className="text-sm text-stone-500">{t.free.sub}</p>
              <p className="text-3xl font-light text-stone-800 pt-1">{t.free.price}</p>
            </div>
            <ul className="space-y-2">
              {t.free.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="text-amber-400 mt-0.5">✦</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/lang"
              className="block text-center bg-stone-800 text-white rounded-2xl py-3 px-8 text-sm font-medium hover:bg-stone-700 transition"
            >
              {t.free.cta}
            </Link>
          </div>

          {/* Pro */}
          <div className="relative bg-stone-800 text-white rounded-2xl p-6 space-y-6">
            <span className="absolute -top-3 left-6 inline-block bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1 rounded-full">
              {t.pro.badge}
            </span>
            <div className="space-y-1">
              <p className="text-xs text-stone-400 uppercase tracking-widest">{t.pro.name}</p>
              <p className="text-sm text-stone-400">{t.pro.sub}</p>
              <p className="text-3xl font-light pt-1">{t.pro.price}</p>
              <p className="text-xs text-stone-400">{t.pro.note}</p>
            </div>
            <ul className="space-y-2">
              {t.pro.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-stone-300">
                  <span className="text-amber-300 mt-0.5">✦</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/lang"
              className="block text-center bg-white text-stone-800 rounded-2xl py-3 px-8 text-sm font-medium hover:bg-stone-100 transition"
            >
              {t.pro.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
