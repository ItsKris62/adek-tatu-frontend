import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { SectionHeader } from '@/components/editorial/section-header'
import { TatuValues } from '@/components/tatu/tatu-values'
import { RelatedLinks } from '@/components/editorial/related-links'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { CtaLink } from '@/components/editorial/cta'
import { Reveal } from '@/components/editorial/reveal'
import { ideology } from '@/content/ideology'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About the Alliance for Democracy and Equality in Kenya (ADEK TATU) — an inclusive social democracy anchored in teamwork, accountability, transparency and unity.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ADEK"
        title="An inclusive movement for a united and equal Kenya"
        lead={`${site.name} — ${site.shorthand} — believes every Kenyan deserves an equal opportunity to participate in national development and share in the country's prosperity.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Identity */}
      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader eyebrow="Identity" title="Who we are" />
          <div className="max-w-[68ch] space-y-4 text-base leading-relaxed text-muted-foreground">
            <p className="text-xl leading-relaxed font-medium text-navy">
              {ideology.lead}
            </p>
            <p>
              The party is known in brief as <strong className="text-navy">ADEK TATU</strong>,
              and its slogan is <em className="text-navy not-italic">&ldquo;{site.slogan}&rdquo;</em>.
              Our identity is rooted in the TATU values — Teamwork,
              Accountability, Transparency and Unity.
            </p>
          </div>
        </Container>
      </section>

      {/* Ideology */}
      <section className="border-y border-border bg-offwhite py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader eyebrow="Our Ideology" title={ideology.name}>
            <div className="mt-2">
              <CtaLink href="/ideology" variant="ghost" withArrow className="px-0">
                Read the full ideology
              </CtaLink>
            </div>
          </SectionHeader>
          <div className="max-w-[68ch] space-y-4 text-base leading-relaxed text-muted-foreground">
            {ideology.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
              Our Vision
            </span>
            <blockquote className="mt-6 text-balance font-display text-2xl leading-[1.2] font-bold text-navy sm:text-4xl">
              &ldquo;{site.vision}&rdquo;
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* TATU preview */}
      <section className="border-y border-border bg-offwhite py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeader
            eyebrow="Our Values"
            title="TATU"
            description="Four commitments at the centre of everything ADEK does."
          />
          <TatuValues />
        </Container>
      </section>

      {/* History pending */}
      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader eyebrow="History" title="Our story" />
          {/* PENDING CLIENT INPUT: party founding history and organizational milestones. */}
          <PendingNotice title="Party history content pending client input">
            The history of ADEK, including founding milestones, will be published
            here once the official content is supplied and approved.
          </PendingNotice>
        </Container>
      </section>

      {/* Internal links */}
      <section className="pb-24">
        <Container>
          <RelatedLinks
            links={[
              { label: 'Manifesto', description: 'The ten-pillar policy framework.', href: '/manifesto' },
              { label: 'Leadership', description: 'The people leading ADEK.', href: '/leadership' },
              { label: 'Official Documents', description: 'Governing documents and materials.', href: '/documents' },
            ]}
          />
        </Container>
      </section>
    </>
  )
}
