'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Search,
  Download,
  Users2,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react'
import { StatCard } from '@/components/admin/stat-card'
import { StatusBadge } from '@/components/admin/status-badge'
import { DataTable, type Column } from '@/components/admin/data-table'
import { EmptyState } from '@/components/editorial/empty-state'
import {
  getMembershipSummaryReport,
  exportMembershipReportCsv,
  getApprovedMembersList,
  type MembershipSummaryData,
  type ApprovedMember,
} from '@/lib/api/adminReports'

export function MembersRegisterView() {
  // Summary & statistics state
  const [summary, setSummary] = useState<MembershipSummaryData | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(true)

  // Members register table state
  const [members, setMembers] = useState<ApprovedMember[]>([])
  const [tableLoading, setTableLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(25)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // Filters
  const [search, setSearch] = useState('')
  const [county, setCounty] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  // CSV Export state
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState('')

  // Load summary statistics
  const loadSummary = useCallback(async () => {
    setSummaryLoading(true)
    try {
      const data = await getMembershipSummaryReport({
        county: county || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      })
      setSummary(data)
    } catch {
      // Fallback default
      setSummary(null)
    } finally {
      setSummaryLoading(false)
    }
  }, [county, dateFrom, dateTo])

  // Load approved members list
  const loadMembers = useCallback(async () => {
    setTableLoading(true)
    try {
      const res = await getApprovedMembersList({
        page,
        pageSize,
        county: county || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        search: search.trim() || undefined,
      })
      setMembers(res.members)
      setTotalPages(res.pagination.totalPages)
      setTotalCount(res.pagination.total)
    } catch {
      setMembers([])
      setTotalPages(1)
      setTotalCount(0)
    } finally {
      setTableLoading(false)
    }
  }, [page, pageSize, county, dateFrom, dateTo, search])

  useEffect(() => {
    loadSummary()
  }, [loadSummary])

  useEffect(() => {
    loadMembers()
  }, [loadMembers])

  // CSV Export Handler
  async function handleExportCsv() {
    setExporting(true)
    setExportError('')
    try {
      const { blob, filename } = await exportMembershipReportCsv({
        status: 'APPROVED',
        county: county || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      })

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: any) {
      setExportError(err.message || 'Failed to export CSV report.')
    } finally {
      setExporting(false)
    }
  }

  const columns: Column<ApprovedMember>[] = [
    {
      key: 'applicationReference',
      header: 'Reference',
      render: (r) => (
        <span className="font-mono text-xs font-semibold text-navy">{r.applicationReference}</span>
      ),
    },
    {
      key: 'fullName',
      header: 'Member Name',
      render: (r) => (
        <div>
          <p className="font-semibold text-navy">{r.fullName}</p>
          <p className="text-xs text-muted-foreground">{r.email}</p>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone / ID',
      render: (r) => (
        <div>
          <p className="text-xs font-medium text-navy">{r.phone}</p>
          <p className="font-mono text-[11px] text-muted-foreground">ID: {r.idDocumentMasked}</p>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (r) => (
        <span className="text-xs text-muted-foreground">
          {r.constituency}, {r.county}
        </span>
      ),
    },
    {
      key: 'occupation',
      header: 'Occupation',
      render: (r) => <span className="text-xs text-muted-foreground">{r.occupation}</span>,
    },
    {
      key: 'approvedAt',
      header: 'Approved Date',
      render: (r) => (
        <span className="text-xs text-muted-foreground">
          {r.approvedAt ? new Date(r.approvedAt).toLocaleDateString() : '—'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: () => <StatusBadge tone="positive">Approved Member</StatusBadge>,
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          label="Total Intake"
          value={summaryLoading ? '—' : summary?.totalApplications ?? 0}
          icon={Users2}
        />
        <StatCard
          label="Approved Members"
          value={summaryLoading ? '—' : summary?.approved ?? 0}
          icon={CheckCircle2}
          hint="Party register (demo)"
        />
        <StatCard
          label="Submitted"
          value={summaryLoading ? '—' : summary?.submitted ?? 0}
          icon={Clock}
        />
        <StatCard
          label="Under Review"
          value={summaryLoading ? '—' : summary?.underReview ?? 0}
          icon={Clock}
        />
        <StatCard
          label="Needs Correction"
          value={summaryLoading ? '—' : summary?.correctionRequired ?? 0}
          icon={AlertCircle}
        />
        <StatCard
          label="Rejected"
          value={summaryLoading ? '—' : summary?.rejected ?? 0}
          icon={XCircle}
        />
      </div>

      {/* Filter and Action Controls */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-60 flex-1 sm:max-w-xs">
              <Search
                className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                placeholder="Search name, ref, phone..."
                aria-label="Search approved members"
                className="h-9 w-full rounded-lg border border-input bg-card pr-3 pl-9 text-xs outline-none focus-visible:border-adek-blue focus-visible:ring-2 focus-visible:ring-adek-blue/30"
              />
            </div>

            {/* County Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <select
                value={county}
                onChange={(e) => {
                  setCounty(e.target.value)
                  setPage(1)
                }}
                aria-label="Filter by county"
                className="h-9 rounded-lg border border-input bg-card px-2 text-xs font-medium text-navy outline-none focus-visible:border-adek-blue"
              >
                <option value="">All Counties</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Mombasa">Mombasa</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Kiambu">Kiambu</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Uasin Gishu">Uasin Gishu</option>
                <option value="Machakos">Machakos</option>
              </select>
            </div>

            {/* Date Filters */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>From:</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value)
                  setPage(1)
                }}
                aria-label="Date from"
                className="h-9 rounded-lg border border-input bg-card px-2 text-xs text-navy outline-none"
              />
              <span>To:</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value)
                  setPage(1)
                }}
                aria-label="Date to"
                className="h-9 rounded-lg border border-input bg-card px-2 text-xs text-navy outline-none"
              />
            </div>
          </div>

          {/* CSV Export Button */}
          <div className="flex items-center gap-2">
            {exportError ? (
              <span className="text-xs font-medium text-destructive">{exportError}</span>
            ) : null}
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={exporting}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-navy px-3.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-navy/90 disabled:opacity-50"
            >
              {exporting ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Download className="size-3.5" aria-hidden="true" />
              )}
              Export CSV Report
            </button>
          </div>
        </div>
      </div>

      {/* Approved Members Table */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-navy">
            Approved Member Register ({totalCount.toLocaleString()})
          </h2>
          <span className="text-xs text-muted-foreground">
            Demonstration view • Masked National IDs
          </span>
        </div>

        {tableLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-card">
            <Loader2 className="size-6 animate-spin text-adek-blue" />
          </div>
        ) : members.length > 0 ? (
          <div className="flex flex-col gap-3">
            <DataTable
              columns={columns}
              rows={members}
              getKey={(r) => r.id}
              caption="Approved ADEK member register records"
            />

            {/* Pagination Controls */}
            {totalPages > 1 ? (
              <div className="flex items-center justify-between border-t border-border px-2 pt-3 text-xs text-muted-foreground">
                <span>
                  Page {page} of {totalPages} ({totalCount} members)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="flex h-8 items-center gap-1 rounded border border-border bg-card px-2.5 hover:bg-offwhite disabled:opacity-40"
                  >
                    <ChevronLeft className="size-3.5" /> Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="flex h-8 items-center gap-1 rounded border border-border bg-card px-2.5 hover:bg-offwhite disabled:opacity-40"
                  >
                    Next <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <EmptyState
            title="No approved members found"
            description="No applications match the current filter criteria or have been approved yet."
          />
        )}
      </div>
    </div>
  )
}
