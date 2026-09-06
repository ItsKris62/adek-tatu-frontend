'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Lock, Info, Loader2 } from 'lucide-react'
import { CtaButton } from '@/components/editorial/cta'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-sidebar lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-16 size-[420px] rounded-full border border-white/[0.06]" />
          <div className="absolute top-1/3 -left-24 size-[520px] rounded-full border border-white/[0.05]" />
        </div>
        <Link href="/" className="relative flex items-center gap-3">
          <Image src="/adek-logo.png" alt="" width={44} height={44} className="h-11 w-11" />
          <span className="font-display text-lg font-extrabold text-white">ADEK Admin</span>
        </Link>
        <div className="relative">
          <p className="max-w-sm font-display text-2xl leading-snug font-bold text-white">
            Operational tools for ADEK administration.
          </p>
          <p className="mt-3 max-w-sm text-sm text-sidebar-foreground/70">
            Manage applications, content and users. This is a frontend prototype
            — no production authentication is connected.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-offwhite p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Image src="/adek-logo.png" alt="" width={40} height={40} className="h-10 w-10" />
            <span className="font-display text-lg font-extrabold text-navy">ADEK Admin</span>
          </div>

          <h1 className="font-display text-2xl font-bold text-navy">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Access the ADEK administrative area.
          </p>

          <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-gold/40 bg-gold/10 p-3 text-sm text-[#7a5a00]">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Prototype only. Any credentials will proceed to the demo dashboard;
            no real authentication is performed.
          </div>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              setLoading(true)
              window.setTimeout(() => router.push('/admin'), 700)
            }}
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-navy">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-navy">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
              />
            </div>

            <CtaButton type="submit" variant="primary" size="lg" disabled={loading} className="mt-2 w-full">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                <>
                  <Lock className="size-4" aria-hidden="true" />
                  Sign in
                </>
              )}
            </CtaButton>
          </form>

          <Link
            href="/"
            className="mt-6 inline-block text-sm text-muted-foreground transition-colors hover:text-navy"
          >
            ← Back to public site
          </Link>
        </div>
      </div>
    </div>
  )
}
