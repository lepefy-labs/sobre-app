'use client'

import { useState } from 'react'
import { getT } from '@/lib/i18n'
import type { MoodValue, NotificationSlot, ContentLang } from '@/types/database'

type MoodCheckinProps = {
  slot: NotificationSlot
  initialMood: MoodValue | null
  onSave: (value: MoodValue) => Promise<void>
  lang: ContentLang
}

export default function MoodCheckin({ initialMood, onSave, lang }: MoodCheckinProps) {
  const [selected, setSelected] = useState<MoodValue | null>(initialMood)
  const t = getT(lang).dashboard.mood

  const moods: { value: MoodValue; label: string }[] = [
    { value: 'very_low', label: t.options.very_low },
    { value: 'low', label: t.options.low },
    { value: 'neutral', label: t.options.neutral },
    { value: 'good', label: t.options.good },
    { value: 'great', label: t.options.great },
  ]

  function handleTap(value: MoodValue) {
    if (selected !== null) return
    setSelected(value)
    void onSave(value)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-stone-400 tracking-wide">{t.question}</p>

      <div className="flex gap-1.5">
        {moods.map((mood) => {
          const isSelected = selected === mood.value
          const isRecorded = selected !== null

          return (
            <button
              key={mood.value}
              onClick={() => handleTap(mood.value)}
              disabled={isRecorded}
              className={`flex-1 py-2 rounded-full border text-xs transition-colors ${
                isSelected
                  ? 'bg-stone-800 border-stone-800 text-white'
                  : isRecorded
                  ? 'border-stone-100 text-stone-300 bg-white cursor-default'
                  : 'border-stone-200 text-stone-600 bg-white active:bg-stone-50'
              }`}
            >
              {mood.label}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <p className="text-xs text-stone-400 text-right">{t.confirmed}</p>
      )}
    </div>
  )
}
