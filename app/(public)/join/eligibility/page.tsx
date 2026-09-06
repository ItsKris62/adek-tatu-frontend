import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { CtaLink } from '@/components/editorial/cta'

export const metadata: Metadata = {
  title: 'Membership Eligibility',
  description:
    'ADEK membership eligibility. Approved eligibility requirements are pending client input.',
}

export default function EligibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Eligibility"
        lead="Who can become a member of ADEK, and the requirements involved, will be published here once the official criteria are supplied and approved."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Join ADEK', href: '/join' },
          { label: 'Eligibility' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl">
          {/* PENDING CLIENT INPUT: membership eligibility criteria. Do not invent. */}
          <PendingNotice title="Approved membership eligibility requirements pending client input">
            This page reserves the layout for the eligibility criteria. No
            requirements, qualifications or fees are stated until the approved
            content is supplied.
          </PendingNotice>

          <div className="mt-8">
            <CtaLink href="/join/recruitment-procedure" variant="ghost" withArrow className="px-0">
              See how recruitment works
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  )
}
