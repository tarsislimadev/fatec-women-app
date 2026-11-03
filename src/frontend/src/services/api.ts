export interface Report {
  id: number;
  name: string | null;
  image_url: string | null;
  latitude: number | null;
  longitude: number | null;
  details: string;
  created_at: string;
}

export interface ReportInput {
  name?: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
  details: string;
}

const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json() as { detail?: string };
      if (body.detail) message = body.detail;
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
