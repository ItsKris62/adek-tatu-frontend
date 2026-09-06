import { cn } from '@/lib/utils'
import { ImagePlaceholder } from '@/components/editorial/image-placeholder'
import { ContentStatusBadge } from '@/components/editorial/content-status-badge'

/**
 * Structural news placeholder. No fabricated headlines, dates or authors.
 */
export function NewsCard({
  featured = false,
  className,
}: {
  featured?: boolean
  className?: string
}) {
  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-border bg-card p-4',
        featured && 'sm:flex-row sm:gap-6 sm:p-5',
        className,
      )}
    >
      <div className={cn(featured && 'sm:w-1/2')}>
        <ImagePlaceholder
          ratio="16/9"
          label="Article Image"
          note="Pending client input"
        />
      </div>
      <div className={cn('flex flex-col gap-3', featured && 'sm:w-1/2 sm:justify-center')}>
        <ContentStatusBadge status="PENDING_CLIENT_INPUT" className="self-start" />
        {/* PENDING CLIENT INPUT: article headline */}
        <div className="space-y-2" aria-hidden="true">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          News content pending client input.
        </p>
      </div>
    </article>
  )
}
