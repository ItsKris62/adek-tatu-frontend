import { AdminShell } from '@/components/admin/admin-shell'
import { ApplicationDetail } from '@/components/admin/application-detail'

export const dynamic = 'force-dynamic'

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <AdminShell
      title="Application Review"
      breadcrumbs={[
        { label: 'Admin', href: '/admin' },
        { label: 'Applications', href: '/admin/applications' },
        { label: 'Review' },
      ]}
    >
      <ApplicationDetail id={id} />
    </AdminShell>
  )
}
