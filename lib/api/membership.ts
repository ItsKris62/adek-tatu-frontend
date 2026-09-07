import { fetchApi } from './apiClient'

export type MembershipFormData = {
  fullName: string
  email: string
  phone: string
  county: string
  constituency: string
  idNumber: string
  occupation: string
  consent: boolean
  consentVersion?: string
  consentText?: string
  turnstileToken?: string
  website?: string
}

export type MembershipSubmissionResponse = {
  reference: string
  status: string
  submittedAt: string
}

export type ApplicationStatusResponse = {
  reference: string
  status: string
  submittedAt: string
  updatedAt: string
}

export async function submitMembershipApplication(
  data: MembershipFormData
): Promise<MembershipSubmissionResponse> {
  return await fetchApi<MembershipSubmissionResponse>('/api/v1/membership/applications', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getApplicationStatus(
  reference: string
): Promise<ApplicationStatusResponse> {
  return await fetchApi<ApplicationStatusResponse>(
    `/api/v1/membership/applications/${encodeURIComponent(reference)}/status`
  )
}
