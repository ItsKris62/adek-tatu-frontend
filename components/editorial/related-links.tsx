import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function RelatedLinks({
  title = 'Continue reading',
  links,
}: {
  title?: string
  links: { label: string; description?: string; href: string }[]
}) {
  return (
    <section aria-label={title}>
      <h2 className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
        <span aria-hidden="true" className="h-0.5 w-5 rounded-full bg-gold" />
        {title}
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-base font-bold text-navy transition-colors group-hover:text-navy">
                  {link.label}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-600"
                  aria-hidden="true"
                />
              </div>
              {link.description ? (
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {link.description}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
