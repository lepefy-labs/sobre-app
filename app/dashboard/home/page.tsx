import { getHomeData, saveMood } from './actions'
import ContentCard from '@/components/dashboard/ContentCard'
import MoodCheckin from '@/components/dashboard/MoodCheckin'
import type { MoodValue, NotificationSlot } from '@/types/database'

function getCurrentSlot(): NotificationSlot {
  const now = new Date()
  const romeHour = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/Rome' })
  ).getHours()
  return romeHour >= 5 && romeHour < 18 ? 'morning' : 'evening'
}

const slotGreeting: Record<NotificationSlot, string> = {
  morning: 'Buongiorno',
  evening: 'Buonasera',
}

export default async function DashboardHomePage() {
  const slot = getCurrentSlot()
  const { user, content, todayMood } = await getHomeData(slot)

  async function handleSaveMood(value: MoodValue) {
    'use server'
    await saveMood(slot, value)
  }

  return (
    <div className="min-h-screen bg-stone-50 px-5 pt-14 pb-8 flex flex-col gap-6">
      <div>
        <p className="text-xs text-stone-400 uppercase tracking-widest font-light">
          {slotGreeting[slot]}
        </p>
        {user.name && (
          <h1 className="mt-1 text-2xl font-light text-stone-800">{user.name}</h1>
        )}
      </div>

      {content ? (
        <ContentCard content={content} />
      ) : (
        <div className="bg-white rounded-2xl border border-stone-100 p-6 text-center text-stone-400 text-sm font-light">
          Nessun contenuto disponibile al momento.
        </div>
      )}

      <MoodCheckin slot={slot} initialMood={todayMood} onSave={handleSaveMood} />
    </div>
  )
}
