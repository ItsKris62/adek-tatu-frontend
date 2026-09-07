import { fetchApi } from './apiClient'

export type DashboardStats = {
  totalApplications: number
  submitted: number
  underReview: number
  correctionRequired: number
  approved: number
  rejected: number
  today: number
  thisMonth: number
  activeAdmins: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return await fetchApi<DashboardStats>('/api/v1/admin/dashboard/stats')
}
