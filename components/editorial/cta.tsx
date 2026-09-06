import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'blue' | 'gold' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'group/cta inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-adek-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-0'

const variants: Record<Variant, string> = {
  // Navy default -> ADEK Blue on hover, subtle lift
  primary:
    'bg-navy text-white hover:-translate-y-0.5 hover:bg-adek-blue hover:shadow-[0_10px_24px_-12px_rgba(8,47,103,0.55)]',
  // ADEK Blue -> Navy on hover
  blue: 'bg-adek-blue text-white hover:-translate-y-0.5 hover:bg-navy',
  // Gold -> Navy on hover
  gold: 'bg-gold text-navy hover:-translate-y-0.5 hover:bg-navy hover:text-white',
  // Transparent w/ navy border -> navy fill on hover
  outline:
    'border border-navy/25 bg-transparent text-navy hover:-translate-y-0.5 hover:border-navy hover:bg-navy hover:text-white',
  ghost: 'text-navy hover:text-adek-blue',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  withArrow?: boolean
  className?: string
  children: ReactNode
}

export function CtaLink({
  href,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className'>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  )
}

export function CtaButton({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </button>
  )
}
