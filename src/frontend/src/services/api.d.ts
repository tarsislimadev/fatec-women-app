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
export declare function getReports(): Promise<Report[]>;
export declare function createReport(report: ReportInput): Promise<Report>;
export declare function updateReportStatus(reportId: number, status: string): Promise<{
    id: number;
    status: string;
}>;
export declare function getReportHistory(reportId: number): Promise<Array<{
    id: number;
    status: string;
    changed_by: number | null;
    changed_at: string;
    changed_by_name?: string | null;
}>>;
export declare function register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
}): Promise<AuthResponse>;
export declare function login(data: {
    email: string;
    password: string;
}): Promise<AuthResponse>;
export declare function getCurrentUser(): Promise<User>;
export declare function getTokenFromStorage(): string | null;
export declare function setAuth(token: string, user: User): void;
export declare function clearAuth(): void;
export declare function getStoredUser(): User | null;
//# sourceMappingURL=api.d.ts.map