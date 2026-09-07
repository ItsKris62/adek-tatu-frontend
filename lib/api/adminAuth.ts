import { fetchApi } from './apiClient'

export type AdminUserSession = {
  id: string
  email: string
  role: 'SUPER_ADMIN' | 'CONTENT_EDITOR' | 'RECRUITMENT_OFFICER'
  mfaEnabled?: boolean
  lastLoginAt?: string | null
}

export type LoginResponse =
  | { mfaRequired: false; user: AdminUserSession }
  | { mfaRequired: true; preAuthToken: string }

export async function loginAdmin(data: { email: string; password: string }): Promise<LoginResponse> {
  return await fetchApi<LoginResponse>('/api/v1/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function verifyMfa(data: {
  preAuthToken: string
  totpCode: string
}): Promise<{ user: AdminUserSession }> {
  return await fetchApi<{ user: AdminUserSession }>('/api/v1/admin/auth/mfa/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getMe(): Promise<AdminUserSession> {
  return await fetchApi<AdminUserSession>('/api/v1/admin/auth/me', {
    method: 'GET',
  })
}

export async function logoutAdmin(): Promise<void> {
  await fetchApi('/api/v1/admin/auth/logout', {
    method: 'POST',
  })
}
