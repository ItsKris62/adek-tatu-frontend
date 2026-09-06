import { notFound } from 'next/navigation'
import { AdminShell } from '@/components/admin/admin-shell'
import { ApplicationDetail } from '@/components/admin/application-detail'
import { demoApplications } from '@/content/admin'

export function generateStaticParams() {
  return demoApplications.map((a) => ({ id: a.id }))
}

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const application = demoApplications.find((a) => a.id === id)
  if (!application) notFound()

  return (
    <AdminShell
      title={`Application ${application.id}`}
      breadcrumbs={[
        { label: 'Admin', href: '/admin' },
        { label: 'Applications', href: '/admin/applications' },
        { label: application.id },
      ]}
    >
      <ApplicationDetail application={application} />
    </AdminShell>
  )
}
