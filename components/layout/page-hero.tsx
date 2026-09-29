import type { ReactNode } from 'react'
import { Container } from '@/components/layout/container'
import { Breadcrumbs } from '@/components/editorial/breadcrumbs'

export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  children,
}: {
  eyebrow?: string
  title: string
  lead?: ReactNode
  breadcrumbs?: { label: string; href?: string }[]
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-offwhite">
      <div
        aria-hidden="true"
        className="parallax-backdrop pointer-events-none absolute inset-0 -z-10 bg-[url('/images/nairobi-skyline.png')] bg-cover bg-[center_38%] opacity-[0.13] mix-blend-multiply"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-offwhite via-offwhite/90 to-offwhite/60" />
      {/* Subtle emblem-inspired arc geometry */
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full border border-gold/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-[380px] rounded-full border border-navy/[0.05]"
      />
      <Container className="relative py-12 lg:py-20">
        {breadcrumbs ? (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}
        {eyebrow ? (
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-gold" />
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-4 max-w-4xl text-balance text-4xl leading-[1.02] font-bold text-navy sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  )
}
