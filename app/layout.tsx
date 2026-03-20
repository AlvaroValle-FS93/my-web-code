import type { Metadata } from 'next'
import { Syne, Space_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'AV Digital Solutions',
  description: 'Custom web and mobile app development',
  alternates: {
    canonical: 'https://www.alvarovalle.com',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const lang = headersList.get('x-lang') ?? 'es'

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${syne.variable} ${spaceMono.variable}`}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
