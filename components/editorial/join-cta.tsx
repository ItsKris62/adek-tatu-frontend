import { Container } from '@/components/layout/container'
import { CtaLink } from '@/components/editorial/cta'

export function JoinCTA() {
  return (
    <section className="py-8">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-navy px-6 py-12 text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 size-[360px] rounded-full border border-gold/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 -right-24 size-[280px] rounded-full border border-white/[0.06]"
          />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              <span aria-hidden="true" className="h-0.5 w-5 rounded-full bg-gold" />
              Participate
            </span>
            <h2 className="mt-4 text-balance text-3xl leading-tight font-bold sm:text-4xl">
              Be part of a united, democratic and prosperous Kenya.
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-white/75">
              Membership information and the approved recruitment requirements
              will be published here once finalised.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/join" variant="gold" size="lg">
                Learn About Membership
              </CtaLink>
              <CtaLink
                href="/join/recruitment-procedure"
                variant="outline"
                size="lg"
                withArrow
                className="border-white/25 text-white hover:border-white hover:bg-white hover:text-navy"
              >
                Recruitment Procedure
              </CtaLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
