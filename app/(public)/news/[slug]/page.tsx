import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { Breadcrumbs } from '@/components/editorial/breadcrumbs'
import { ImagePlaceholder } from '@/components/editorial/image-placeholder'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { NewsCard } from '@/components/news/news-card'

export const metadata: Metadata = {
  title: 'News article',
  description: 'ADEK news article. Content pending client input.',
  robots: { index: false, follow: true },
}

/**
 * Reusable article template. No fictional headline, date, author or body is
 * generated — the layout is shown in a development / pending state so real
 * article data can populate it later.
 */
export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  await params

  return (
    <article className="py-10 lg:py-16">
      <Container className="max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'News', href: '/news' },
            { label: 'Article' },
          ]}
        />

        <header className="mt-8">
          {/* PENDING CLIENT INPUT: article publication date */}
          <div className="h-3 w-32 rounded bg-muted" aria-hidden="true" />
          {/* PENDING CLIENT INPUT: article headline */}
          <div className="mt-5 space-y-3" aria-hidden="true">
            <div className="h-8 w-full rounded bg-muted" />
            <div className="h-8 w-3/4 rounded bg-muted" />
          </div>
          <span className="sr-only">
            Article headline and date pending client input.
          </span>
        </header>

        <div className="mt-8">
          <ImagePlaceholder ratio="16/9" label="Featured Image" note="Pending client input" />
        </div>

        <div className="mt-10">
          <PendingNotice title="This article is in development">
            Article content has not been supplied. The headline, publication
            date, featured image and body will be populated from official
            content, and share controls will be enabled once official URLs
            exist.
          </PendingNotice>
        </div>
      </Container>

      <Container className="mt-16 max-w-5xl">
        <h2 className="mb-5 text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
          Related news
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </Container>
    </article>
  )
}
