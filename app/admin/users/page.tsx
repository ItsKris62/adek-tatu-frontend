import { AdminShell } from '@/components/admin/admin-shell'
import { UsersView } from '@/components/admin/users-view'
import { roleLabels } from '@/content/admin'

export default function AdminUsersPage() {
  return (
    <AdminShell
      title="User management"
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Users' }]}
    >
      <div className="mb-6 rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-base font-bold text-navy">Roles</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Frontend supports three roles. Role-based navigation is demonstration
          architecture only and is not a substitute for server-side
          authorization.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(roleLabels).map((label) => (
            <span key={label} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-navy">
              {label}
            </span>
          ))}
        </div>
      </div>
      <UsersView />
    </AdminShell>
  )
}
