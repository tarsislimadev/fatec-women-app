import { reportRepository } from "../repositories/reportRepository";
import type { ReportStatus } from "../types";

export const reportService = {
  listReports: async (userId: number, isAdmin: boolean) => {
    return reportRepository.findAll(userId, isAdmin);
  },

  createReport: async (
    userId: number,
    name: string | null,
    imageUrl: string | null,
    latitude: number | null,
    longitude: number | null,
    details: string,
    isAnonymous: boolean
  ) => {
    const report = await reportRepository.create(
      userId,
      name,
      imageUrl,
      latitude,
      longitude,
      details,
      isAnonymous
    );
    await reportRepository.addStatusHistory(report.id, report.status, userId);
    return report;
  },

  updateStatus: async (reportId: number, status: ReportStatus, changedBy: number) => {
    const existing = await reportRepository.findById(reportId);
    if (!existing) {
      throw { status: 404, message: "Report not found" };
    }
    await reportRepository.updateStatus(reportId, status);
    await reportRepository.addStatusHistory(reportId, status, changedBy);
    return { id: reportId, status };
  },

  getHistory: async (reportId: number, requesterId: number | undefined, requesterRole: string | undefined) => {
    const report = await reportRepository.checkAccess(reportId);
    if (!report) {
      throw { status: 404, message: "Report not found" };
    }

    const isOwner = requesterId !== undefined && requesterId === report.user_id;
    const isAdmin = requesterRole === "admin";
    if (!requesterId || (!isOwner && !isAdmin && report.is_anonymous)) {
      throw { status: 403, message: "Access denied" };
    }

    return reportRepository.findHistory(reportId);
  },
};
