'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import {
  LayoutDashboard,
  Inbox,
  Newspaper,
  Users2,
  FileText,
  LayoutTemplate,
  ScrollText,
  Shield,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { roleLabels, type AdminRole } from '@/content/admin'
import { getMe, logoutAdmin, type AdminUserSession } from '@/lib/api/adminAuth'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Applications', href: '/admin/applications', icon: Inbox },
  { label: 'Approved Members', href: '/admin/members', icon: Users2 },
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'Leadership', href: '/admin/leadership', icon: Users2 },
  { label: 'Documents', href: '/admin/documents', icon: FileText },
  { label: 'Site Content', href: '/admin/content', icon: LayoutTemplate },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: ScrollText },
  { label: 'Users', href: '/admin/users', icon: Shield },
]

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function SidebarContent({
  user,
  onLogout,
}: {
  user: AdminUserSession | null
  onLogout: () => void
}) {
  const pathname = usePathname()
  const displayRole = user?.role || 'SUPER_ADMIN'

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        <Image src="/adek-logo.png" alt="" width={32} height={32} className="h-8 w-8" />
        <div className="leading-tight">
          <p className="font-display text-sm font-extrabold text-white">ADEK Admin</p>
          <p className="text-[10px] tracking-[0.14em] text-sidebar-foreground/60 uppercase">
            Operations
          </p>
        </div>
      </div>

      <nav aria-label="Admin" className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
                    active
                      ? 'bg-sidebar-accent text-white'
                      : 'text-sidebar-foreground/80 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <Icon className="size-4.5 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-sidebar-foreground/50 uppercase">
            Signed in as
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-white">
            {user?.email || 'Administrator'}
          </p>
          <p className="text-xs text-adek-blue">{roleLabels[displayRole]}</p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </button>

        <Link
          href="/"
          className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          View public site
        </Link>
      </div>
    </div>
  )
}

export function AdminShell({
  title,
  breadcrumbs,
  actions,
  children,
}: {
  title: string
  breadcrumbs?: { label: string; href?: string }[]
  actions?: ReactNode
  children: ReactNode
  role?: AdminRole
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<AdminUserSession | null>(null)

  useEffect(() => {
    let mounted = true
    getMe()
      .then((session) => {
        if (mounted) setCurrentUser(session)
      })
      .catch(() => {
        // Not authenticated, redirect to login
        router.push('/admin/login')
      })

    return () => {
      mounted = false
    }
  }, [router])

  async function handleLogout() {
    try {
      await logoutAdmin()
    } finally {
      router.push('/admin/login')
    }
  }

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="min-h-dvh bg-offwhite lg:grid lg:grid-cols-[264px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh bg-sidebar lg:block">
        <SidebarContent user={currentUser} onLogout={handleLogout} />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn('fixed inset-0 z-50 lg:hidden', open ? 'pointer-events-auto' : 'pointer-events-none')}
        aria-hidden={!open}
      >
        <div
          className={cn('absolute inset-0 bg-navy-900/60 transition-opacity', open ? 'opacity-100' : 'opacity-0')}
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Admin menu"
          className={cn(
            'absolute inset-y-0 left-0 w-[min(84vw,300px)] bg-sidebar transition-transform duration-300',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-3 z-10 inline-flex size-9 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue"
            aria-label="Close menu"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <SidebarContent user={currentUser} onLogout={handleLogout} />
        </div>
      </div>

      {/* Main column */}
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-md border border-border text-navy hover:border-navy/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>

            <div className="min-w-0 flex-1">
              {breadcrumbs ? (
                <nav aria-label="Breadcrumb" className="hidden sm:block">
                  <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {breadcrumbs.map((b, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        {b.href ? (
                          <Link href={b.href} className="hover:text-navy">{b.label}</Link>
                        ) : (
                          <span className="text-navy">{b.label}</span>
                        )}
                        {i < breadcrumbs.length - 1 ? (
                          <ChevronRight className="size-3 text-border" aria-hidden="true" />
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <h1 className="truncate font-display text-lg font-bold text-navy">{title}</h1>
            </div>

            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
