'use client'

import { useState } from 'react'
import { Check, X, RotateCcw } from 'lucide-react'
import { StatusBadge } from '@/components/admin/status-badge'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { CtaButton } from '@/components/editorial/cta'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { applicationStatusMeta, type DemoApplication } from '@/content/admin'

type Action = 'approve' | 'reject' | 'correction'

const actionMeta: Record<Action, { title: string; confirm: string; done: string; tone: 'primary' | 'danger' }> = {
  approve: { title: 'Approve application?', confirm: 'Approve', done: 'approved', tone: 'primary' },
  reject: { title: 'Reject application?', confirm: 'Reject', done: 'rejected', tone: 'danger' },
  correction: { title: 'Request correction?', confirm: 'Request correction', done: 'sent back for correction', tone: 'primary' },
}

export function ApplicationDetail({ application }: { application: DemoApplication }) {
  const [pending, setPending] = useState<Action | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const meta = applicationStatusMeta[application.status]

  const fields: { label: string; value: string }[] = [
    { label: 'Reference', value: application.id },
    { label: 'Applicant', value: application.applicant },
    { label: 'Region', value: application.region },
    { label: 'Channel', value: application.channel },
    { label: 'Received', value: application.received },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-bold text-navy">Application summary</h2>
            <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
          </div>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.label}>
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{f.label}</dt>
                <dd className="mt-1 text-sm font-medium text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <PendingNotice title="Applicant particulars pending approved membership form">
          The specific fields captured from applicants will be shown here once
          the approved ADEK membership form is supplied. This record uses
          synthetic demo values only.
        </PendingNotice>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-bold text-navy">Review actions</h2>
          <p className="mt-1 text-xs text-muted-foreground">Demonstration only — no records change.</p>

          {note ? (
            <p role="status" aria-live="polite" className="mt-4 rounded-lg border border-adek-blue/25 bg-adek-blue/5 p-3 text-sm text-navy">
              {note}
            </p>
          ) : null}

          <div className="mt-4 flex flex-col gap-2.5">
            <CtaButton variant="primary" onClick={() => setPending('approve')} className="w-full justify-start">
              <Check className="size-4" aria-hidden="true" />
              Approve
            </CtaButton>
            <CtaButton variant="outline" onClick={() => setPending('correction')} className="w-full justify-start">
              <RotateCcw className="size-4" aria-hidden="true" />
              Request correction
            </CtaButton>
            <CtaButton
              variant="ghost"
              onClick={() => setPending('reject')}
              className="w-full justify-start border border-border text-destructive hover:bg-destructive/5 hover:text-destructive"
            >
              <X className="size-4" aria-hidden="true" />
              Reject
            </CtaButton>
          </div>
        </div>
      </aside>

      <ConfirmDialog
        open={pending !== null}
        title={pending ? actionMeta[pending].title : ''}
        confirmLabel={pending ? actionMeta[pending].confirm : 'Confirm'}
        tone={pending ? actionMeta[pending].tone : 'primary'}
        description={
          <>
            This is a demonstration action for{' '}
            <strong className="text-navy">{application.id}</strong>. No real
            application is modified.
          </>
        }
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (pending) setNote(`Demo: application ${actionMeta[pending].done}. No backend action was performed.`)
          setPending(null)
        }}
      />
    </div>
  )
}
