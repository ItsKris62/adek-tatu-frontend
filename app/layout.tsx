import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://adek.example'),
  title: {
    default: 'ADEK TATU — Alliance for Democracy and Equality in Kenya',
    template: '%s — ADEK TATU',
  },
  description:
    'Official website of the Alliance for Democracy and Equality in Kenya (ADEK TATU). Umoja Wetu, Nguvu Yetu — an inclusive social democracy founded on teamwork, accountability, transparency and unity.',
  applicationName: 'ADEK TATU',
  openGraph: {
    title: 'ADEK TATU — Alliance for Democracy and Equality in Kenya',
    description:
      'An inclusive social democracy founded on equality, accountable leadership, economic opportunity and national unity.',
    siteName: 'ADEK TATU',
    type: 'website',
    locale: 'en_KE',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5a800',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
