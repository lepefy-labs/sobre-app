import type { ContentLang } from '@/types/database'

const copy = {
  it: {
    title: 'Pensato per te',
    features: [
      { icon: '☀️', title: 'Mattino e sera', desc: 'Due momenti precisi, non un flusso infinito di contenuti.' },
      { icon: '✦', title: 'Distacco consapevole', desc: 'Contenuti che insegnano a stare bene senza dipendere dagli altri.' },
      { icon: '🌙', title: 'Nessuna domenica sera', desc: 'La domenica sera è tua. Nessuna notifica, per scelta.' },
    ],
  },
  fr: {
    title: 'Pensé pour vous',
    features: [
      { icon: '☀️', title: 'Matin et soir', desc: 'Deux moments précis, pas un flux infini de contenus.' },
      { icon: '✦', title: 'Détachement conscient', desc: "Des contenus qui apprennent à aller bien sans dépendre des autres." },
      { icon: '🌙', title: 'Pas de dimanche soir', desc: "Le dimanche soir est à vous. Aucune notification, par choix." },
    ],
  },
}

export default function FeaturesSection({ lang }: { lang: ContentLang }) {
  const t = copy[lang]
  return (
    <section className="py-20 px-6">
      <div className="max-w-sm mx-auto md:max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-light text-stone-800 text-center mb-12">{t.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {t.features.map((f) => (
            <div key={f.title} className="border border-stone-100 rounded-2xl p-6 space-y-3">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="font-medium text-stone-800">{f.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
