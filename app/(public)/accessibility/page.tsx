import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'

export const metadata: Metadata = {
  title: 'Accessibility',
  description:
    'How the ADEK website has been designed with accessibility considerations in mind.',
}

const considerations = [
  'Semantic HTML structure with clear heading order and landmarks.',
  'Keyboard navigation and visible focus states throughout.',
  'Colour choices intended to support readable contrast.',
  'Touch targets sized for comfortable use on mobile.',
  'Reduced-motion support for visitors who prefer less animation.',
  'A skip-to-content link and labelled interactive controls.',
]

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Information"
        title="Accessibility"
        lead="We want the ADEK website to be usable by as many people as possible. This page explains the accessibility considerations applied during design and development."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]}
      />

      <section className="py-16 lg:py-24">
        <Container className="max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            This website has been built with accessibility in mind. We do not
            claim formal certification or conformance to a specific standard; the
            points below describe the practical considerations that guided the
            work.
          </p>

          <ul className="mt-10 space-y-4">
            {considerations.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-adek-blue/10 text-adek-blue-600">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="text-base leading-relaxed text-foreground/90">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-base leading-relaxed text-muted-foreground">
            Accessibility is an ongoing effort and this statement will be updated
            as the website develops.
          </p>
        </Container>
      </section>
    </>
  )
}
