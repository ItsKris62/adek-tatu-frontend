import Image from 'next/image'
import { cn } from '@/lib/utils'

const PLACEHOLDER_LEADER_IMAGES = [
  {
    src: '/images/leader-1.jpg',
    role: 'Party Leadership',
    title: 'Executive Council',
  },
  {
    src: '/images/leader-2.jpg',
    role: 'Secretariat',
    title: 'Strategic Directorate',
  },
  {
    src: '/images/leader-3.jpg',
    role: 'County Representative',
    title: 'Regional Coordination',
  },
  {
    src: '/images/leader-4.jpg',
    role: 'Policy Committee',
    title: 'Advisory Board',
  },
]

/**
 * Flexible leadership card. Real content (name/role/bio/portrait) can populate
 * these props later. Until then it renders high-quality placeholder portraits.
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
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => {
        const item = PLACEHOLDER_LEADER_IMAGES[i % PLACEHOLDER_LEADER_IMAGES.length]
        return (
          <li
            key={i}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-3 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={item.src}
                alt="Leadership Portrait Placeholder"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-flex items-center rounded-md bg-gold/90 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-navy uppercase shadow-xs">
                  {item.role}
                </span>
              </div>
            </div>
            <div className="mt-3 flex flex-col px-1 pb-1">
              <span className="text-sm font-semibold text-navy">
                {item.title}
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground">
                Official announcement pending
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
