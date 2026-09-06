'use client'

import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { CtaButton } from '@/components/editorial/cta'

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'primary',
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'primary' | 'danger'
  onConfirm: () => void
  onCancel: () => void
}) {
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-navy-900/50" onClick={onCancel} aria-hidden="true" />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby={description ? 'confirm-desc' : undefined}
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        <h2 id="confirm-title" className="font-display text-lg font-bold text-navy">
          {title}
        </h2>
        {description ? (
          <div id="confirm-desc" className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </div>
        ) : null}
        <div className="mt-6 flex justify-end gap-3">
          <CtaButton onClick={onCancel} variant="outline">
            {cancelLabel}
          </CtaButton>
          <CtaButton
            autoFocus
            onClick={onConfirm}
            variant="primary"
            className={cn(tone === 'danger' && 'bg-destructive hover:bg-destructive/90')}
          >
            {confirmLabel}
          </CtaButton>
        </div>
      </div>
    </div>
  )
}
