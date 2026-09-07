'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight, Loader2 } from 'lucide-react'
import { DataTable, type Column } from '@/components/admin/data-table'
import { StatusBadge } from '@/components/admin/status-badge'
import { EmptyState } from '@/components/editorial/empty-state'
import {
  demoApplications,
  applicationStatusMeta,
  type ApplicationStatus,
} from '@/content/admin'
import { listAdminApplications, type AdminApplicationItem } from '@/lib/api/adminApplications'

const filters: { value: 'ALL' | ApplicationStatus; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'SUBMITTED', label: 'Submitted' },
  { value: 'UNDER_REVIEW', label: 'Under review' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'CORRECTION_REQUIRED', label: 'Needs correction' },
  { value: 'REJECTED', label: 'Rejected' },
]

type DisplayRow = {
  id: string
  reference: string
  applicant: string
  region: string
  status: ApplicationStatus
  received: string
}

export function ApplicationsView() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'ALL' | ApplicationStatus>('ALL')
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<DisplayRow[]>([])

  useEffect(() => {
    let mounted = true
    setLoading(true)

    listAdminApplications({
      status: status === 'ALL' ? undefined : status,
      search: query.trim() || undefined,
    })
      .then((res) => {
        if (!mounted) return
        const mapped: DisplayRow[] = res.data.map((app) => ({
          id: app.id,
          reference: app.applicationReference,
          applicant: app.fullName,
          region: `${app.county}, ${app.constituency}`,
          status: app.status as ApplicationStatus,
          received: new Date(app.submittedAt).toLocaleDateString(),
        }))
        setRows(mapped)
      })
      .catch(() => {
        if (!mounted) return
        // Fallback to local demo list
        const filtered = demoApplications
          .filter((a) => {
            const matchesStatus = status === 'ALL' || a.status === status
            const matchesQuery =
              query.trim() === '' ||
              `${a.id} ${a.applicant} ${a.region}`.toLowerCase().includes(query.toLowerCase())
            return matchesStatus && matchesQuery
          })
          .map((a) => ({
            id: a.id,
            reference: a.id,
            applicant: a.applicant,
            region: a.region,
            status: a.status,
            received: a.received,
          }))
        setRows(filtered)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [query, status])

  const columns: Column<DisplayRow>[] = [
    {
      key: 'reference',
      header: 'Reference',
      render: (r) => <span className="font-mono text-xs font-medium text-navy">{r.reference}</span>,
    },
    { key: 'applicant', header: 'Applicant', render: (r) => r.applicant },
    { key: 'region', header: 'Region', render: (r) => r.region },
    {
      key: 'status',
      header: 'Status',
      render: (r) => {
        const meta = applicationStatusMeta[r.status] || { label: r.status, tone: 'neutral' }
        return <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
      },
    },
    {
      key: 'received',
      header: 'Received',
      render: (r) => <span className="text-muted-foreground">{r.received}</span>,
    },
    {
      key: 'action',
      header: '',
      render: (r) => (
        <Link
          href={`/admin/applications/${r.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-adek-blue-600 hover:text-navy"
        >
          Review
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-72">
          <Search
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reference, applicant, region"
            aria-label="Search applications"
            className="h-10 w-full rounded-lg border border-input bg-card pr-3 pl-9 text-sm outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
          />
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatus(f.value)}
              aria-pressed={status === f.value}
              className={
                status === f.value
                  ? 'rounded-full border border-navy bg-navy px-3 py-1.5 text-xs font-semibold text-white'
                  : 'rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-navy/40 hover:text-navy'
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-border bg-card">
          <Loader2 className="size-6 animate-spin text-adek-blue" />
        </div>
      ) : rows.length > 0 ? (
        <DataTable columns={columns} rows={rows} getKey={(r) => r.id} caption="Membership applications" />
      ) : (
        <EmptyState
          title="No applications match your filters"
          description="Try a different status or clear your search."
        />
      )}
    </div>
  )
}
