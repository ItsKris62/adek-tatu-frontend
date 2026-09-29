'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, BadgeCheck, Loader2, SearchCheck, ShieldCheck, UserX, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CtaButton } from '@/components/editorial/cta'
import { ApiError } from '@/lib/api/apiClient'
import {
  verifyMembershipStatus,
  type MembershipVerificationResponse,
} from '@/lib/api/membership'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

const emptyForm = {
  fullName: '',
  phone: '',
  idNumber: '',
  website: '',
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat('en-KE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateValue))
}

export function MemberStatusDialog() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [state, setState] = useState<SubmitState>('idle')
  const [result, setResult] = useState<MembershipVerificationResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function update(key: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
    setResult(null)
    setErrorMessage('')
    setState('idle')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    setErrorMessage('')
    setResult(null)

    try {
      const response = await verifyMembershipStatus(form)
      setResult(response)
      setForm((current) => ({ ...current, idNumber: '', website: '' }))
      setState('success')
    } catch (error) {
      setState('error')
      setForm((current) => ({ ...current, idNumber: '', website: '' }))
      if (error instanceof ApiError) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('We could not verify membership status. Please try again.')
      }
    }
  }

  return (
    <>
      <CtaButton type="button" variant="outline" size="lg" onClick={() => setOpen(true)}>
        <SearchCheck className="size-4" aria-hidden="true" />
        Confirm Membership Status
      </CtaButton>

      <div
        className={cn(
          'fixed inset-0 z-[100] flex items-center justify-center p-4',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            'absolute inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity duration-200',
            open ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setOpen(false)}
        />

        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="member-status-title"
          className={cn(
            'relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl transition-all duration-200',
            open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
                Secure Lookup
              </p>
              <h2 id="member-status-title" className="mt-1 font-display text-2xl font-bold text-navy">
                Confirm membership status
              </h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-navy transition hover:border-navy/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue"
              aria-label="Close membership status dialog"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
            <form className="p-5 sm:p-6" onSubmit={handleSubmit}>
              <div
                style={{
                  position: 'absolute',
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              >
                <label htmlFor="membership_website">Leave this field blank</label>
                <input
                  id="membership_website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) => update('website', event.target.value)}
                />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Enter the details you used when registering. The check is performed
                securely and returns only limited membership information.
              </p>

              <div className="mt-6 grid gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-navy">Full name</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) => update('fullName', event.target.value)}
                    autoComplete="name"
                    required
                    className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-adek-blue focus:ring-2 focus:ring-adek-blue/20"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-navy">Phone number</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    autoComplete="tel"
                    required
                    className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-adek-blue focus:ring-2 focus:ring-adek-blue/20"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-navy">National ID number</span>
                  <input
                    type="password"
                    value={form.idNumber}
                    onChange={(event) => update('idNumber', event.target.value)}
                    autoComplete="off"
                    required
                    className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none transition focus:border-adek-blue focus:ring-2 focus:ring-adek-blue/20"
                  />
                </label>
              </div>

              {state === 'error' ? (
                <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {errorMessage}
                </p>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm)
                    setResult(null)
                    setErrorMessage('')
                    setState('idle')
                  }}
                  className="text-sm font-medium text-muted-foreground transition hover:text-navy"
                >
                  Clear details
                </button>
                <CtaButton type="submit" variant="primary" disabled={state === 'loading'}>
                  {state === 'loading' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="size-4" aria-hidden="true" />
                      Verify Status
                    </>
                  )}
                </CtaButton>
              </div>
            </form>

            <aside className="border-t border-border bg-offwhite p-5 sm:p-6 lg:border-l lg:border-t-0">
              {!result ? (
                <div className="flex h-full min-h-56 flex-col justify-center rounded-xl border border-dashed border-border bg-background p-5">
                  <ShieldCheck className="size-9 text-adek-blue" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-bold text-navy">
                    Privacy-first confirmation
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    The system checks approved membership records using protected
                    identifiers and does not display private contact or ID details.
                  </p>
                </div>
              ) : result.isMember ? (
                <div className="rounded-xl border border-adek-blue/25 bg-background p-5">
                  <span className="flex size-12 items-center justify-center rounded-full bg-adek-blue text-white">
                    <BadgeCheck className="size-6" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-sm font-semibold tracking-[0.14em] text-adek-blue-600 uppercase">
                    Membership confirmed
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-navy">
                    {result.member.fullName}
                  </h3>
                  <dl className="mt-5 grid gap-3 text-sm">
                    <div className="rounded-lg border border-border bg-offwhite p-3">
                      <dt className="text-muted-foreground">Membership number</dt>
                      <dd className="mt-1 font-mono font-semibold text-navy">
                        {result.member.membershipNumber}
                      </dd>
                    </div>
                    <div className="rounded-lg border border-border bg-offwhite p-3">
                      <dt className="text-muted-foreground">Date joined</dt>
                      <dd className="mt-1 font-semibold text-navy">
                        {formatDate(result.member.dateJoined)}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <div className="rounded-xl border border-gold/30 bg-background p-5">
                  <span className="flex size-12 items-center justify-center rounded-full bg-gold-soft text-gold-600">
                    <UserX className="size-6" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-sm font-semibold tracking-[0.14em] text-gold-600 uppercase">
                    No active membership found
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-navy">
                    We could not confirm this record as an approved member.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Check the details and try again, or start an application if
                    you are not yet registered.
                  </p>
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>
    </>
  )
}
