import { AdminShell } from '@/components/admin/admin-shell'
import { StatusBadge } from '@/components/admin/status-badge'
import { approvedMembers } from '@/content/admin'

export default function MembersPage() {
  return <AdminShell title="Approved Members" breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Approved Members' }]}>
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-muted-foreground">Verified registrations with active ADEK membership status.</p><p className="mt-1 text-xs text-muted-foreground">Demo records are clearly labelled and contain no real identities.</p></div><div className="rounded-lg border border-gold/30 bg-gold-soft px-3 py-2 text-sm font-semibold text-navy">{approvedMembers.length} active members</div></div>
    <div className="overflow-hidden rounded-xl border border-border bg-card"><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="border-b border-border bg-offwhite text-xs uppercase tracking-[0.12em] text-muted-foreground"><tr><th className="px-5 py-3 font-semibold">Member</th><th className="px-5 py-3 font-semibold">Location</th><th className="px-5 py-3 font-semibold">Joined</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead><tbody className="divide-y divide-border">{approvedMembers.map((member) => <tr key={member.id} className="hover:bg-offwhite/70"><td className="px-5 py-4"><p className="font-semibold text-navy">{member.name}</p><p className="mt-0.5 text-xs text-muted-foreground">{member.id}</p></td><td className="px-5 py-4 text-muted-foreground">{member.constituency}, {member.county}</td><td className="px-5 py-4 text-muted-foreground">{member.joined}</td><td className="px-5 py-4"><StatusBadge tone="positive">Active</StatusBadge></td></tr>)}</tbody></table></div></div>
  </AdminShell>
}
