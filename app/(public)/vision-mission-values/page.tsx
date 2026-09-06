import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { SectionHeader } from '@/components/editorial/section-header'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { TatuValues } from '@/components/tatu/tatu-values'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Vision, Mission & Values',
  description:
    'The vision and values of ADEK TATU. Our vision is a united, democratic and prosperous Kenya where every citizen has an equal opportunity to succeed and live with dignity.',
}

export default function VisionMissionValuesPage() {
  return (
    <>
      <PageHero
        eyebrow="Direction"
        title="Vision, Mission & Values"
        lead="The commitments that define ADEK and guide how we serve Kenya."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Vision, Mission & Values' },
        ]}
      />

      {/* Vision */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeader eyebrow="Vision" title="Where we are going" />
          <blockquote className="mt-8 max-w-4xl border-l-2 border-adek-blue pl-6 font-display text-2xl leading-snug font-bold text-navy sm:text-3xl lg:text-4xl">
            &ldquo;{site.vision}&rdquo;
          </blockquote>
        </Container>
      </section>

      {/* Mission — pending */}
      <section className="border-y border-border bg-offwhite py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader eyebrow="Mission" title="How we will get there" />
          {/* PENDING CLIENT INPUT: official mission statement. Do not fabricate. */}
          <PendingNotice title="Mission statement pending client approval">
            The official ADEK mission statement will be published here once it has
            been supplied and approved.
          </PendingNotice>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeader
            eyebrow="Values"
            title="TATU"
            description="Teamwork, Accountability, Transparency and Unity — the ADEK values system."
          />
          <TatuValues />
        </Container>
      </section>
    </>
  )
}
