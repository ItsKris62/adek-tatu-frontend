import { Plus, Newspaper } from 'lucide-react'
import { AdminShell } from '@/components/admin/admin-shell'
import { EmptyState } from '@/components/editorial/empty-state'
import { DemoAction } from '@/components/admin/demo-action'

export default function AdminNewsPage() {
  return (
    <AdminShell
      title="News management"
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'News' }]}
      actions={<DemoAction label="New article" icon={<Plus className="size-4" aria-hidden="true" />} />}
    >
      <EmptyState
        icon={Newspaper}
        title="No articles yet"
        description="Once official news content is supplied, articles created here will appear in a manageable list with status, publication date and author."
      />
    </AdminShell>
  )
}
