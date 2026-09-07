'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { tatuValues } from '@/content/values'

const nodePositions = [
  { left: '50%', top: '9%' }, // N
  { left: '91%', top: '50%' }, // E
  { left: '50%', top: '91%' }, // S
  { left: '9%', top: '50%' }, // W
]

const lineTargets = [
  { x: 50, y: 14 },
  { x: 86, y: 50 },
  { x: 50, y: 86 },
  { x: 14, y: 50 },
]

export function TatuValues() {
  const [active, setActive] = useState(0)
  const current = tatuValues[active]

  return (
    <div>
      {/* Desktop / tablet: radial compass */}
      <div className="hidden md:block">
        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          {/* connecting lines + rings */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="30" fill="none" stroke="var(--border)" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="41" fill="none" stroke="var(--border)" strokeWidth="0.4" />
            {lineTargets.map((t, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={t.x}
                y2={t.y}
                stroke={i === active ? 'var(--gold)' : 'var(--border)'}
                strokeWidth={i === active ? '1' : '0.4'}
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 flex aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-navy/10 bg-background p-6 text-center shadow-[0_20px_50px_-30px_rgba(8,47,103,0.4)]">
            <span className="font-display text-xs font-bold tracking-[0.4em] text-gold-600">
              TATU
            </span>
            <p className="mt-2 font-display text-xl font-bold text-navy">
              {current.title}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              {current.description}
            </p>
          </div>

          {/* Nodes */}
          {tatuValues.map((value, i) => {
            const isActive = i === active
            return (
              <button
                key={value.title}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`${value.title}: ${value.description}`}
                style={nodePositions[i]}
                className={cn(
                  'absolute flex size-[86px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
                  isActive
                    ? 'border-gold/50 bg-navy text-white ring-2 ring-gold/30 shadow-[0_16px_30px_-14px_rgba(245,168,0,0.45)]'
                    : 'border-border bg-background text-navy hover:border-gold/40 hover:text-navy',
                )}
              >
                <span
                  className={cn(
                    'font-display text-lg font-extrabold',
                    isActive ? 'text-gold' : 'text-navy',
                  )}
                >
                  {value.letter}
                </span>
                <span
                  className={cn(
                    'mt-0.5 text-[10px] font-semibold tracking-wide uppercase',
                    isActive ? 'text-white/90' : 'text-muted-foreground',
                  )}
                >
                  {value.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile: connected vertical sequence (all content visible) */}
      <ol className="relative md:hidden">
        <span
          aria-hidden="true"
          className="absolute top-6 bottom-6 left-[27px] w-px bg-border"
        />
        {tatuValues.map((value) => (
          <li key={value.title} className="relative flex gap-4 pb-8 last:pb-0">
            <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-navy font-display text-lg font-extrabold text-gold shadow-sm">
              {value.letter}
            </span>
            <div className="pt-1.5">
              <h3 className="font-display text-lg font-bold text-navy">
                {value.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
