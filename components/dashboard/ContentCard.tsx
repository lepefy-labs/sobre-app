'use client'

import { getT } from '@/lib/i18n'
import type { ContentType, ContentLang } from '@/types/database'

type ContentCardProps = {
  content: {
    type: ContentType
    title: string | null
    body: string
    tags: string[]
  }
  lang: ContentLang
}

export default function ContentCard({ content, lang }: ContentCardProps) {
  const { type, title, body, tags } = content
  const visibleTags = tags.slice(0, 3)
  const tipLabel = getT(lang).dashboard.content.tipLabel

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col gap-4">
      {type === 'thought' && (
        <p className="text-center font-light text-xl text-stone-700 leading-relaxed">
          {body}
        </p>
      )}

      {type === 'story' && (
        <>
          {title && (
            <p className="font-light text-sm uppercase tracking-widest text-stone-400">
              {title}
            </p>
          )}
          <p className="text-base leading-relaxed text-stone-700">{body}</p>
        </>
      )}

      {type === 'tip' && (
        <>
          <span className="self-start text-xs font-medium text-amber-600 uppercase tracking-wider">
            {tipLabel}
          </span>
          <p className="text-base text-stone-700 leading-relaxed">{body}</p>
        </>
      )}

      {visibleTags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-stone-100 text-xs text-stone-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
