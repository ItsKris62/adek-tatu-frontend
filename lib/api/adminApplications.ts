import { fetchApi } from './apiClient'

export type AdminApplicationItem = {
  id: string
  applicationReference: string
  fullName: string
  email: string
  phone: string
  county: string
  constituency: string
  occupation: string
  idDocumentMasked: string
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'CORRECTION_REQUIRED' | 'APPROVED' | 'REJECTED' | 'WITHDRAWN'
  submittedAt: string
  reviewedAt?: string | null
  createdAt: string
}

export type ApplicationReviewRecord = {
  id: string
  action: string
  previousStatus: string
  newStatus: string
  note?: string | null
  createdAt: string
  reviewerEmail: string
}

export type AdminApplicationDetail = {
  application: AdminApplicationItem & {
    consentGiven: boolean
    consentTimestamp: string
    consentVersion: string
    reviewedBy?: string | null
    reviewerEmail?: string | null
  }
  reviews: ApplicationReviewRecord[]
}

export type ApplicationListResponse = {
  data: AdminApplicationItem[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export async function listAdminApplications(params?: {
  page?: number
  pageSize?: number
  status?: string
  search?: string
}): Promise<ApplicationListResponse> {
  const query = new URLSearchParams()
  if (params?.page) query.set('page', params.page.toString())
  if (params?.pageSize) query.set('pageSize', params.pageSize.toString())
  if (params?.status && params.status !== 'ALL') query.set('status', params.status)
  if (params?.search) query.set('search', params.search)

  const queryString = query.toString() ? `?${query.toString()}` : ''
  return await fetchApi<ApplicationListResponse>(`/api/v1/admin/applications${queryString}`)
}

export async function getAdminApplicationDetail(id: string): Promise<AdminApplicationDetail> {
  return await fetchApi<AdminApplicationDetail>(`/api/v1/admin/applications/${id}`)
}

export async function updateAdminApplicationStatus(
  id: string,
  status: string,
  note?: string
): Promise<{ id: string; status: string; reference: string }> {
  return await fetchApi<{ id: string; status: string; reference: string }>(
    `/api/v1/admin/applications/${id}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status, note }),
    }
  )
}

export async function addAdminApplicationReview(
  id: string,
  note: string
): Promise<ApplicationReviewRecord> {
  return await fetchApi<ApplicationReviewRecord>(`/api/v1/admin/applications/${id}/reviews`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  })
}
