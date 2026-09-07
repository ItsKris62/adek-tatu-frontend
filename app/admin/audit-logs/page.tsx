'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '@/components/admin/admin-shell'
import { DataTable, type Column } from '@/components/admin/data-table'
import { StatusBadge } from '@/components/admin/status-badge'
import { demoAuditLog, type DemoAuditEntry } from '@/content/admin'
import { getAuditLogs, type AuditLogEntry } from '@/lib/api/adminAudit'
import { Loader2 } from 'lucide-react'

type DisplayAuditRow = {
  id: string
  actor: string
  role: string
  action: string
  target: string
  when: string
}

const columns: Column<DisplayAuditRow>[] = [
  { key: 'id', header: 'Log ID', render: (e) => <span className="font-mono text-xs text-navy">{e.id}</span> },
  { key: 'actor', header: 'Actor', render: (e) => e.actor },
  { key: 'role', header: 'Role', render: (e) => <StatusBadge tone="info">{e.role}</StatusBadge> },
  { key: 'action', header: 'Action', render: (e) => e.action },
  { key: 'target', header: 'Target', render: (e) => <span className="font-mono text-xs text-muted-foreground">{e.target}</span> },
  { key: 'when', header: 'When', render: (e) => <span className="text-muted-foreground">{e.when}</span> },
]

export default function AdminAuditLogsPage() {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<DisplayAuditRow[]>([])

  useEffect(() => {
    let mounted = true
    setLoading(true)

    getAuditLogs({ pageSize: 50 })
      .then((res) => {
        if (!mounted) return
        setRows(
          res.data.map((log) => ({
            id: log.id.slice(0, 8).toUpperCase(),
            actor: log.actorAdminId ? 'Admin' : 'System / Applicant',
            role: 'SUPER_ADMIN',
            action: log.action.replace(/_/g, ' '),
            target: log.entityId || log.entityType,
            when: new Date(log.createdAt).toLocaleString(),
          }))
        )
      })
      .catch(() => {
        if (!mounted) return
        setRows(
          demoAuditLog.map((e) => ({
            id: e.id,
            actor: e.actor,
            role: e.role,
            action: e.action,
            target: e.target,
            when: e.when,
          }))
        )
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <AdminShell
      title="Audit logs"
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Audit Logs' }]}
    >
      {loading ? (
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-border bg-card">
          <Loader2 className="size-6 animate-spin text-adek-blue" />
        </div>
      ) : (
        <DataTable columns={columns} rows={rows} getKey={(e) => e.id} caption="Audit log" />
      )}
      <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
        Immutable record of operational and security actions providing a complete audit trail.
      </p>
    </AdminShell>
  )
}
