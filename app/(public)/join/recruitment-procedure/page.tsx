import type { Metadata } from 'next'
import { Info } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { CtaLink } from '@/components/editorial/cta'

export const metadata: Metadata = {
  title: 'Recruitment Procedure',
  description:
    'A conceptual overview of the ADEK membership recruitment workflow. This describes a website demonstration flow, separate from any future official regulatory process.',
}

const steps = [
  'Prospective member begins recruitment / application.',
  'Applicant supplies the required particulars and gives express consent.',
  'System checks compulsory fields.',
  'Application is submitted to ADEK.',
  'Authorized ADEK official reviews the application.',
  'Party approves, rejects, or requires correction as appropriate.',
  'Approved membership proceeds to the applicable party / register process.',
  'System prevents duplicate or unauthorized recruitment.',
  'Applicant receives confirmation.',
  'Party can maintain reports and an audit trail.',
]

export default function RecruitmentProcedurePage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Recruitment Procedure"
        lead="A conceptual overview of how membership recruitment is intended to work."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Join ADEK', href: '/join' },
          { label: 'Recruitment Procedure' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl">
          <div className="mb-10 flex items-start gap-2.5 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm leading-relaxed text-[#7a5a00]">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p>
              <strong>Website demonstration workflow.</strong> The process below
              describes the intended flow within this website. It is separate
              from any future official regulatory process, and this site does not
              claim direct integration with external regulatory systems.
            </p>
          </div>

          <ol className="relative">
            <span aria-hidden="true" className="absolute top-3 bottom-3 left-[19px] w-px bg-border" />
            {steps.map((step, i) => (
              <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-navy/10 bg-navy text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-2 text-base leading-relaxed text-foreground/90">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/join/application" variant="primary" withArrow>
              Start Application
            </CtaLink>
            <CtaLink href="/join/eligibility" variant="outline" withArrow>
              Eligibility
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  )
}
