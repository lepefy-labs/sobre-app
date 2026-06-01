import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sobre — L\'energia giusta, dove conta.',
  description: 'Benessere quotidiano. Due momenti al giorno, per stare meglio.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Sobre',
  },
}

export const viewport: Viewport = {
  themeColor: '#292524',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="bg-stone-50 text-stone-800 antialiased">
        {children}
      </body>
    </html>
  )
}
