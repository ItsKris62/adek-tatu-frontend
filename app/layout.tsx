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
  metadataBase: new URL('https://adektatu.ke'),
  title: {
    default: 'ADEK TATU — Alliance for Democracy and Equality in Kenya',
    template: '%s — ADEK TATU',
  },
  description:
    'Official website of the Alliance for Democracy and Equality in Kenya (ADEK TATU). Umoja Wetu, Nguvu Yetu — an inclusive social democracy founded on teamwork, accountability, transparency and unity.',
  applicationName: 'ADEK TATU',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'alternate icon',
        url: '/icon-light-32x32.png',
        type: 'image/png',
      },
    ],
  },
  appleWebApp: {
    title: 'ADEK TATU',
    capable: true,
    statusBarStyle: 'default',
  },
  openGraph: {
    title: 'ADEK TATU — Alliance for Democracy and Equality in Kenya',
    description:
      'An inclusive social democracy founded on equality, accountable leadership, economic opportunity and national unity.',
    siteName: 'ADEK TATU',
    type: 'website',
    locale: 'en_KE',
    url: 'https://adektatu.ke',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'ADEK TATU — Alliance for Democracy and Equality in Kenya',
        type: 'image/svg+xml',
      },
      {
        url: '/adek-logo.png',
        width: 1024,
        height: 1024,
        alt: 'ADEK TATU logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADEK TATU — Alliance for Democracy and Equality in Kenya',
    description:
      'Umoja Wetu, Nguvu Yetu — an inclusive social democracy founded on equality, accountable leadership and national unity.',
    creator: '@adektatu',
    site: '@adektatu',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'ADEK TATU — Alliance for Democracy and Equality in Kenya',
      },
    ],
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
