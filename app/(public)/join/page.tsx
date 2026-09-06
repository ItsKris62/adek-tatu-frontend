import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ClipboardList, ListChecks, ShieldCheck, UserPlus } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { CtaLink } from '@/components/editorial/cta'

export const metadata: Metadata = {
  title: 'Join ADEK',
  description:
    'Learn about ADEK membership. Membership information and the approved recruitment requirements will be published here once finalised.',
}

const journey = [
  {
    icon: ListChecks,
    title: 'Eligibility',
    description: 'Who can join and the requirements for membership.',
    href: '/join/eligibility',
  },
  {
    icon: ClipboardList,
    title: 'Recruitment Procedure',
    description: 'How the recruitment and application process works.',
    href: '/join/recruitment-procedure',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy & Data Protection',
    description: 'How your information would be handled and protected.',
    href: '/privacy',
  },
  {
    icon: UserPlus,
    title: 'Membership Application',
    description: 'Begin the application process.',
    href: '/join/application',
  },
]

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Join ADEK"
        lead="Becoming a member means standing for a united, democratic and prosperous Kenya. Membership information and the approved recruitment requirements will be published here once finalised."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Join ADEK' }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/join/application" variant="primary" size="lg">
            Start Application
          </CtaLink>
          <CtaLink href="/join/eligibility" variant="outline" size="lg" withArrow>
            Learn About Membership
          </CtaLink>
        </div>
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
            The membership journey
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2">
            {journey.map((item, i) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex h-full items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-adek-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue focus-visible:ring-offset-2"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-navy/10 bg-secondary text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-bold text-navy">
                          <span className="mr-2 text-adek-blue/40">{String(i + 1).padStart(2, '0')}</span>
                          {item.title}
                        </h3>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-adek-blue" aria-hidden="true" />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ol>
        </Container>
      </section>
    </>
  )
}
