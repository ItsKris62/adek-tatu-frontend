import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { NewsCard } from '@/components/news/news-card'
import { PendingNotice } from '@/components/editorial/pending-notice'

export const metadata: Metadata = {
  title: 'News',
  description:
    'The ADEK newsroom. Official articles will be published here once supplied.',
}

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News & updates"
        lead="Announcements, statements and updates from ADEK will be published here. The newsroom structure is ready and awaiting official content."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          {/* Featured slot */}
          <div className="mb-12">
            <h2 className="mb-5 text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
              Featured
            </h2>
            <NewsCard featured />
          </div>

          {/* Article grid */}
          <div className="mb-12">
            <h2 className="mb-5 text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
              Latest articles
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <NewsCard key={i} />
              ))}
            </div>
          </div>

          <PendingNotice title="News content pending client input" className="max-w-2xl">
            No articles, headlines, dates or authors have been created. This page
            demonstrates the future structure of the newsroom, including a
            featured article and an article grid.
          </PendingNotice>
        </Container>
      </section>
    </>
  )
}
