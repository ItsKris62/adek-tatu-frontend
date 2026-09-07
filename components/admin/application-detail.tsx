'use client'

import { useEffect, useState } from 'react'
import { Check, X, RotateCcw, Clock, Loader2, Send } from 'lucide-react'
import { StatusBadge } from '@/components/admin/status-badge'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { CtaButton } from '@/components/editorial/cta'
import { applicationStatusMeta, type ApplicationStatus } from '@/content/admin'
import {
  getAdminApplicationDetail,
  updateAdminApplicationStatus,
  addAdminApplicationReview,
  type AdminApplicationDetail as ApiDetail,
} from '@/lib/api/adminApplications'

type Action = 'under_review' | 'approve' | 'reject' | 'correction'

const actionMeta: Record<
  Action,
  {
    targetStatus: string
    title: string
    confirm: string
    done: string
    tone: 'primary' | 'danger'
  }
> = {
  under_review: {
    targetStatus: 'UNDER_REVIEW',
    title: 'Mark application Under Review?',
    confirm: 'Start Review',
    done: 'marked as under review',
    tone: 'primary',
  },
  approve: {
    targetStatus: 'APPROVED',
    title: 'Approve application?',
    confirm: 'Approve',
    done: 'approved',
    tone: 'primary',
  },
  reject: {
    targetStatus: 'REJECTED',
    title: 'Reject application?',
    confirm: 'Reject',
    done: 'rejected',
    tone: 'danger',
  },
  correction: {
    targetStatus: 'CORRECTION_REQUIRED',
    title: 'Request correction?',
    confirm: 'Request correction',
    done: 'marked for correction',
    tone: 'primary',
  },
}

