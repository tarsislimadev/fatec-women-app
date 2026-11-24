import { reportRepository } from "../repositories/reportRepository";
import type { ReportStatus } from "../types";

export const reportService = {
  listReports: async () => {
    return reportRepository.findAll();
  },

  createReport: async (
    name: string | null,
    imageUrl: string | null,
    latitude: number | null,
    longitude: number | null,
    details: string,
    isAnonymous: boolean
  ) => {
    const report = await reportRepository.create(
      null,
      name,
      imageUrl,
      latitude,
      longitude,
      details,
      isAnonymous
    );
    await reportRepository.addStatusHistory(report.id, report.status, null);
    return report;
  },

  updateStatus: async (reportId: number, status: ReportStatus) => {
    const existing = await reportRepository.findById(reportId);
    if (!existing) {
      throw { status: 404, message: "Report not found" };
    }
    await reportRepository.updateStatus(reportId, status);
    await reportRepository.addStatusHistory(reportId, status, null);
    return { id: reportId, status };
  },

  getHistory: async (reportId: number) => {
    const report = await reportRepository.findById(reportId);
    if (!report) {
      throw { status: 404, message: "Report not found" };
    }
    return reportRepository.findHistory(reportId);
  },
};