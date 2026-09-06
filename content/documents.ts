import type { ContentStatus } from './content-status'

export type OfficialDocument = {
  title: string
  type: string
  status: ContentStatus
  href?: string
  summary: string
}

/**
 * Do NOT fabricate file sizes, upload dates, revision numbers or PDF URLs.
 * Availability is derived from status only.
 */
export const officialDocuments: OfficialDocument[] = [
  {
    title: 'Party Constitution',
    type: 'Governing Document',
    status: 'PENDING_CLIENT_INPUT',
    summary:
      'The official constitution of ADEK. Will be published once supplied and approved.',
  },
  {
    title: 'Party Rules',
    type: 'Governing Document',
    status: 'PENDING_CLIENT_INPUT',
    summary:
      'Internal party rules and procedures. Will be published once supplied and approved.',
  },
  {
    title: 'Draft Manifesto',
    type: 'Policy Framework',
    status: 'DRAFT',
    href: '/manifesto',
    summary:
      'The draft policy framework organised into ten pillars. Pending final approval.',
  },
  {
    title: 'Membership Form',
    type: 'Membership',
    status: 'PENDING_CLIENT_INPUT',
    summary:
      'The official membership application form. Fields will be added once the approved form is supplied.',
  },
]

export function isDocumentAvailable(doc: OfficialDocument) {
  return doc.status === 'APPROVED' || doc.status === 'DRAFT'
}
