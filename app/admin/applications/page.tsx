import { AdminShell } from '@/components/admin/admin-shell'
import { ApplicationsView } from '@/components/admin/applications-view'

export default function AdminApplicationsPage() {
  return (
    <AdminShell
      title="Applications"
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Applications' }]}
    >
      <ApplicationsView />
    </AdminShell>
  )
}
