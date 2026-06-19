import Link from 'next/link'
import { getHomeData, saveMood } from './actions'
import ContentCard from '@/components/dashboard/ContentCard'
import MoodCheckin from '@/components/dashboard/MoodCheckin'
import { getT } from '@/lib/i18n'
import type { MoodValue, NotificationSlot } from '@/types/database'

function getCurrentSlot(): NotificationSlot {
  const now = new Date()
  const romeHour = new Date(
    now.toLocaleString('en-US', { timeZone: 'Europe/Rome' })
  ).getHours()
  return romeHour >= 5 && romeHour < 18 ? 'morning' : 'evening'
}

export default async function DashboardHomePage() {
  const slot = getCurrentSlot()
  const { user, lang, content, todayMood, subscriptionStatus } = await getHomeData(slot)
  const t = getT(lang).dashboard.home

  async function handleSaveMood(value: MoodValue) {
    'use server'
    await saveMood(slot, value)
  }

  return (
    <div className="min-h-screen bg-stone-50 px-5 pt-14 pb-8 flex flex-col gap-6 max-w-sm mx-auto">
      <div>
        <p className="text-xs text-stone-400 uppercase tracking-widest font-light">
          {slot === 'morning' ? t.greetingMorning : t.greetingEvening}
        </p>
        {user.name && (
          <h1 className="mt-1 text-2xl font-light text-stone-800">{user.name}</h1>
        )}
      </div>

      {content ? (
        <ContentCard content={content} lang={lang} />
      ) : (
        <div className="bg-white rounded-2xl border border-stone-100 p-6 text-center text-stone-400 text-sm font-light">
          {t.emptyState}
        </div>
      )}

      <MoodCheckin slot={slot} initialMood={todayMood} onSave={handleSaveMood} lang={lang} />

      {subscriptionStatus === 'free' && (
        <Link
          href="/dashboard/pro"
          className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-stone-800 text-white text-sm"
        >
          <span className="text-amber-400">✦</span>
          <span className="font-light flex-1">{t.proPromo}</span>
          <span className="text-stone-400">→</span>
        </Link>
      )}
    </div>
  )
}
