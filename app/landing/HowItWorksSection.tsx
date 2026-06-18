import type { ContentLang } from '@/types/database'

const copy = {
  it: {
    title: 'Come funziona',
    steps: [
      { n: '1', title: 'Scegli la tua lingua', desc: 'Italiano o francese, contenuti pensati per te.' },
      { n: '2', title: 'Ricevi ogni giorno', desc: 'Un pensiero al mattino, una storia o un consiglio la sera.' },
      { n: '3', title: 'Registra il tuo umore', desc: '3 tap per tenere traccia di come ti senti.' },
    ],
  },
  fr: {
    title: 'Comment ça marche',
    steps: [
      { n: '1', title: 'Choisissez votre langue', desc: 'Italien ou français, des contenus pensés pour vous.' },
      { n: '2', title: 'Recevez chaque jour', desc: 'Une pensée le matin, une histoire ou un conseil le soir.' },
      { n: '3', title: 'Notez votre humeur', desc: '3 taps pour suivre comment vous vous sentez.' },
    ],
  },
}

export default function HowItWorksSection({ lang }: { lang: ContentLang }) {
  const t = copy[lang]
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-sm mx-auto md:max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-light text-stone-800 text-center mb-12">{t.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {t.steps.map((step) => (
            <div key={step.n} className="space-y-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-sm font-medium flex items-center justify-center">
                {step.n}
              </div>
              <h3 className="font-medium text-stone-800">{step.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
