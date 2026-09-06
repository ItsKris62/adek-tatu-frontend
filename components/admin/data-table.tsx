import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export type Column<T> = {
  key: string
  header: string
  /** Hide on small screens (shown in the mobile card but not the desktop-priority set). */
  className?: string
  render: (row: T) => ReactNode
}

/**
 * Responsive table: a real <table> on desktop with horizontal scroll,
 * and stacked label/value cards on mobile so nothing is cramped.
 */
export function DataTable<T>({
  columns,
  rows,
  getKey,
  caption,
}: {
  columns: Column<T>[]
  rows: T[]
  getKey: (row: T) => string
  caption?: string
}) {
  return (
    <div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-border bg-card md:block">
        <table className="w-full border-collapse text-sm">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn('px-4 py-3 font-semibold text-navy', col.className)}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={getKey(row)}
                className="border-b border-border last:border-b-0 transition-colors hover:bg-muted/40"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3 align-middle text-foreground/90', col.className)}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="flex flex-col gap-3 md:hidden">
        {rows.map((row) => (
          <li key={getKey(row)} className="rounded-xl border border-border bg-card p-4">
            <dl className="flex flex-col gap-2">
              {columns.map((col) => (
                <div key={col.key} className="flex items-center justify-between gap-4">
                  <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {col.header}
                  </dt>
                  <dd className="text-right text-sm text-foreground/90">{col.render(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}
