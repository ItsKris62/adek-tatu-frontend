import Image from 'next/image'
import { cn } from '@/lib/utils'

const PLACEHOLDER_NEWS_IMAGES = [
  {
    src: '/images/news-1.jpg',
    category: 'Community & Grassroots',
    title: 'Grassroots Civic Engagement and Community Outreach',
  },
  {
    src: '/images/news-2.jpg',
    category: 'Policy & Governance',
    title: 'Inclusive National Development Policy Dialogues',
  },
  {
    src: '/images/news-3.jpg',
    category: 'Youth & Opportunity',
    title: 'Empowering Youth Leadership and Economic Participation',
  },
]

/**
 * News card placeholder with photography.
 */
export function NewsCard({
  featured = false,
  index = 0,
  imageSrc,
  className,
}: {
  featured?: boolean
  index?: number
  imageSrc?: string
  className?: string
}) {
  const item = PLACEHOLDER_NEWS_IMAGES[index % PLACEHOLDER_NEWS_IMAGES.length]
  const src = imageSrc || item.src

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-md',
        featured && 'sm:flex-row sm:gap-6 sm:p-5',
        className,
      )}
    >
      <div
        className={cn(
          'relative aspect-16/9 w-full overflow-hidden rounded-xl bg-slate-100',
          featured && 'sm:aspect-4/3 sm:w-1/2',
        )}
      >
        <Image
          src={src}
          alt="News placeholder"
          fill
          sizes={
            featured
              ? '(max-width: 640px) 100vw, 50vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        <div className="absolute bottom-2.5 left-2.5">
          <span className="inline-flex items-center rounded-md bg-gold/95 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-navy uppercase shadow-xs">
            {item.category}
          </span>
        </div>
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col justify-between pt-3 pb-1',
          featured && 'sm:justify-center sm:py-2',
        )}
      >
        <div>
          <span className="text-xs font-medium text-adek-blue-600">
            ADEK Newsroom
          </span>
          <h3
            className={cn(
              'mt-1 font-display font-bold text-navy transition-colors group-hover:text-adek-blue',
              featured ? 'text-xl sm:text-2xl' : 'text-base',
            )}
          >
            {item.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            Official party updates, press statements and event coverage will be published directly from the secretariat.
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-2.5 text-xs text-muted-foreground">
          <span>ADEK Secretariat</span>
          <span className="font-medium text-gold-600 transition-transform group-hover:translate-x-0.5">
            Read more &rarr;
          </span>
        </div>
      </div>
    </article>
  )
}
