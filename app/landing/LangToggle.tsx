import type { ContentLang } from '@/types/database'

interface LangToggleProps {
  lang: ContentLang
  onLangChange: (lang: ContentLang) => void
}

export default function LangToggle({ lang, onLangChange }: LangToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onLangChange('it')}
        className={`text-sm transition ${lang === 'it' ? 'font-medium text-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
      >
        IT
      </button>
      <span className="text-stone-200 text-sm">|</span>
      <button
        onClick={() => onLangChange('fr')}
        className={`text-sm transition ${lang === 'fr' ? 'font-medium text-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
      >
        FR
      </button>
    </div>
  )
}
