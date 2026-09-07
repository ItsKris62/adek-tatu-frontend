import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { ManifestoIndex } from '@/components/manifesto/manifesto-index'
import { JoinCTA } from '@/components/editorial/join-cta'
import { manifestoPillars } from '@/content/manifesto'

import { Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Manifesto & Policy Framework',
  description:
    'The ADEK party manifesto is organised into ten policy pillars. Download the official PDF or browse online.',
}

export default function ManifestoPage() {
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Party Manifesto & Policy Framework"
        lead="Our priorities for Kenya, organised into ten policy pillars. You can download the complete document or browse each pillar below."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Manifesto' }]}
      >
        <div>
          <a
            href="/documents/Party%20Manifesto%20ADEK%20TATU.pdf"
            download="Party Manifesto ADEK TATU.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-gold px-4 text-xs font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Download Manifesto PDF
          </a>
        </div>
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
                Ten Pillars
              </p>
              <h2 className="mt-3 text-balance text-2xl font-bold text-navy sm:text-3xl">
                The framework at a glance
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Select any pillar to read its supplied description. Detailed
                policy content will be added once the manifesto is finalised.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {manifestoPillars.length} pillars
            </p>
          </div>

          <div className="mt-12">
            <ManifestoIndex />
          </div>
        </Container>
      </section>

      <div className="pb-12">
        <JoinCTA />
      </div>
    </>
  )
}
