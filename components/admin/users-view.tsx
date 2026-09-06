'use client'

import { useState } from 'react'
import { DataTable, type Column } from '@/components/admin/data-table'
import { StatusBadge } from '@/components/admin/status-badge'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { CtaButton } from '@/components/editorial/cta'
import { demoUsers, roleLabels, type DemoUser } from '@/content/admin'

const statusTone = {
  ACTIVE: 'positive',
  INVITED: 'info',
  SUSPENDED: 'negative',
} as const

export function UsersView() {
  const [pending, setPending] = useState<{ user: DemoUser; action: 'suspend' | 'activate' } | null>(null)
  const [note, setNote] = useState<string | null>(null)

  const columns: Column<DemoUser>[] = [
    { key: 'id', header: 'ID', render: (u) => <span className="font-mono text-xs text-navy">{u.id}</span> },
    { key: 'label', header: 'User', render: (u) => u.label },
    { key: 'role', header: 'Role', render: (u) => roleLabels[u.role] },
    {
      key: 'status',
      header: 'Status',
      render: (u) => (
        <StatusBadge tone={statusTone[u.status]}>{u.status.toLowerCase()}</StatusBadge>
      ),
    },
    {
      key: 'action',
      header: '',
      render: (u) =>
        u.status === 'SUSPENDED' ? (
          <button
            type="button"
            onClick={() => setPending({ user: u, action: 'activate' })}
            className="text-sm font-medium text-adek-blue-600 hover:text-navy"
          >
            Activate
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPending({ user: u, action: 'suspend' })}
            className="text-sm font-medium text-destructive hover:opacity-80"
          >
            Suspend
          </button>
        ),
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {demoUsers.length} demo users across three roles.
        </p>
        <CtaButton
          variant="primary"
          onClick={() => setNote('Inviting users is disabled in this frontend prototype.')}
        >
          Invite user
        </CtaButton>
      </div>

      {note ? (
        <p role="status" aria-live="polite" className="rounded-lg border border-gold/40 bg-gold/10 p-3 text-sm text-[#7a5a00]">
          {note}
        </p>
      ) : null}

      <DataTable columns={columns} rows={demoUsers} getKey={(u) => u.id} caption="Admin users (demo)" />

      <ConfirmDialog
        open={pending !== null}
        title={pending?.action === 'suspend' ? 'Suspend user?' : 'Activate user?'}
        tone={pending?.action === 'suspend' ? 'danger' : 'primary'}
        confirmLabel={pending?.action === 'suspend' ? 'Suspend' : 'Activate'}
        description={
          <>
            This is a demonstration action for <strong className="text-navy">{pending?.user.label}</strong>.
            No real user account is changed.
          </>
        }
        onCancel={() => setPending(null)}
        onConfirm={() => {
          setNote(
            `Demo: ${pending?.action === 'suspend' ? 'suspended' : 'activated'} ${pending?.user.label}. No backend action was performed.`,
          )
          setPending(null)
        }}
      />
    </div>
  )
}
