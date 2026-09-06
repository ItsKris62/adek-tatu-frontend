import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ContentStatus } from '@/content/content-status'
import { ContentStatusBadge } from './content-status-badge'

/**
 * A calm, clearly-labelled notice for content that is not yet supplied/approved.
 * Never fabricate the missing content — describe its pending state only.
 */
export function PendingNotice({
  status = 'PENDING_CLIENT_INPUT',
  title,
  children,
  className,
}: {
  status?: ContentStatus
  title: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-offwhite p-6 sm:p-8',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full border border-navy/10 bg-background text-adek-blue-600">
          <Info className="size-4.5" aria-hidden="true" />
        </span>
        <ContentStatusBadge status={status} />
      </div>
      <p className="mt-4 text-lg font-semibold text-navy">{title}</p>
      {children ? (
        <div className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      ) : null}
    </div>
  )
}
