import { cn } from '@/lib/utils'

type Tone = 'neutral' | 'positive' | 'warning' | 'negative' | 'info'

const tones: Record<Tone, string> = {
  neutral: 'border-border bg-muted text-muted-foreground',
  positive: 'border-adek-blue/25 bg-adek-blue/10 text-adek-blue-600',
  warning: 'border-gold/40 bg-gold/15 text-[#8a6400]',
  negative: 'border-destructive/25 bg-destructive/10 text-destructive',
  info: 'border-navy/20 bg-navy/5 text-navy',
}

export function StatusBadge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: Tone
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  )
}
