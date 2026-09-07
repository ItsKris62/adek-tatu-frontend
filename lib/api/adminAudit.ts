import { fetchApi } from './apiClient'

export type AuditLogEntry = {
  id: string
  actorAdminId?: string | null
  action: string
  entityType: string
  entityId?: string | null
  metadata?: Record<string, unknown> | null
  ipAddress?: string | null
  createdAt: string
}

export type AuditLogListResponse = {
  data: AuditLogEntry[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export async function getAuditLogs(params?: {
  page?: number
  pageSize?: number
}): Promise<AuditLogListResponse> {
  const query = new URLSearchParams()
  if (params?.page) query.set('page', params.page.toString())
  if (params?.pageSize) query.set('pageSize', params.pageSize.toString())

  const queryString = query.toString() ? `?${query.toString()}` : ''
  return await fetchApi<AuditLogListResponse>(`/api/v1/admin/audit-logs${queryString}`)
}
