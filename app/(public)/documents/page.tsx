import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { DocumentLibrary } from '@/components/documents/document-library'

export const metadata: Metadata = {
  title: 'Official Documents',
  description:
    'The ADEK document library — party constitution, party rules, draft manifesto and membership form. Availability reflects each document\u2019s current status.',
}

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Official Documents"
        title="Document library"
        lead="Governing documents and policy materials. Each item shows its current status and becomes available for viewing once approved."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Official Documents' }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <DocumentLibrary />
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Document metadata such as file size, publication date and revision
            history will be shown here once official files are supplied. No such
            details are fabricated in the meantime.
          </p>
        </Container>
      </section>
    </>
  )
}
