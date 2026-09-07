import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Breadcrumbs } from '@/components/editorial/breadcrumbs'
import Image from 'next/image'
import {
  manifestoPillars,
  getPillar,
  getPillarNeighbours,
} from '@/content/manifesto'

export function generateStaticParams() {
  return manifestoPillars.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pillar = getPillar(slug)
  if (!pillar) return { title: 'Manifesto pillar not found' }
  return {
    title: `${pillar.number} — ${pillar.title} | ADEK Manifesto`,
    description: pillar.description,
  }
}

export default async function ManifestoPillarPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pillar = getPillar(slug)
  if (!pillar) notFound()

  const { prev, next } = getPillarNeighbours(slug)

  return (
    <article>
      <section className="border-b border-border bg-offwhite">
        <Container className="py-10 lg:py-14">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Manifesto', href: '/manifesto' },
              { label: pillar.title },
            ]}
          />
          <div className="mt-8 flex items-start gap-5 lg:gap-8">
            <span
              aria-hidden="true"
              className="font-display text-5xl font-extrabold text-adek-blue/25 sm:text-7xl"
            >
              {pillar.number}
            </span>
            <div className="flex-1">
              <h1 className="mt-1 max-w-3xl text-balance text-3xl leading-[1.05] font-bold text-navy sm:text-4xl lg:text-5xl">
                {pillar.title}
              </h1>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div className="max-w-[70ch]">
            <p className="text-xl leading-relaxed font-medium text-navy">
              {pillar.description}
            </p>
          </div>

          <aside className="lg:pt-1">
            <div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl border border-border/80 bg-slate-100 shadow-sm">
              <Image
                src="/images/policy-pillar.jpg"
                alt={pillar.title}
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center rounded-md bg-gold/90 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-navy uppercase shadow-xs">
                  Pillar {pillar.number}
                </span>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Strategic policy pillar of the ADEK 10-point national framework.
            </p>
          </aside>
        </Container>
      </section>

      {/* Prev / next navigation */}
      <section className="border-t border-border py-10">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
            {prev ? (
              <Link
                href={`/manifesto/${prev.slug}`}
                className="group flex flex-1 items-center gap-3 rounded-xl border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-adek-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue"
              >
                <ArrowLeft className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-adek-blue" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-xs tracking-wide text-muted-foreground uppercase">
                    Previous · {prev.number}
                  </span>
                  <span className="block truncate font-semibold text-navy">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <span className="hidden flex-1 sm:block" />
            )}

            {next ? (
              <Link
                href={`/manifesto/${next.slug}`}
                className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-border p-4 text-right transition-all hover:-translate-y-0.5 hover:border-adek-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue"
              >
                <span className="min-w-0">
                  <span className="block text-xs tracking-wide text-muted-foreground uppercase">
                    Next · {next.number}
                  </span>
                  <span className="block truncate font-semibold text-navy">{next.title}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-adek-blue" aria-hidden="true" />
              </Link>
            ) : (
              <span className="hidden flex-1 sm:block" />
            )}
          </div>

          <div className="mt-8">
            <Link
              href="/manifesto"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-adek-blue"
            >
              <ArrowUpRight className="size-4 rotate-[-135deg] transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              Back to manifesto
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
