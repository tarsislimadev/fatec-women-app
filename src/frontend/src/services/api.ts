export interface Report {
  id: number;
  name: string | null;
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  details: string;
  user_id: number;
  status: string;
  is_anonymous: boolean;
  created_at: string;
  user_name?: string | null;
}

export interface ReportInput {
  name?: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
  details: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api';

function getToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('token');
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(options?.headers as Record<string, string> | undefined) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json() as { detail?: string; message?: string };
      if (body.message) message = body.message;
      else if (body.detail) message = String(body.detail);
    } catch {
      // Keep the HTTP status when the server does not return JSON.
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getReports(): Promise<Report[]> {
  return request<Report[]>('/reports');
}

export function createReport(report: ReportInput): Promise<Report> {
  return request<Report>('/reports', {
    method: 'POST',
    body: JSON.stringify(report),
  });
}

export function updateReportStatus(reportId: number, status: string): Promise<{ id: number; status: string }> {
  return request<{ id: number; status: string }>(`/reports/${reportId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function getReportHistory(reportId: number): Promise<Array<{ id: number; status: string; changed_by: number | null; changed_at: string; changed_by_name?: string | null }>> {
  return request(`/reports/${reportId}/history`);
}

export function register(data: { name: string; email: string; phone: string; password: string; role?: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/register', { method: 'POST', body: JSON.stringify(data) });
}

export function login(data: { email: string; password: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) });
}

export function getCurrentUser(): Promise<User> {
  return request<User>('/auth/me');
}

export function getTokenFromStorage(): string | null {
  return getToken();
}

export function setAuth(token: string, user: User) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export function clearAuth() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export function getStoredUser(): User | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem('user') ?? 'null') as User | null;
  } catch {
    return null;
  }
}
