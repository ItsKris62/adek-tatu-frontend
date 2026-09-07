import type { ContentStatus } from './content-status'

export type OfficialDocument = {
  title: string
  type: string
  status: ContentStatus
  href?: string
  fileUrl?: string
  downloadName?: string
  summary: string
}

/**
 * Official ADEK Documents.
 * Downloadable PDF files are located in /documents/
 */
export const officialDocuments: OfficialDocument[] = [
  {
    title: 'Party Constitution & Rules',
    type: 'Governing Document',
    status: 'APPROVED',
    href: '/constitution-rules',
    fileUrl: '/documents/ADEK%20TATU%20PARTY%20CONSTITUTION.pdf',
    downloadName: 'ADEK TATU PARTY CONSTITUTION.pdf',
    summary:
      'The official constitution and internal governing rules of ADEK TATU combined in one governing document.',
  },
  {
    title: 'Party Manifesto',
    type: 'Policy Framework',
    status: 'APPROVED',
    href: '/manifesto',
    fileUrl: '/documents/Party%20Manifesto%20ADEK%20TATU.pdf',
    downloadName: 'Party Manifesto ADEK TATU.pdf',
    summary:
      'The official party manifesto organising ADEK TATU policy priorities for Kenya.',
  },
  {
    title: 'ADEK TATU Core Values',
    type: 'Core Principles',
    status: 'APPROVED',
    href: '/tatu-values',
    fileUrl: '/documents/ADEK%20TATU%20CORE%20VALUE.pdf',
    downloadName: 'ADEK TATU CORE VALUE.pdf',
    summary:
      'The official core values document outlining Teamwork, Accountability, Transparency and Unity (TATU).',
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
