import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { SectionHeader } from '@/components/editorial/section-header'

export const metadata: Metadata = {
  title: 'Constitution & Rules',
  description:
    'Access to the combined ADEK party constitution and internal rules document. Pending client input.',
}

export default function ConstitutionRulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Party Constitution & Rules"
        lead="The official governing document combining the constitution and internal rules of ADEK. Will be published here once supplied and approved."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Constitution & Rules' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:gap-16">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <SectionHeader eyebrow="Governing Document" title="Party Constitution & Rules" />
            {/* PENDING CLIENT INPUT: combined constitution and rules text. Do not summarise or invent. */}
            <PendingNotice title="Party Constitution & Rules — Pending Client Input">
              The official combined constitution and rules document will be made
              available here once the approved file has been supplied.
            </PendingNotice>
          </div>
        </Container>
      </section>
    </>
  )
}
