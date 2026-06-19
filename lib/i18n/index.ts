import { it } from './it'
import { fr } from './fr'
import type { Translations } from './types'
import type { ContentLang } from '@/types/database'

export const translations: Record<ContentLang, Translations> = { it, fr }

export function getT(lang: ContentLang): Translations {
  return translations[lang] ?? it
}

export function getLangFromStorage(): ContentLang {
  if (typeof window === 'undefined') return 'it'
  const stored = localStorage.getItem('sobre_lang')
  return (stored === 'fr' ? 'fr' : 'it') as ContentLang
}

export function setLangInStorage(lang: ContentLang): void {
  if (typeof window !== 'undefined') localStorage.setItem('sobre_lang', lang)
}
