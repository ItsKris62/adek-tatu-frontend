import { AdminShell } from '@/components/admin/admin-shell'
import { ContentStatusBadge } from '@/components/editorial/content-status-badge'
import { DemoAction } from '@/components/admin/demo-action'
import type { ContentStatus } from '@/content/content-status'

const managedSections: { area: string; description: string; status: ContentStatus }[] = [
  { area: 'Homepage hero', description: 'Party name, slogan and supporting summary.', status: 'APPROVED' },
  { area: 'Ideology', description: 'Inclusive Social Democracy long-form content.', status: 'APPROVED' },
  { area: 'Vision statement', description: 'Official vision quotation.', status: 'APPROVED' },
  { area: 'TATU values', description: 'Teamwork, Accountability, Transparency, Unity.', status: 'APPROVED' },
  { area: 'Manifesto pillars', description: 'Ten-pillar draft policy framework.', status: 'DRAFT' },
  { area: 'Mission statement', description: 'Official mission wording.', status: 'PENDING_CLIENT_INPUT' },
  { area: 'Privacy notice', description: 'Legal privacy & data-protection wording.', status: 'PENDING_CLIENT_INPUT' },
  { area: 'Complaints procedure', description: 'Complaints & dispute-resolution wording.', status: 'PENDING_CLIENT_INPUT' },
]

export default function AdminContentPage() {
  return (
    <AdminShell
      title="Site content"
      breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Site Content' }]}
    >
      <ul className="flex flex-col gap-3">
        {managedSections.map((section) => (
          <li
            key={section.area}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-base font-bold text-navy">{section.area}</h2>
                <ContentStatusBadge status={section.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
            </div>
            <div className="shrink-0">
              <DemoAction label="Edit" variant="outline" message="Editing is disabled in the frontend prototype." />
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  )
}
