import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { ApplicationShell } from '@/components/membership/application-shell'

export const metadata: Metadata = {
  title: 'Membership Application',
  description:
    'Register to become an ADEK member. Complete the approved membership form and submit it for verification.',
  robots: { index: false, follow: true },
}

export default function ApplicationPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Membership Application"
        lead="Complete the approved ADEK membership registration form and submit your details for verification."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Join ADEK', href: '/join' },
          { label: 'Application' },
        ]}
      />

      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl">
          <ApplicationShell />
        </Container>
      </section>
    </>
  )
}
