import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { SectionHeader } from '@/components/editorial/section-header'
import { CtaLink } from '@/components/editorial/cta'
import { Reveal } from '@/components/editorial/reveal'
import { HomeHero } from '@/components/home/home-hero'
import { TatuValues } from '@/components/tatu/tatu-values'
import { ManifestoIndex } from '@/components/manifesto/manifesto-index'
import { DocumentLibrary } from '@/components/documents/document-library'
import { LeadershipPlaceholder } from '@/components/leadership/leadership-placeholder'
import { NewsCard } from '@/components/news/news-card'
import { JoinCTA } from '@/components/editorial/join-cta'
import { ideology } from '@/content/ideology'
import { site } from '@/content/site'

export const metadata: Metadata = {
  description:
    'Alliance for Democracy and Equality in Kenya (ADEK TATU). Umoja Wetu, Nguvu Yetu — an inclusive social democracy anchored in teamwork, accountability, transparency and unity.',
}

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* ADEK Introduction — Inclusive Social Democracy */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeader eyebrow="Our Ideology" title={ideology.name} />
          </Reveal>
          <Reveal delay={100} className="max-w-[68ch]">
            <p className="text-pretty text-xl leading-relaxed font-medium text-navy sm:text-2xl">
              {ideology.lead}
            </p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              {ideology.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <CtaLink href="/about" variant="blue" withArrow>
                Learn About ADEK
              </CtaLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* TATU signature */}
      <section className="border-y border-border bg-offwhite py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow="Our Values"
              title="TATU"
              description="The centrepiece of the ADEK values system — four commitments that guide how we lead and serve."
            >
              <div className="mt-2">
                <CtaLink href="/tatu-values" variant="ghost" withArrow className="px-0">
                  Explore TATU values
                </CtaLink>
              </div>
            </SectionHeader>
          </Reveal>
          <Reveal delay={100}>
            <TatuValues />
          </Reveal>
        </Container>
      </section>

      {/* Vision — editorial pause */}
      <section className="py-24 lg:py-32">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
              Our Vision
            </span>
            <blockquote className="mt-6 text-balance font-display text-3xl leading-[1.15] font-bold text-navy sm:text-4xl lg:text-5xl">
              &ldquo;{site.vision}&rdquo;
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* Manifesto priorities */}
      <section className="border-t border-border bg-offwhite py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Policy"
                title="Policy Framework"
                description="Ten pillars organising the party's priorities for Kenya."
              />
            </div>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <ManifestoIndex />
          </Reveal>
          <Reveal delay={150} className="mt-10">
            <CtaLink href="/manifesto" variant="primary" withArrow>
              Read the full manifesto
            </CtaLink>
          </Reveal>
        </Container>
      </section>

      {/* Leadership preview */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Leadership"
              title="The people leading ADEK"
              description="Official leadership information is pending client approval and will be published here once available."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <LeadershipPlaceholder />
          </Reveal>
          <Reveal delay={150} className="mt-10">
            <CtaLink href="/leadership" variant="outline" withArrow>
              Leadership
            </CtaLink>
          </Reveal>
        </Container>
      </section>

      {/* Official documents */}
      <section className="border-y border-border bg-offwhite py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow="Official Documents"
              title="Party document library"
              description="Governing documents and policy materials. Availability reflects each document's current status."
            >
              <div className="mt-2">
                <CtaLink href="/documents" variant="ghost" withArrow className="px-0">
                  View all documents
                </CtaLink>
              </div>
            </SectionHeader>
          </Reveal>
          <Reveal delay={100}>
            <DocumentLibrary />
          </Reveal>
        </Container>
      </section>

      {/* Join ADEK */}
      <div className="py-12">
        <JoinCTA />
      </div>

      {/* Latest news */}
      <section className="pb-24">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Newsroom"
              title="Latest news"
              description="The ADEK newsroom is being prepared. Official articles will appear here once supplied."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <NewsCard index={0} />
              <NewsCard index={1} />
              <NewsCard index={2} />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
