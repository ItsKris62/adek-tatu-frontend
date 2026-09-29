import Image from 'next/image'
import { Container } from '@/components/layout/container'
import { CtaLink } from '@/components/editorial/cta'
import { site } from '@/content/site'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[43%] border-l border-white/10 lg:block">
        <div className="absolute -right-40 -top-24 size-[680px] rounded-full border border-gold/25" />
        <div className="absolute right-[-18%] top-24 size-[440px] rounded-full border border-adek-blue/30" />
        <div className="absolute bottom-14 left-10 h-px w-44 bg-gold/70" />
      </div>

      <Container className="relative grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
            <span aria-hidden="true" className="h-px w-9 bg-gold" />
            Official website of ADEK
          </span>

          <h1 className="mt-7 max-w-3xl text-balance font-display text-[clamp(3rem,7vw,6.6rem)] leading-[0.91] font-extrabold tracking-[-0.055em]">
            Alliance for Democracy <span className="text-adek-blue">&amp;</span> Equality in Kenya
          </h1>

          <p className="mt-8 font-display text-xl font-semibold text-white/90 sm:text-2xl">
            {site.slogan}
          </p>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            An inclusive social democracy founded on equality, accountable leadership, economic opportunity and national unity.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/join" variant="primary" size="lg">Join ADEK</CtaLink>
            <CtaLink href="/manifesto" variant="outline" size="lg" withArrow className="border-white/30 bg-transparent text-white hover:bg-white hover:text-navy">Explore Manifesto</CtaLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/20 bg-navy-900">
            <Image
              src="/images/hero-community.jpg"
              alt="ADEK community gathering"
              fill
              priority
              className="object-cover opacity-90 mix-blend-screen"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">01 / Together</span>
              <p className="mt-3 max-w-xs text-lg leading-snug text-white/90">A civic movement rooted in participation, dignity and shared responsibility.</p>
            </div>
          </div>
          <span aria-hidden="true" className="absolute -bottom-4 -left-4 h-20 w-20 border-b border-l border-gold" />
        </div>
      </Container>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
        <Container className="flex h-12 items-center justify-between text-[11px] tracking-[0.16em] text-white/50 uppercase">
          <span>Kenya / 01</span><span>Scroll to explore</span>
        </Container>
      </div>
    </section>
  )
}
