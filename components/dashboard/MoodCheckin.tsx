'use client'

import { useState } from 'react'
import type { MoodValue, NotificationSlot } from '@/types/database'

const moods: { value: MoodValue; label: string }[] = [
  { value: 'low', label: 'Stanca' },
  { value: 'neutral', label: 'Ok' },
  { value: 'good', label: 'Bene' },
  { value: 'great', label: 'Benissimo' },
]

type MoodCheckinProps = {
  slot: NotificationSlot
  initialMood: MoodValue | null
  onSave: (value: MoodValue) => Promise<void>
}

export default function MoodCheckin({ initialMood, onSave }: MoodCheckinProps) {
  const [selected, setSelected] = useState<MoodValue | null>(initialMood)

  function handleTap(value: MoodValue) {
    if (selected !== null) return
    // Optimistic update — fire and forget
    setSelected(value)
    void onSave(value)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-stone-400 tracking-wide">Come ti senti?</p>

      <div className="flex gap-2">
        {moods.map((mood) => {
          const isSelected = selected === mood.value
          const isRecorded = selected !== null

          return (
            <button
              key={mood.value}
              onClick={() => handleTap(mood.value)}
              disabled={isRecorded}
              className={`flex-1 py-2 px-1 rounded-full border text-sm transition-colors ${
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
        <p className="text-xs text-stone-400 text-right">Registrato ✓</p>
      )}
    </div>
  )
}
