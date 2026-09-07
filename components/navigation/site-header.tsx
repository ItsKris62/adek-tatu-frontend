'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/layout/container'
import { BrandMark } from '@/components/layout/brand-mark'
import { CtaLink } from '@/components/editorial/cta'
import {
  primaryNav,
  utilityNav,
  mobileNav,
  mobileSecondaryNav,
} from '@/content/navigation'
import { site } from '@/content/site'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Body scroll lock + Escape handling + focus management
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden border-b border-navy-700/40 bg-navy text-white/85 lg:block">
        <Container className="flex h-9 items-center justify-between text-[12.5px]">
          <p className="flex items-center gap-2 tracking-wide text-white/90">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(245,168,0,0.85)]"
            />
            Official Website of ADEK
          </p>
          <nav aria-label="Utility">
            <ul className="flex items-center gap-6">
              {utilityNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 transition-colors duration-200 hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      {/* Main navigation */}
      <div
        className={cn(
          'border-b bg-background/90 backdrop-blur transition-shadow',
          scrolled ? 'border-border shadow-[0_1px_0_0_rgba(16,24,40,0.04),0_8px_24px_-16px_rgba(8,47,103,0.25)]' : 'border-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <BrandMark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors duration-200',
                        active
                          ? 'font-semibold text-navy'
                          : 'text-foreground/75 hover:text-navy',
                      )}
                    >
                      {link.label}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold shadow-[0_1px_8px_rgba(245,168,0,0.45)]"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100"
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <CtaLink href="/join" variant="primary" className="hidden sm:inline-flex">
              Join ADEK
            </CtaLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-md border border-border text-navy transition-colors hover:border-gold hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            'absolute inset-0 bg-navy-900/50 transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            'absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col bg-background shadow-2xl transition-transform duration-300 ease-out',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <BrandMark size={34} />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-md border border-border text-navy transition-colors hover:border-gold hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile primary"
            className="flex-1 overflow-y-auto px-3 py-4"
          >
            <ul className="flex flex-col gap-1">
              {mobileNav.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-12 items-center rounded-lg px-3 text-base font-semibold transition-all duration-200',
                        active
                          ? 'border-l-[3px] border-gold bg-gold-soft/80 text-navy'
                          : 'text-foreground hover:bg-muted hover:text-navy',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <p className="px-3 pt-6 pb-2 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              More
            </p>
            <ul className="flex flex-col gap-1">
              {mobileSecondaryNav.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors',
                        active
                          ? 'border-l-[3px] border-gold bg-gold-soft/80 font-medium text-navy'
                          : 'text-muted-foreground hover:bg-muted hover:text-navy',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="border-t border-border p-4">
            <CtaLink href="/join" variant="primary" size="lg" className="w-full">
              Join ADEK
            </CtaLink>
            <a
              href={`tel:${site.contact.phones[0].replace(/\s/g, '')}`}
              className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.contact.phones[0]}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
