import { Plus } from 'lucide-react'
import { AdminShell } from '@/components/admin/admin-shell'
import { LeadershipPlaceholder } from '@/components/leadership/leadership-placeholder'
import { PendingNotice } from '@/components/editorial/pending-notice'
import { DemoAction } from '@/components/admin/demo-action'

export default function AdminLeadershipPage() {
  return (
    <AdminShell
      title="Leadership management"
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Leadership' }]}
      actions={<DemoAction label="Add member" icon={<Plus className="size-4" aria-hidden="true" />} />}
    >
      <div className="mb-6 max-w-2xl">
        <PendingNotice title="Official leadership information pending client approval">
          When leadership content is supplied, each slot below will hold a name,
          role, biography and portrait that can be edited and reordered.
        </PendingNotice>
      </div>
      <LeadershipPlaceholder count={4} />
    </AdminShell>
  )
}
