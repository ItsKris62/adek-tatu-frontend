import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'

type Ratio = '4/5' | '3/4' | '16/9' | '4/3' | '3/2' | '1/1'

/**
 * Designed placeholder for official photography that is PENDING CLIENT INPUT.
 * No stock photos or generated people — a restrained institutional frame only.
 */
export function ImagePlaceholder({
  ratio = '4/5',
  label = 'Official ADEK Photography',
  note = 'Pending client asset',
  className,
}: {
  ratio?: Ratio
  label?: string
  note?: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={`${label}. ${note}.`}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
      className={cn(
        'relative w-full overflow-hidden rounded-xl border border-navy/10 bg-secondary',
        className,
      )}
    >
      {/* Concentric ring geometry inspired by the ADEK emblem */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 42%, transparent 28%, color-mix(in oklab, var(--navy) 8%, transparent) 28.4%, transparent 29%), radial-gradient(circle at 50% 42%, transparent 40%, color-mix(in oklab, var(--navy) 6%, transparent) 40.4%, transparent 41%), radial-gradient(circle at 50% 42%, transparent 54%, color-mix(in oklab, var(--navy) 5%, transparent) 54.4%, transparent 55%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="flex size-11 items-center justify-center rounded-full border border-navy/15 bg-background text-navy">
          <ImageIcon className="size-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-navy">{label}</span>
        <span className="text-xs tracking-wide text-muted-foreground uppercase">
          {note}
        </span>
      </div>
    </div>
  )
}
