import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'ADEK Admin',
  description: 'ADEK administrative area (frontend prototype).',
  robots: { index: false, follow: false },
}

// The login route renders its own standalone layout; all other admin routes
// use the AdminShell (applied per-page) so this layout stays a passthrough.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return children
}
