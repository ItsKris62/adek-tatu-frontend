import { Container } from '@/components/layout/container'
import { CtaLink } from '@/components/editorial/cta'
import { ImagePlaceholder } from '@/components/editorial/image-placeholder'
import { site } from '@/content/site'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-offwhite">
      {/* Emblem-inspired concentric arcs, anchored right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[8%] size-[640px] rounded-full border border-gold/15" />
        <div className="absolute -top-10 right-[16%] size-[440px] rounded-full border border-navy/[0.05]" />
      </div>

      <Container className="relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-gold" />
            Official Website of ADEK
          </span>

          <h1 className="mt-5 text-balance text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] font-bold text-navy">
            Alliance for Democracy and Equality in Kenya
          </h1>

          <p className="mt-6 font-display text-xl font-semibold text-adek-blue-600 sm:text-2xl">
            {site.slogan}
          </p>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            An inclusive social democracy founded on equality, accountable
            leadership, economic opportunity and national unity — anchored in
            teamwork, accountability, transparency and unity.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/join" variant="primary" size="lg">
              Join ADEK
            </CtaLink>
            <CtaLink href="/manifesto" variant="outline" size="lg" withArrow>
              Explore Manifesto
            </CtaLink>
          </div>
        </div>

        <div className="relative">
          <ImagePlaceholder
            ratio="4/5"
            label="Official ADEK Photography"
            note="Hero image · pending client asset"
            className="mx-auto max-w-[440px]"
          />
        </div>
      </Container>
    </section>
  )
}
