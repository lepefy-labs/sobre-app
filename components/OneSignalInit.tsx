'use client'

import { useEffect } from 'react'
import { saveOneSignalPlayerId } from '@/app/dashboard/actions'

declare global {
  interface Window {
    OneSignalDeferred?: ((onesignal: OneSignalNamespace) => void)[]
  }
}

interface OneSignalNamespace {
  init: (options: object) => Promise<void>
  User: {
    PushSubscription: {
      id: string | null
      optedIn: boolean
      addEventListener: (event: string, handler: () => void) => void
    }
  }
  Notifications: {
    requestPermission: () => Promise<void>
  }
}

export default function OneSignalInit() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID
    if (!appId) return

    window.OneSignalDeferred = window.OneSignalDeferred ?? []

    window.OneSignalDeferred.push(async (OneSignal: OneSignalNamespace) => {
      await OneSignal.init({
        appId,
        notifyButton: { enable: false },
        allowLocalhostAsSecureOrigin: process.env.NODE_ENV === 'development',
      })

      const sub = OneSignal.User.PushSubscription

      const trySave = async () => {
        const playerId = sub.id
        if (playerId) {
          await saveOneSignalPlayerId(playerId)
        }
      }

      if (sub.optedIn && sub.id) {
        await trySave()
      } else {
        try {
          await OneSignal.Notifications.requestPermission()
          await trySave()
        } catch {
          // user denied or dismissed — silent
        }

        sub.addEventListener('change', trySave)
      }
    })

    const script = document.createElement('script')
    script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'
    script.defer = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
