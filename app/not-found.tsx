import { Container } from '@/components/layout/container'
import { BrandMark } from '@/components/layout/brand-mark'
import { CtaLink } from '@/components/editorial/cta'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-offwhite">
      <header className="border-b border-border bg-background">
        <Container className="flex h-16 items-center lg:h-[72px]">
          <BrandMark />
        </Container>
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-[10%] size-[420px] rounded-full border border-navy/[0.06]" />
          <div className="absolute top-10 right-[18%] size-[280px] rounded-full border border-navy/[0.05]" />
        </div>
        <Container className="relative py-20">
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
            Error 404
          </p>
          <h1 className="mt-4 max-w-2xl text-balance text-4xl leading-[1.05] font-bold text-navy sm:text-5xl lg:text-6xl">
            The page you are looking for could not be found.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            The page may have moved, or the address may be incorrect. You can
            return to the homepage or use one of the links below.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/" variant="primary" size="lg">
              Home
            </CtaLink>
            <CtaLink href="/manifesto" variant="outline" size="lg" withArrow>
              Manifesto
            </CtaLink>
            <CtaLink href="/contact" variant="ghost" size="lg" withArrow className="border border-border">
              Contact
            </CtaLink>
          </div>
        </Container>
      </main>
    </div>
  )
}
