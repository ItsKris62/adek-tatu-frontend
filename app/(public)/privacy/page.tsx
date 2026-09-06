import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { ContentStatusBadge } from '@/components/editorial/content-status-badge'

export const metadata: Metadata = {
  title: 'Privacy & Data Protection',
  description:
    'The ADEK privacy and personal data protection notice. Final legal wording is pending client approval.',
}

// PENDING CLIENT INPUT: final privacy & personal data protection notice.
// DO NOT write legal assertions inside these structural section placeholders.
const sections = [
  'Information We Collect',
  'Purposes of Processing',
  'Consent',
  'Data Security',
  'Data Retention',
  'Your Rights',
  'Contact',
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy & Data Protection"
        lead="This page sets out the structure of the ADEK privacy notice. The final legal wording has not yet been supplied."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]}
      />

      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl">
          <PendingNotice title="Final Privacy & Personal Data Protection Notice — Pending Client Approval">
            The sections below reserve the structure of the notice. No legal
            statements are made until the approved wording is supplied.
          </PendingNotice>

          <ol className="mt-10 space-y-4">
            {sections.map((title, i) => (
              <li
                key={title}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="flex items-center gap-3 font-display text-lg font-bold text-navy">
                    <span className="font-display text-sm font-extrabold text-adek-blue/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {title}
                  </h2>
                  <ContentStatusBadge status="PENDING_CLIENT_INPUT" />
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
