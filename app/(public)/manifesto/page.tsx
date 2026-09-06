import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { ManifestoIndex } from '@/components/manifesto/manifesto-index'
import { ContentStatusBadge } from '@/components/editorial/content-status-badge'
import { JoinCTA } from '@/components/editorial/join-cta'
import { manifestoPillars } from '@/content/manifesto'

export const metadata: Metadata = {
  title: 'Draft Manifesto & Policy Framework',
  description:
    'The ADEK draft manifesto is organised into ten policy pillars. Draft — pending final approval.',
}

export default function ManifestoPage() {
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Draft Manifesto & Policy Framework"
        lead="Our draft priorities for Kenya, organised into ten policy pillars. This document is a draft and has not yet been finally approved."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Manifesto' }]}
      >
        <ContentStatusBadge status="DRAFT" label="Draft — Pending Final Approval" />
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
                Ten Pillars
              </p>
              <h2 className="mt-3 text-balance text-2xl font-bold text-navy sm:text-3xl">
                The framework at a glance
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Select any pillar to read its supplied description. Detailed
                policy content will be added once the manifesto is finalised.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {manifestoPillars.length} pillars
            </p>
          </div>

          <div className="mt-12">
            <ManifestoIndex />
          </div>
        </Container>
      </section>

      <div className="pb-12">
        <JoinCTA />
      </div>
    </>
  )
}
