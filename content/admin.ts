/**
 * DEMO / SYNTHETIC DATA & MODELS.
 * Provides fallback data and administrative types for ADEK admin UI.
 */

export type AdminRole = 'SUPER_ADMIN' | 'CONTENT_EDITOR' | 'RECRUITMENT_OFFICER'

export const roleLabels: Record<AdminRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  CONTENT_EDITOR: 'Content Editor',
  RECRUITMENT_OFFICER: 'Recruitment Officer',
}

export type ApplicationStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'CORRECTION_REQUIRED'
  | 'APPROVED'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'PENDING_REVIEW'
  | 'NEEDS_CORRECTION'
  | 'DUPLICATE'

export type DemoApplication = {
  id: string
  applicant: string
  region: string
  channel: string
  status: ApplicationStatus
  received: string
}

export type ApprovedMember = {
  id: string
  name: string
  county: string
  constituency: string
  joined: string
  status: 'ACTIVE' | 'PENDING_VERIFICATION'
}

export const approvedMembers: ApprovedMember[] = [
  { id: 'MEM-DEMO-001', name: 'Member DEMO-001', county: 'Nairobi', constituency: 'Westlands', joined: 'Day 4', status: 'ACTIVE' },
  { id: 'MEM-DEMO-002', name: 'Member DEMO-002', county: 'Mombasa', constituency: 'Nyali', joined: 'Day 5', status: 'ACTIVE' },
]

export const demoApplications: DemoApplication[] = [
  { id: 'DEMO-001', applicant: 'Applicant DEMO-001', region: 'Region A', channel: 'Website', status: 'SUBMITTED', received: 'Day 1' },
  { id: 'DEMO-002', applicant: 'Applicant DEMO-002', region: 'Region B', channel: 'Website', status: 'APPROVED', received: 'Day 1' },
  { id: 'DEMO-003', applicant: 'Applicant DEMO-003', region: 'Region C', channel: 'Branch', status: 'CORRECTION_REQUIRED', received: 'Day 2' },
  { id: 'DEMO-004', applicant: 'Applicant DEMO-004', region: 'Region A', channel: 'Website', status: 'UNDER_REVIEW', received: 'Day 2' },
  { id: 'DEMO-005', applicant: 'Applicant DEMO-005', region: 'Region D', channel: 'Website', status: 'SUBMITTED', received: 'Day 3' },
  { id: 'DEMO-006', applicant: 'Applicant DEMO-006', region: 'Region B', channel: 'Branch', status: 'REJECTED', received: 'Day 3' },
  { id: 'DEMO-007', applicant: 'Applicant DEMO-007', region: 'Region C', channel: 'Website', status: 'APPROVED', received: 'Day 4' },
]

export type DemoUser = {
  id: string
  label: string
  role: AdminRole
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED'
}

export const demoUsers: DemoUser[] = [
  { id: 'USR-DEMO-01', label: 'Administrator DEMO-01', role: 'SUPER_ADMIN', status: 'ACTIVE' },
  { id: 'USR-DEMO-02', label: 'Editor DEMO-02', role: 'CONTENT_EDITOR', status: 'ACTIVE' },
  { id: 'USR-DEMO-03', label: 'Officer DEMO-03', role: 'RECRUITMENT_OFFICER', status: 'ACTIVE' },
]

export type DemoAuditEntry = {
  id: string
  actor: string
  role: AdminRole
  action: string
  target: string
  when: string
}

export const demoAuditLog: DemoAuditEntry[] = [
  { id: 'LOG-DEMO-001', actor: 'Administrator DEMO-01', role: 'SUPER_ADMIN', action: 'Reviewed application', target: 'DEMO-002', when: 'Day 1' },
  { id: 'LOG-DEMO-002', actor: 'Officer DEMO-03', role: 'RECRUITMENT_OFFICER', action: 'Requested correction', target: 'DEMO-003', when: 'Day 2' },
  { id: 'LOG-DEMO-003', actor: 'Editor DEMO-02', role: 'CONTENT_EDITOR', action: 'Updated site content', target: 'Homepage hero', when: 'Day 2' },
]

export const applicationStatusMeta: Record<
  ApplicationStatus,
  { label: string; tone: 'neutral' | 'positive' | 'warning' | 'negative' | 'info' }
> = {
  SUBMITTED: { label: 'Submitted', tone: 'info' },
  UNDER_REVIEW: { label: 'Under review', tone: 'info' },
  APPROVED: { label: 'Approved', tone: 'positive' },
  CORRECTION_REQUIRED: { label: 'Needs correction', tone: 'warning' },
  REJECTED: { label: 'Rejected', tone: 'negative' },
  WITHDRAWN: { label: 'Withdrawn', tone: 'neutral' },
  PENDING_REVIEW: { label: 'Pending review', tone: 'info' },
  NEEDS_CORRECTION: { label: 'Needs correction', tone: 'warning' },
  DUPLICATE: { label: 'Duplicate', tone: 'neutral' },
}
