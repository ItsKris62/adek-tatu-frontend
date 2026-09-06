import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'start',
  className,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'start' | 'center'
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-adek-blue-600 uppercase">
          <span aria-hidden="true" className="h-px w-6 bg-adek-blue/50" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance text-3xl leading-[1.05] font-bold text-navy sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'max-w-[62ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}
