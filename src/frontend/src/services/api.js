const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api';
async function request(path, options) {
    const response = await fetch(`${apiBaseUrl}${path}`, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options?.headers },
    });
    if (!response.ok) {
        let message = `Request failed (${response.status})`;
        try {
            const body = await response.json();
            if (body.detail)
                message = body.detail;
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
//# sourceMappingURL=api.js.map