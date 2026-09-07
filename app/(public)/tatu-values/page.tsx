import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { TatuValues } from '@/components/tatu/tatu-values'
import { RelatedLinks } from '@/components/editorial/related-links'
import { tatuValues } from '@/content/values'

import { Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'TATU Values',
  description:
    'TATU is the ADEK values system: Teamwork, Accountability, Transparency and Unity. Download the official core values document.',
}

export default function TatuValuesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Values"
        title="TATU"
        lead="Teamwork, Accountability, Transparency and Unity — the four commitments at the heart of ADEK."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'TATU Values' }]}
      >
        <div className="mt-2">
          <a
            href="/documents/ADEK%20TATU%20CORE%20VALUE.pdf"
            download="ADEK TATU CORE VALUE.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-gold px-4 text-xs font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Download Core Values PDF
          </a>
        </div>
      </PageHero>

      {/* Interactive TATU system */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <TatuValues />
          </div>
        </Container>
      </section>

      {/* Full definitions — editorial rows so mobile always has the content */}
      <section className="border-t border-border bg-offwhite py-16 lg:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-2 md:grid-cols-2">
            {tatuValues.map((value, i) => (
              <div
                key={value.title}
                className="flex gap-5 border-t border-border py-8"
              >
                <span className="font-display text-3xl font-extrabold text-adek-blue/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-lg font-extrabold text-adek-blue-600">
                      {value.letter}
                    </span>
                    <h2 className="font-display text-xl font-bold text-navy">
                      {value.title}
                    </h2>
                  </div>
                  <p className="mt-3 max-w-prose text-base leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <RelatedLinks
            links={[
              { label: 'Ideology', description: 'Inclusive Social Democracy.', href: '/ideology' },
              { label: 'Vision, Mission & Values', description: 'Our direction.', href: '/vision-mission-values' },
              { label: 'Manifesto', description: 'The official policy framework.', href: '/manifesto' },
            ]}
          />
        </Container>
      </section>
    </>
  )
}
