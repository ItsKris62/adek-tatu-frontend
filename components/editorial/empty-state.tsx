import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import { FileClock } from 'lucide-react'
import type { ReactNode } from 'react'

export function EmptyState({
  icon: Icon = FileClock,
  title,
  description,
  className,
  children,
}: {
  icon?: LucideIcon
  title: string
  description?: ReactNode
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-offwhite px-6 py-14 text-center',
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-full border border-navy/10 bg-background text-navy">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="text-base font-semibold text-navy">{title}</p>
      {description ? (
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}
