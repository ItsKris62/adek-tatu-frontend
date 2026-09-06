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
  type DemoApplication,
} from '@/content/admin'

const recentColumns: Column<DemoApplication>[] = [
  { key: 'id', header: 'Reference', render: (r) => <span className="font-mono text-xs text-navy">{r.id}</span> },
  { key: 'applicant', header: 'Applicant', render: (r) => r.applicant },
  { key: 'region', header: 'Region', render: (r) => r.region },
  {
    key: 'status',
    header: 'Status',
    render: (r) => {
      const meta = applicationStatusMeta[r.status]
      return <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
    },
  },
]

export default function AdminDashboardPage() {
  const pending = demoApplications.filter((a) => a.status === 'PENDING_REVIEW').length
  const approved = demoApplications.filter((a) => a.status === 'APPROVED').length

  return (
    <AdminShell title="Dashboard" breadcrumbs={[{ label: 'Admin' }, { label: 'Dashboard' }]}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value={demoApplications.length} hint="Demo total" icon={Inbox} />
        <StatCard label="Pending review" value={pending} hint="Awaiting action" icon={Clock} />
        <StatCard label="Approved" value={approved} hint="Demo total" icon={CheckCircle2} />
        <StatCard label="Admin users" value={demoUsers.length} hint="Across 3 roles" icon={Users2} />
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
          <DataTable columns={recentColumns} rows={demoApplications.slice(0, 5)} getKey={(r) => r.id} caption="Recent applications (demo)" />
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
            {demoAuditLog.slice(0, 5).map((entry) => (
              <li key={entry.id} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-foreground/90">
                  <span className="font-medium text-navy">{entry.actor}</span> — {entry.action.toLowerCase()}{' '}
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
