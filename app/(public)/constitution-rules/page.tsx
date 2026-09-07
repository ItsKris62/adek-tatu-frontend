import type { Metadata } from 'next'
import { Download, FileText, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { SectionHeader } from '@/components/editorial/section-header'
import { RelatedLinks } from '@/components/editorial/related-links'

export const metadata: Metadata = {
  title: 'Party Constitution & Rules',
  description:
    'The official party constitution and internal rules governing ADEK TATU. Download the official PDF.',
}

export default function ConstitutionRulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Governance"
        title="Party Constitution & Rules"
        lead="The official governing document establishing the constitutional framework, democratic procedures, and internal rules of ADEK TATU."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Constitution & Rules' },
        ]}
      >
        <div className="mt-2">
          <a
            href="/documents/ADEK%20TATU%20PARTY%20CONSTITUTION.pdf"
            download="ADEK TATU PARTY CONSTITUTION.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-gold px-4 text-xs font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Download Party Constitution PDF
          </a>
        </div>
      </PageHero>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:gap-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeader
              eyebrow="Governing Document"
              title="Official Party Constitution"
              description="The supreme internal governing legal document of the Alliance for Democracy and Equality in Kenya (ADEK TATU)."
            />

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-navy">
                    <FileText className="size-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy">
                      ADEK TATU Party Constitution & Rules
                    </h3>
                    <p className="mt-1 text-xs font-medium text-gold-600">
                      Official Approved Document &bull; PDF Format
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      This document sets forth the foundational principles, organizational organs, leadership mandates, membership rights and responsibilities, internal dispute resolution, and electoral rules of the party.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-border/60 pt-6">
                  <h4 className="text-xs font-semibold tracking-wider text-navy uppercase">
                    Core Provisions
                  </h4>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                      <span>Party Objectives & Ideology</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                      <span>Membership Rights & Duties</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                      <span>National Executive Organs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                      <span>County & Grassroots Structures</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                      <span>Democratic Nomination Rules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                      <span>Discipline & Dispute Resolution</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="/documents/ADEK%20TATU%20PARTY%20CONSTITUTION.pdf"
                    download="ADEK TATU PARTY CONSTITUTION.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-gold px-5 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Download Official Constitution (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-12">
            <RelatedLinks
              links={[
                {
                  label: 'Party Manifesto',
                  description: 'The ten-pillar policy framework for Kenya.',
                  href: '/manifesto',
                },
                {
                  label: 'TATU Values',
                  description: 'Teamwork, Accountability, Transparency and Unity.',
                  href: '/tatu-values',
                },
                {
                  label: 'Official Documents',
                  description: 'Browse all party documents and publications.',
                  href: '/documents',
                },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  )
}
