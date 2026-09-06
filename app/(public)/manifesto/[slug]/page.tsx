import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Breadcrumbs } from '@/components/editorial/breadcrumbs'
import { ContentStatusBadge } from '@/components/editorial/content-status-badge'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { ImagePlaceholder } from '@/components/editorial/image-placeholder'
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
    title: `${pillar.number} — ${pillar.title} (Draft)`,
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
              <ContentStatusBadge status="DRAFT" label="Draft — Pending Final Approval" />
              <h1 className="mt-4 max-w-3xl text-balance text-3xl leading-[1.05] font-bold text-navy sm:text-4xl lg:text-5xl">
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

            <div className="mt-10">
              {/* Only the supplied description is used. No expanded policy copy. */}
              <PendingNotice status="DRAFT" title="Detailed policy content pending final manifesto approval">
                Expanded detail for this pillar will be published once the
                manifesto is finalised and approved. The summary above is the
                current supplied wording.
              </PendingNotice>
            </div>
          </div>

          <aside className="lg:pt-1">
            <ImagePlaceholder
              ratio="3/2"
              label="Policy Illustration"
              note="Pending client asset"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Pillar {pillar.number} of {manifestoPillars.length} in the ADEK
              draft policy framework.
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
