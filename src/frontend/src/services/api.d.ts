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
export declare function getReports(): Promise<Report[]>;
export declare function createReport(report: ReportInput): Promise<Report>;
//# sourceMappingURL=api.d.ts.map