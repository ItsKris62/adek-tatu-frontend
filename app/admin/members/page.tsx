import { AdminShell } from '@/components/admin/admin-shell'
import { MembersRegisterView } from '@/components/admin/members-register-view'

export default function MembersPage() {
  return (
    <AdminShell
      title="Approved Members & Recruitment Reports"
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Approved Members' }]}
    >
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Verified ADEK membership applications acting as the demonstration member register and recruitment summary.
        </p>
      </div>

      <MembersRegisterView />
    </AdminShell>
  )
}
