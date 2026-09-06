import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'
import { PageHero } from '@/components/layout/page-hero'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { LeadershipPlaceholder } from '@/components/leadership/leadership-placeholder'

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'ADEK leadership. Official leadership information is pending client approval.',
}

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The people leading ADEK"
        lead="Our leadership structure will be presented here with names, roles, biographies and official portraits once the information is supplied and approved."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Leadership' }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <PendingNotice title="Official leadership information pending client approval">
              The portraits below are placeholders that reserve the layout for
              official ADEK leadership. No names, titles or biographies have been
              added.
            </PendingNotice>
          </div>
          <LeadershipPlaceholder count={8} />
        </Container>
      </section>
    </>
  )
}
