import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { PendingNotice } from '@/components/editorial/pending-notice'

export const metadata: Metadata = {
  title: 'Complaints & Dispute Resolution',
  description:
    'The ADEK complaints and dispute resolution procedure. The approved procedure is pending client approval.',
}

export default function ComplaintsPage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Complaints & Dispute Resolution"
        lead="How complaints and disputes are handled within ADEK will be published here once the official procedure is supplied and approved."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Complaints' }]}
      />

      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl">
          {/* PENDING CLIENT INPUT: complaints & dispute-resolution procedure. */}
          <PendingNotice title="Complaints and Dispute Resolution Procedure — Pending Client Approval">
            The official complaints and dispute-resolution procedure has not yet
            been supplied. No procedural or legal wording is provided here in the
            meantime.
          </PendingNotice>
        </Container>
      </section>
    </>
  )
}
