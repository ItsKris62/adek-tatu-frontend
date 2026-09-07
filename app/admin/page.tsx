'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Inbox, Clock, CheckCircle2, Users2, ArrowUpRight } from 'lucide-react'
import { AdminShell } from '@/components/admin/admin-shell'
import { StatCard } from '@/components/admin/stat-card'
import { DataTable, type Column } from '@/components/admin/data-table'
import { StatusBadge } from '@/components/admin/status-badge'
import {
  demoApplications,
  demoUsers,
  demoAuditLog,
  applicationStatusMeta,
  type ApplicationStatus,
} from '@/content/admin'
import { getDashboardStats, type DashboardStats } from '@/lib/api/adminDashboard'
import { listAdminApplications, type AdminApplicationItem } from '@/lib/api/adminApplications'
import { getAuditLogs, type AuditLogEntry } from '@/lib/api/adminAudit'

type DisplayApplication = {
  id: string
  reference: string
  applicant: string
  region: string
  status: ApplicationStatus
}

type DisplayAudit = {
  id: string
  actor: string
  action: string
  target: string
  when: string
}

const recentColumns: Column<DisplayApplication>[] = [
  { key: 'reference', header: 'Reference', render: (r) => <span className="font-mono text-xs text-navy">{r.reference}</span> },
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
]

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: demoApplications.length,
    submitted: demoApplications.filter((a) => a.status === 'SUBMITTED').length,
    underReview: demoApplications.filter((a) => a.status === 'UNDER_REVIEW').length,
    correctionRequired: demoApplications.filter((a) => a.status === 'CORRECTION_REQUIRED').length,
    approved: demoApplications.filter((a) => a.status === 'APPROVED').length,
    rejected: demoApplications.filter((a) => a.status === 'REJECTED').length,
    today: 0,
    thisMonth: demoApplications.length,
    activeAdmins: demoUsers.length,
  })

  const [recentApps, setRecentApps] = useState<DisplayApplication[]>(
    demoApplications.slice(0, 5).map((a) => ({
      id: a.id,
      reference: a.id,
      applicant: a.applicant,
      region: a.region,
      status: a.status as ApplicationStatus,
    }))
  )

  const [recentLogs, setRecentLogs] = useState<DisplayAudit[]>(
    demoAuditLog.slice(0, 5).map((l) => ({
      id: l.id,
      actor: l.actor,
      action: l.action,
      target: l.target,
      when: l.when,
    }))
  )

  useEffect(() => {
    let mounted = true

    getDashboardStats()
      .then((data) => {
        if (mounted) setStats(data)
      })
      .catch(() => {})

    listAdminApplications({ pageSize: 5 })
      .then((res) => {
        if (!mounted) return
        setRecentApps(
          res.data.map((app) => ({
            id: app.id,
            reference: app.applicationReference,
            applicant: app.fullName,
            region: `${app.county}, ${app.constituency}`,
            status: app.status as ApplicationStatus,
          }))
        )
      })
      .catch(() => {})

    getAuditLogs({ pageSize: 5 })
      .then((res) => {
        if (!mounted) return
        setRecentLogs(
          res.data.map((log) => ({
            id: log.id,
            actor: 'Admin',
            action: log.action.replace(/_/g, ' ').toLowerCase(),
            target: log.entityId || log.entityType,
            when: new Date(log.createdAt).toLocaleString(),
          }))
        )
      })
      .catch(() => {})

    return () => {
      mounted = false
    }
  }, [])

  return (
    <AdminShell title="Dashboard" breadcrumbs={[{ label: 'Admin' }, { label: 'Dashboard' }]}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value={stats.totalApplications} hint="Active total" icon={Inbox} />
        <StatCard label="Pending review" value={stats.submitted + stats.underReview} hint="Awaiting action" icon={Clock} />
        <StatCard label="Approved" value={stats.approved} hint="Approved members" icon={CheckCircle2} />
        <StatCard label="Admin users" value={stats.activeAdmins} hint="Active accounts" icon={Users2} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy">Recent applications</h2>
            <Link href="/admin/applications" className="inline-flex items-center gap-1 text-sm font-medium text-adek-blue-600 hover:text-navy">
              View all
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <DataTable columns={recentColumns} rows={recentApps} getKey={(r) => r.id} caption="Recent applications" />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-navy">Recent activity</h2>
            <Link href="/admin/audit-logs" className="inline-flex items-center gap-1 text-sm font-medium text-adek-blue-600 hover:text-navy">
              Audit logs
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="flex flex-col gap-2.5">
            {recentLogs.map((entry) => (
              <li key={entry.id} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-foreground/90">
                  <span className="font-medium text-navy">{entry.actor}</span> — {entry.action}{' '}
                  <span className="font-mono text-xs text-muted-foreground">{entry.target}</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{entry.when}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  )
}
