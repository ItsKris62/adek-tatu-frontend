import { Upload } from 'lucide-react'
import { AdminShell } from '@/components/admin/admin-shell'
import { DataTable, type Column } from '@/components/admin/data-table'
import { ContentStatusBadge } from '@/components/editorial/content-status-badge'
import { DemoAction } from '@/components/admin/demo-action'
import { officialDocuments, type OfficialDocument } from '@/content/documents'

const columns: Column<OfficialDocument>[] = [
  { key: 'title', header: 'Document', render: (d) => <span className="font-medium text-navy">{d.title}</span> },
  { key: 'type', header: 'Type', render: (d) => <span className="text-muted-foreground">{d.type}</span> },
  { key: 'status', header: 'Status', render: (d) => <ContentStatusBadge status={d.status} /> },
  {
    key: 'action',
    header: '',
    render: () => <span className="text-sm text-muted-foreground">Upload disabled</span>,
  },
]

export default function AdminDocumentsPage() {
  return (
    <AdminShell
      title="Documents management"
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Documents' }]}
      actions={<DemoAction label="Upload document" icon={<Upload className="size-4" aria-hidden="true" />} message="Uploading is disabled in the frontend prototype." />}
    >
      <DataTable columns={columns} rows={officialDocuments} getKey={(d) => d.title} caption="Official documents" />
      <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
        When official files are supplied, each document will show version
        history and availability controls here. No files, sizes or dates are
        fabricated.
      </p>
    </AdminShell>
  )
}
