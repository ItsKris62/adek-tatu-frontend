import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { RelatedLinks } from '@/components/editorial/related-links'
import { ideology } from '@/content/ideology'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Ideology — Inclusive Social Democracy',
  description:
    'ADEK TATU believes in an inclusive social democracy founded on equality, accountable leadership, economic opportunity and national unity.',
}

export default function IdeologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Ideology"
        title={ideology.name}
        lead={ideology.lead}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Ideology' }]}
      />

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          {/* Long-form reading column, controlled width */}
          <article className="max-w-[72ch]">
            <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
              {ideology.paragraphs.map((paragraph, i) => (
                <div key={i}>
                  <p>{paragraph}</p>
                  {i < ideology.pullQuotes.length ? (
                    <p className="my-8 border-l-2 border-adek-blue pl-6 font-display text-xl font-semibold text-navy sm:text-2xl">
                      {ideology.pullQuotes[i]}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-border bg-offwhite p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
                Our Vision
              </p>
              <blockquote className="mt-3 font-display text-xl leading-snug font-bold text-navy sm:text-2xl">
                &ldquo;{site.vision}&rdquo;
              </blockquote>
            </div>
          </article>

          {/* Contextual side navigation (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                On this page
              </p>
              <ul className="mt-4 space-y-3 border-l border-border pl-4 text-sm">
                <li>
                  <span className="font-medium text-navy">Inclusive Social Democracy</span>
                </li>
                <li className="text-muted-foreground">Equality of opportunity</li>
                <li className="text-muted-foreground">Democratic governance</li>
                <li className="text-muted-foreground">Integrity in leadership</li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-t border-border bg-offwhite py-16 lg:py-20">
        <Container>
          <RelatedLinks
            links={[
              { label: 'Vision, Mission & Values', description: 'What guides our direction.', href: '/vision-mission-values' },
              { label: 'TATU Values', description: 'Teamwork, accountability, transparency, unity.', href: '/tatu-values' },
              { label: 'Manifesto', description: 'The draft policy framework.', href: '/manifesto' },
            ]}
          />
        </Container>
      </section>
    </>
  )
}
