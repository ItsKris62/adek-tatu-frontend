import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { manifestoPillars } from '@/content/manifesto'

export function ManifestoRow({
  number,
  slug,
  title,
  description,
}: {
  number: string
  slug: string
  title: string
  description: string
}) {
  return (
    <Link
      href={`/manifesto/${slug}`}
      className="group flex gap-4 border-t border-border py-6 transition-colors first:border-t-0 hover:border-adek-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue focus-visible:ring-offset-4 sm:gap-6"
    >
      <span className="font-display text-2xl font-bold text-border transition-colors group-hover:text-adek-blue">
        {number}
      </span>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-balance text-lg font-bold text-navy transition-colors group-hover:text-adek-blue sm:text-xl">
            {title}
          </h3>
          <ArrowUpRight
            className="mt-1 size-5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-adek-blue"
            aria-hidden="true"
          />
        </div>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  )
}

export function ManifestoIndex({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-x-12 md:grid-cols-2', className)}>
      <div>
        {manifestoPillars.slice(0, 5).map((p) => (
          <ManifestoRow key={p.slug} {...p} />
        ))}
      </div>
      <div className="border-t border-border md:border-t-0">
        {manifestoPillars.slice(5).map((p) => (
          <ManifestoRow key={p.slug} {...p} />
        ))}
      </div>
    </div>
  )
}
