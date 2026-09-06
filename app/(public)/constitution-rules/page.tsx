import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { SectionHeader } from '@/components/editorial/section-header'

export const metadata: Metadata = {
  title: 'Constitution & Rules',
  description:
    'Access to the ADEK party constitution and party rules. Both documents are pending client input.',
}

export default function ConstitutionRulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Constitution & Rules"
        lead="The official documents that govern how ADEK is organised and run. Both will be published here once supplied and approved."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Constitution & Rules' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:gap-16">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <SectionHeader eyebrow="Document" title="Party Constitution" />
            {/* PENDING CLIENT INPUT: constitution text. Do not summarise or invent. */}
            <PendingNotice title="Party Constitution — Pending Client Input">
              The official constitution will be made available here once the
              approved document has been supplied.
            </PendingNotice>
          </div>

          <div className="grid gap-8 border-t border-border pt-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <SectionHeader eyebrow="Document" title="Party Rules" />
            {/* PENDING CLIENT INPUT: party rules text. Do not summarise or invent. */}
            <PendingNotice title="Party Rules — Pending Client Input">
              The internal party rules will be made available here once the
              approved document has been supplied.
            </PendingNotice>
          </div>
        </Container>
      </section>
    </>
  )
}
