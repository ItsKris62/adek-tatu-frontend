import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function BrandMark({
  className,
  variant = 'default',
  size = 40,
}: {
  className?: string
  variant?: 'default' | 'inverse'
  size?: number
}) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue focus-visible:ring-offset-2',
        variant === 'inverse' && 'focus-visible:ring-offset-navy',
        className,
      )}
      aria-label="ADEK TATU — home"
    >
      <Image
        src="/adek-logo.png"
        alt=""
        width={size}
        height={size}
        priority
        className="h-auto w-auto"
        style={{ width: size, height: size }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[15px] font-extrabold tracking-tight',
            variant === 'inverse' ? 'text-white' : 'text-navy',
          )}
        >
          ADEK TATU
        </span>
        <span
          className={cn(
            'mt-1 text-[10px] font-medium tracking-[0.14em] uppercase',
            variant === 'inverse' ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          Umoja Wetu, Nguvu Yetu
        </span>
      </span>
    </Link>
  )
}