export function ApplicationDetail({ id, fallbackRef }: { id: string; fallbackRef?: string }) {
  const [data, setData] = useState<ApiDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState<Action | null>(null)
  const [actionNote, setActionNote] = useState('')
  const [reviewNoteInput, setReviewNoteInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  function loadDetail() {
    setLoading(true)
    getAdminApplicationDetail(id)
      .then((res) => {
        setData(res)
      })
      .catch(() => {
        // Mock / Fallback record if API is offline
        setData({
          application: {
            id,
            applicationReference: fallbackRef || id,
            fullName: 'Applicant Demonstration',
            email: 'applicant@example.com',
            phone: '+254700000000',
            county: 'Nairobi',
            constituency: 'Westlands',
            occupation: 'Professional',
            idDocumentMasked: '******1234',
            consentGiven: true,
            consentTimestamp: new Date().toISOString(),
            consentVersion: 'v1.0-demo',
            status: 'SUBMITTED',
            submittedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          },
          reviews: [],
        })
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadDetail()
  }, [id])

  async function handleConfirmAction() {
    if (!pending) return
    setSubmitting(true)
    const target = actionMeta[pending]

    try {
      await updateAdminApplicationStatus(id, target.targetStatus, actionNote.trim() || undefined)
      setStatusMessage(`Application successfully ${target.done}.`)
      setActionNote('')
      setPending(null)
      loadDetail()
    } catch (err: any) {
      setStatusMessage(`Failed: ${err.message || 'Error updating status'}`)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleAddReviewNote(e: React.FormEvent) {
    e.preventDefault()
    if (!reviewNoteInput.trim()) return
    setSubmitting(true)

    try {
      await addAdminApplicationReview(id, reviewNoteInput.trim())
      setReviewNoteInput('')
      loadDetail()
    } catch (err: any) {
      setStatusMessage(`Failed: ${err.message || 'Error adding review note'}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading && !data) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-card">
        <Loader2 className="size-8 animate-spin text-adek-blue" />
      </div>
    )
  }

  if (!data) {
    return <p className="text-muted-foreground">Application record not found.</p>
  }

  const app = data.application
  const currentStatus = app.status as ApplicationStatus
  const meta = applicationStatusMeta[currentStatus] || { label: currentStatus, tone: 'neutral' }

  const fields: { label: string; value: string }[] = [
    { label: 'Reference', value: app.applicationReference },
    { label: 'Applicant Name', value: app.fullName },
    { label: 'Email', value: app.email },
    { label: 'Phone', value: app.phone },
    { label: 'County', value: app.county },
    { label: 'Constituency', value: app.constituency },
    { label: 'Occupation', value: app.occupation },
    { label: 'National ID (Masked)', value: app.idDocumentMasked },
    { label: 'Consent Status', value: app.consentGiven ? `Given (${app.consentVersion})` : 'Not recorded' },
    { label: 'Submitted', value: new Date(app.submittedAt).toLocaleString() },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-bold text-navy">Application Details</h2>
            <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
          </div>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.label}>
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{f.label}</dt>
                <dd className="mt-1 font-mono text-sm font-medium text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Review and Activity History */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-base font-bold text-navy">Review Trail & History</h3>
          {data.reviews.length === 0 ? (
            <p className="mt-3 text-xs text-muted-foreground">No review actions recorded yet.</p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {data.reviews.map((r) => (
                <li key={r.id} className="rounded-lg border border-border bg-offwhite p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy">{r.reviewerEmail}</span>
                    <span className="text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-foreground/90">
                    <span className="font-medium text-adek-blue">{r.action}</span>
                    {r.previousStatus !== r.newStatus ? ` (${r.previousStatus} → ${r.newStatus})` : ''}
                  </p>
                  {r.note ? <p className="mt-1 text-muted-foreground italic">&ldquo;{r.note}&rdquo;</p> : null}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddReviewNote} className="mt-5 flex flex-col gap-2">
            <label htmlFor="rev-note" className="text-xs font-semibold text-navy">
              Add Internal Note
            </label>
            <div className="flex gap-2">
              <input
                id="rev-note"
                type="text"
                value={reviewNoteInput}
                onChange={(e) => setReviewNoteInput(e.target.value)}
                placeholder="Type internal review note..."
                className="h-9 flex-1 rounded-lg border border-input bg-background px-3 text-xs outline-none focus-visible:border-adek-blue"
              />
              <CtaButton type="submit" variant="primary" disabled={submitting || !reviewNoteInput.trim()} size="sm">
                <Send className="size-3" />
                Add Note
              </CtaButton>
            </div>
          </form>
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-base font-bold text-navy">Recruitment Actions</h2>
          <p className="mt-1 text-xs text-muted-foreground">Authoritative administrative status workflow.</p>

          {statusMessage ? (
            <p role="status" aria-live="polite" className="mt-4 rounded-lg border border-adek-blue/25 bg-adek-blue/5 p-3 text-xs text-navy">
              {statusMessage}
            </p>
          ) : null}

          <div className="mt-4 flex flex-col gap-2.5">
            {currentStatus === 'SUBMITTED' && (
              <CtaButton variant="primary" onClick={() => setPending('under_review')} className="w-full justify-start">
                <Clock className="size-4" aria-hidden="true" />
                Start Review (Under Review)
              </CtaButton>
            )}

            {currentStatus === 'UNDER_REVIEW' && (
              <>
                <CtaButton variant="primary" onClick={() => setPending('approve')} className="w-full justify-start">
                  <Check className="size-4" aria-hidden="true" />
                  Approve Application
                </CtaButton>
                <CtaButton variant="outline" onClick={() => setPending('correction')} className="w-full justify-start">
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Request Correction
                </CtaButton>
                <CtaButton
                  variant="ghost"
                  onClick={() => setPending('reject')}
                  className="w-full justify-start border border-border text-destructive hover:bg-destructive/5 hover:text-destructive"
                >
                  <X className="size-4" aria-hidden="true" />
                  Reject Application
                </CtaButton>
              </>
            )}

            {currentStatus === 'CORRECTION_REQUIRED' && (
              <CtaButton variant="outline" onClick={() => setPending('under_review')} className="w-full justify-start">
                <Clock className="size-4" aria-hidden="true" />
                Re-open for Review
              </CtaButton>
            )}

            {(currentStatus === 'APPROVED' || currentStatus === 'REJECTED') && (
              <p className="text-xs text-muted-foreground">
                This application is in terminal state ({currentStatus}).
              </p>
            )}
          </div>
        </div>
      </aside>

      <ConfirmDialog
        open={pending !== null}
        title={pending ? actionMeta[pending].title : ''}
        confirmLabel={pending ? actionMeta[pending].confirm : 'Confirm'}
        tone={pending ? actionMeta[pending].tone : 'primary'}
        description={
          <div className="flex flex-col gap-3">
            <p>
              Transition application <strong className="text-navy">{app.applicationReference}</strong> to{' '}
              <strong>{pending ? actionMeta[pending].targetStatus : ''}</strong>.
            </p>
            <input
              type="text"
              value={actionNote}
              onChange={(e) => setActionNote(e.target.value)}
              placeholder="Optional transition note..."
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-xs outline-none focus-visible:border-adek-blue"
            />
          </div>
        }
        onCancel={() => {
          setPending(null)
          setActionNote('')
        }}
        onConfirm={handleConfirmAction}
      />
    </div>
  )
}
