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

export type MembershipVerificationRequest = {
  fullName: string
  phone: string
  idNumber: string
  website?: string
}

export type MembershipVerificationResponse =
  | {
      isMember: true
      member: {
        fullName: string
        membershipNumber: string
        dateJoined: string
        status: 'APPROVED'
      }
    }
  | {
      isMember: false
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

export async function verifyMembershipStatus(
  data: MembershipVerificationRequest
): Promise<MembershipVerificationResponse> {
  return await fetchApi<MembershipVerificationResponse>('/api/v1/membership/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
