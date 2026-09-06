'use client'

import { useState, type ReactNode } from 'react'
import { CtaButton } from '@/components/editorial/cta'

/**
 * A button that surfaces a clearly-labelled "demo only" note when clicked.
 * Used across admin management screens where no backend action exists.
 */
export function DemoAction({
  label,
  message = 'This action is disabled in the frontend prototype.',
  icon,
  variant = 'primary',
}: {
  label: string
  message?: string
  icon?: ReactNode
  variant?: 'primary' | 'outline'
}) {
  const [shown, setShown] = useState(false)
  return (
    <div className="flex flex-col items-end gap-2">
      <CtaButton variant={variant} onClick={() => setShown(true)}>
        {icon}
        {label}
      </CtaButton>
      {shown ? (
        <p role="status" aria-live="polite" className="text-xs text-muted-foreground">
          {message}
        </p>
      ) : null}
    </div>
  )
}
