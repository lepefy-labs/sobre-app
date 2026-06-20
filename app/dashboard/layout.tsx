'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getLangFromStorage, getT } from '@/lib/i18n'
import type { ContentLang } from '@/types/database'
import OneSignalInit from '@/components/OneSignalInit'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [lang, setLang] = useState<ContentLang>('it')

  useEffect(() => { setLang(getLangFromStorage()) }, [])

  const nav = getT(lang).dashboard.nav

  const tabs = [
    {
      href: '/dashboard/home',
      label: nav.home,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
      ),
    },
    {
      href: '/dashboard/archive',
      label: nav.archive,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="5" rx="1" />
          <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
          <path d="M10 13h4" />
        </svg>
      ),
    },
    {
      href: '/dashboard/profile',
      label: nav.profile,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
    {
      href: '/dashboard/pro',
      label: nav.pro,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <OneSignalInit />
      <main className="flex-1 pb-20">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-100">
        <div className="flex items-stretch">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/')
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-3 transition-colors ${
                  isActive ? 'text-stone-800' : 'text-stone-400'
                }`}
              >
                {tab.icon}
                <span className={`text-[10px] leading-none tracking-wide ${isActive ? 'font-medium' : 'font-normal'}`}>
                  {tab.label}
                </span>
              </Link>
            )
          })}
        </div>
        <div className="h-safe-bottom" />
      </nav>
    </div>
  )
}
