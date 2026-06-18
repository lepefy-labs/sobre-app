import type { ContentLang } from '@/types/database'

const copy = {
  it: { payoff: "L'energia giusta, dove conta." },
  fr: { payoff: 'La bonne énergie, là où ça compte.' },
}

export default function FooterSection({ lang }: { lang: ContentLang }) {
  const t = copy[lang]
  return (
    <footer className="py-12 px-6 border-t border-stone-100">
      <div className="max-w-sm mx-auto md:max-w-2xl text-center space-y-4">
        <p className="text-xl font-light text-stone-800">Sobre</p>
        <p className="text-xs text-stone-400">{t.payoff}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-stone-400">
          <a href="#" className="hover:text-stone-600 transition">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-stone-600 transition">Termini</a>
          <span>·</span>
          <a href="mailto:ciao@robertinboukeng.com" className="hover:text-stone-600 transition">ciao@robertinboukeng.com</a>
        </div>
        <p className="text-xs text-stone-400">© 2026 Sobre</p>
      </div>
    </footer>
  )
}
