'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ContentLang } from '@/types/database'
import LangToggle from './landing/LangToggle'
import HeroSection from './landing/HeroSection'
import HowItWorksSection from './landing/HowItWorksSection'
import FeaturesSection from './landing/FeaturesSection'
import PricingSection from './landing/PricingSection'
import FooterSection from './landing/FooterSection'

export default function LandingPage() {
  const [lang, setLang] = useState<ContentLang>('it')

  return (
    <main>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-100">
        <div className="max-w-sm mx-auto md:max-w-2xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-2xl font-light text-stone-800">
            Sobre
          </Link>
          <LangToggle lang={lang} onLangChange={setLang} />
        </div>
      </nav>

      <HeroSection lang={lang} />
      <HowItWorksSection lang={lang} />
      <FeaturesSection lang={lang} />
      <PricingSection lang={lang} />
      <FooterSection lang={lang} />
    </main>
  )
}
