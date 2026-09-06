import { cn } from '@/lib/utils'
import { ImagePlaceholder } from '@/components/editorial/image-placeholder'

/**
 * Flexible leadership card. Real content (name/role/bio/portrait) can populate
 * these props later. Until then it renders a labelled portrait placeholder with
 * NO fabricated names, titles or biographies.
 */
export function LeadershipPlaceholder({
  count = 4,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex flex-col gap-4">
          <ImagePlaceholder
            ratio="4/5"
            label="Leadership Portrait"
            note="Pending approval"
          />
          <div>
            {/* PENDING CLIENT INPUT: leadership name */}
            <div className="h-4 w-3/4 rounded bg-muted" aria-hidden="true" />
            {/* PENDING CLIENT INPUT: leadership role/title */}
            <div className="mt-2 h-3 w-1/2 rounded bg-muted/70" aria-hidden="true" />
            <span className="sr-only">
              Leadership information pending client approval.
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
