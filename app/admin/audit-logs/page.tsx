import { AdminShell } from '@/components/admin/admin-shell'
import { DataTable, type Column } from '@/components/admin/data-table'
import { StatusBadge } from '@/components/admin/status-badge'
import { demoAuditLog, roleLabels, type DemoAuditEntry } from '@/content/admin'

const roleTone = {
  SUPER_ADMIN: 'info',
  CONTENT_EDITOR: 'neutral',
  RECRUITMENT_OFFICER: 'positive',
} as const

const columns: Column<DemoAuditEntry>[] = [
  { key: 'id', header: 'Log ID', render: (e) => <span className="font-mono text-xs text-navy">{e.id}</span> },
  { key: 'actor', header: 'Actor', render: (e) => e.actor },
  { key: 'role', header: 'Role', render: (e) => <StatusBadge tone={roleTone[e.role]}>{roleLabels[e.role]}</StatusBadge> },
  { key: 'action', header: 'Action', render: (e) => e.action },
  { key: 'target', header: 'Target', render: (e) => <span className="font-mono text-xs text-muted-foreground">{e.target}</span> },
  { key: 'when', header: 'When', render: (e) => <span className="text-muted-foreground">{e.when}</span> },
]

export default function AdminAuditLogsPage() {
  return (
    <AdminShell
      title="Audit logs"
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Audit Logs' }]}
    >
      <DataTable columns={columns} rows={demoAuditLog} getKey={(e) => e.id} caption="Audit log (demo)" />
      <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
        In production this table would record who performed each action and when,
        providing a complete audit trail. Entries shown here are synthetic.
      </p>
    </AdminShell>
  )
}
