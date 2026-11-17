const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api';
function getToken() {
    if (typeof localStorage === 'undefined')
        return null;
    return localStorage.getItem('token');
}
async function request(path, options) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', ...options?.headers };
    if (token)
        headers.Authorization = `Bearer ${token}`;
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
            const body = await response.json();
            if (body.message)
                message = body.message;
            else if (body.detail)
                message = String(body.detail);
        }
        catch {
            // Keep the HTTP status when the server does not return JSON.
        }
        throw new Error(message);
    }
    return response.json();
}
export function getReports() {
    return request('/reports');
}
export function createReport(report) {
    return request('/reports', {
        method: 'POST',
        body: JSON.stringify(report),
    });
}
export function updateReportStatus(reportId, status) {
    return request(`/reports/${reportId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });
}
export function getReportHistory(reportId) {
    return request(`/reports/${reportId}/history`);
}
export function register(data) {
    return request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
}
export function login(data) {
    return request('/auth/login', { method: 'POST', body: JSON.stringify(data) });
}
export function getCurrentUser() {
    return request('/auth/me');
}
export function getTokenFromStorage() {
    return getToken();
}
export function setAuth(token, user) {
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
export function getStoredUser() {
    if (typeof localStorage === 'undefined')
        return null;
    try {
        return JSON.parse(localStorage.getItem('user') ?? 'null');
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=api.js.map