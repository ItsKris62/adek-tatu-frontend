'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import { CtaButton } from '@/components/editorial/cta'

/**
 * Demonstration form only. It does NOT submit anywhere and does not imply an
 * operational email destination (no official email address has been supplied).
 */
export function ContactDemoForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      aria-describedby="contact-demo-note"
    >
      <p
        id="contact-demo-note"
        className="mb-6 flex items-start gap-2.5 rounded-lg border border-gold/40 bg-gold/10 p-3 text-sm text-[#7a5a00]"
      >
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        This is a demonstration form. It does not send messages. A working
        contact channel will be enabled once official details are supplied.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-name" className="text-sm font-medium text-navy">
            Full name
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            autoComplete="name"
            className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="c-subject" className="text-sm font-medium text-navy">
            Subject
          </label>
          <input
            id="c-subject"
            name="subject"
            type="text"
            className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="c-message" className="text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          className="rounded-lg border border-input bg-background p-3 text-sm outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <CtaButton type="submit" variant="primary">
          Send message
        </CtaButton>
        {submitted ? (
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            This is a demonstration only — no message was sent.
          </p>
        ) : null}
      </div>
    </form>
  )
}
