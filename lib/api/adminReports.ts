import { fetchApi, fetchBlob } from './apiClient'

export type MembershipSummaryData = {
  totalApplications: number
  submitted: number
  underReview: number
  correctionRequired: number
  approved: number
  rejected: number
  withdrawn: number
  breakdown?: Array<{
    county?: string
    status?: string
    total?: number
    count?: number
    approved?: number
    submitted?: number
    underReview?: number
    correctionRequired?: number
    rejected?: number
  }>
}

export type ApprovedMember = {
  id: string
  applicationReference: string
  fullName: string
  email: string
  phone: string
  county: string
  constituency: string
  occupation: string
  idDocumentMasked: string
  approvedAt: string | null
  submittedAt: string
}

export type ApprovedMembersResponse = {
  members: ApprovedMember[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export async function getMembershipSummaryReport(params?: {
  dateFrom?: string
  dateTo?: string
  county?: string
  constituency?: string
  groupBy?: 'county' | 'status'
}): Promise<MembershipSummaryData> {
  const query = new URLSearchParams()
  if (params?.dateFrom) query.set('dateFrom', params.dateFrom)
  if (params?.dateTo) query.set('dateTo', params.dateTo)
  if (params?.county) query.set('county', params.county)
  if (params?.constituency) query.set('constituency', params.constituency)
  if (params?.groupBy) query.set('groupBy', params.groupBy)

  const qs = query.toString()
  return await fetchApi<MembershipSummaryData>(
    `/api/v1/admin/reports/membership/summary${qs ? `?${qs}` : ''}`
  )
}

export async function exportMembershipReportCsv(params?: {
  status?: string
  county?: string
  constituency?: string
  dateFrom?: string
  dateTo?: string
}): Promise<{ blob: Blob; filename: string }> {
  const query = new URLSearchParams()
  query.set('format', 'csv')
  if (params?.status) query.set('status', params.status)
  if (params?.county) query.set('county', params.county)
  if (params?.constituency) query.set('constituency', params.constituency)
  if (params?.dateFrom) query.set('dateFrom', params.dateFrom)
  if (params?.dateTo) query.set('dateTo', params.dateTo)

  const qs = query.toString()
  return await fetchBlob(`/api/v1/admin/reports/membership/export?${qs}`)
}

export async function getApprovedMembersList(params?: {
  page?: number
  pageSize?: number
  county?: string
  constituency?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}): Promise<ApprovedMembersResponse> {
  const query = new URLSearchParams()
  if (params?.page) query.set('page', String(params.page))
  if (params?.pageSize) query.set('pageSize', String(params.pageSize))
  if (params?.county) query.set('county', params.county)
  if (params?.constituency) query.set('constituency', params.constituency)
  if (params?.dateFrom) query.set('dateFrom', params.dateFrom)
  if (params?.dateTo) query.set('dateTo', params.dateTo)
  if (params?.search) query.set('search', params.search)

  const qs = query.toString()
  return await fetchApi<ApprovedMembersResponse>(
    `/api/v1/admin/members${qs ? `?${qs}` : ''}`
  )
}

export async function getApprovedMemberDetail(id: string): Promise<ApprovedMember> {
  return await fetchApi<ApprovedMember>(`/api/v1/admin/members/${encodeURIComponent(id)}`)
}
