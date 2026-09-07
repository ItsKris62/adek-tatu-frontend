const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:4000'

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    fields?: Record<string, string>
  }
  pagination?: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export class ApiError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly fields?: Record<string, string>

  constructor(message: string, code = 'API_ERROR', statusCode = 500, fields?: Record<string, string>) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.statusCode = statusCode
    this.fields = fields
  }
}

// In-memory runtime CSRF token storage (never written to localStorage or cookies)
let inMemoryCsrfToken: string | null = null

export function getCsrfToken(): string | null {
  return inMemoryCsrfToken
}

export function setCsrfToken(token: string | null): void {
  inMemoryCsrfToken = token
}

export function clearCsrfToken(): void {
  inMemoryCsrfToken = null
}

/**
 * Retrieves a fresh CSRF token from the server for the current active admin session.
 */
export async function refreshCsrfToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/auth/csrf`, {
      method: 'GET',
      credentials: 'include',
    })
    if (res.ok) {
      const data = await res.json()
      if (data?.data?.csrfToken) {
        setCsrfToken(data.data.csrfToken)
        return data.data.csrfToken
      }
    }
  } catch {
    // Session may not be authenticated yet
  }
  return null
}

const MUTATION_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  const method = (options.method || 'GET').toUpperCase()

  const headers = new Headers(options.headers || {})
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  // Attach CSRF token for authenticated admin mutation requests
  if (MUTATION_METHODS.has(method) && endpoint.includes('/admin/') && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/mfa/verify')) {
    if (!headers.has('X-CSRF-Token')) {
      if (!inMemoryCsrfToken) {
        await refreshCsrfToken()
      }
      if (inMemoryCsrfToken) {
        headers.set('X-CSRF-Token', inMemoryCsrfToken)
      }
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Include HttpOnly session cookies for admin requests
  })

  const json = (await response.json().catch(() => null)) as ApiResponse<T> | null

  if (!response.ok || (json && json.success === false)) {
    const errorMsg = json?.error?.message || `Request failed with status ${response.status}`
    const errorCode = json?.error?.code || 'REQUEST_FAILED'
    const errorFields = json?.error?.fields

    // If CSRF was invalid, clear in-memory token to trigger fresh retrieval on retry
    if (errorCode === 'CSRF_INVALID' || errorCode === 'CSRF_TOKEN_MISSING') {
      clearCsrfToken()
    }

    throw new ApiError(errorMsg, errorCode, response.status, errorFields)
  }

  return (json?.data !== undefined ? json.data : json) as T
}

/**
 * Downloads raw file/blob content (such as CSV export) with session credentials.
 */
export async function fetchBlob(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ blob: Blob; filename: string }> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  })

  if (!response.ok) {
    const json = await response.json().catch(() => null)
    const errorMsg = json?.error?.message || `Export failed with status ${response.status}`
    const errorCode = json?.error?.code || 'EXPORT_FAILED'
    throw new ApiError(errorMsg, errorCode, response.status)
  }

  const disposition = response.headers.get('Content-Disposition') || ''
  const filenameMatch = disposition.match(/filename="?([^";]+)"?/)
  const filename = filenameMatch ? filenameMatch[1] : 'export.csv'

  const blob = await response.blob()
  return { blob, filename }
}

export { API_BASE_URL }
