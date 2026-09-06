import { cn } from '@/lib/utils'
import type { ContentStatus } from '@/content/content-status'
import { statusLabels } from '@/content/content-status'

const styles: Record<ContentStatus, string> = {
  APPROVED: 'border-adek-blue/30 bg-adek-blue/10 text-adek-blue-600',
  DRAFT: 'border-gold/40 bg-gold/15 text-[#8a6400]',
  PENDING_CLIENT_INPUT: 'border-border bg-muted text-muted-foreground',
  PLACEHOLDER: 'border-border bg-muted text-muted-foreground',
  DO_NOT_PUBLISH: 'border-destructive/30 bg-destructive/10 text-destructive',
}

export function ContentStatusBadge({
  status,
  className,
  label,
}: {
  status: ContentStatus
  className?: string
  label?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase',
        styles[status],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-current opacity-80"
      />
      {label ?? statusLabels[status]}
    </span>
  )
}
