import { type Request, type Response, type NextFunction } from "express";
import { reportService } from "../services/reportService";

export const reportController = {
  list: async (_request: Request, response: Response, next: NextFunction) => {
    try {
      const reports = await reportService.listReports();
      return response.status(200).json({ status: "ok", data: reports, message: null });
    } catch (error) {
      next(error);
    }
  },

  create: async (request: Request, response: Response, next: NextFunction) => {
    const validationErrors = (request as any).validationErrors;
    if (validationErrors && validationErrors.length > 0) {
      return response.status(422).json({ status: "error", data: null, message: "Validation failed", detail: validationErrors });
    }

    const { name, image_url, latitude, longitude, details, is_anonymous } = request.body;
    try {
      const report = await reportService.createReport(
        name ?? null,
        image_url ?? null,
        latitude ?? null,
        longitude ?? null,
        details,
        is_anonymous ?? false
      );
      return response.status(201).json({ status: "ok", data: report, message: null });
    } catch (error) {
      next(error);
    }
  },

  updateStatus: async (request: Request, response: Response, next: NextFunction) => {
    const reportId = Number(request.params.id);
    if (!Number.isFinite(reportId)) {
      return response.status(422).json({ status: "error", data: null, message: "Invalid report id" });
    }

    const validationErrors = (request as any).validationErrors;
    if (validationErrors && validationErrors.length > 0) {
      return response.status(422).json({ status: "error", data: null, message: "Validation failed", detail: validationErrors });
    }

    const { status } = request.body;
    try {
      const result = await reportService.updateStatus(reportId, status);
      return response.status(200).json({ status: "ok", data: result, message: null });
    } catch (error: any) {
      if (error.status) {
        return response.status(error.status).json({ status: "error", data: null, message: error.message });
      }
      next(error);
    }
  },

  getHistory: async (request: Request, response: Response, next: NextFunction) => {
    const reportId = Number(request.params.id);
    if (!Number.isFinite(reportId)) {
      return response.status(422).json({ status: "error", data: null, message: "Invalid report id" });
    }

    try {
      const history = await reportService.getHistory(reportId);
      return response.status(200).json({ status: "ok", data: history, message: null });
    } catch (error: any) {
      if (error.status) {
        return response.status(error.status).json({ status: "error", data: null, message: error.message });
      }
      next(error);
    }
  },
};