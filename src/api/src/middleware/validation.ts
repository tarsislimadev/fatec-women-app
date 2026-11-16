import { type NextFunction, type Request, type Response } from "express";
import { VALID_STATUSES } from "../config/env";
import type { ValidationErrorItem } from "../types";

type ReportStatus = (typeof VALID_STATUSES)[number];

export const validateReport = (request: Request, response: Response, next: NextFunction): void => {
  const body = request.body;
  const errors: ValidationErrorItem[] = [];

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    response.status(422).json({ status: "error", data: null, message: "Validation failed", detail: [{ loc: ["body"], msg: "Input should be a valid object", type: "type_error.object" }] });
    return;
  }

  const report = body as Record<string, unknown>;
  if (typeof report.details !== "string" || report.details.trim().length === 0) {
    errors.push({ loc: ["body", "details"], msg: "Field required", type: "missing" });
  }
  for (const field of ["name", "image_url"] as const) {
    if (report[field] !== undefined && report[field] !== null && typeof report[field] !== "string") {
      errors.push({ loc: ["body", field], msg: "Input should be a valid string", type: "string_type" });
    }
  }
  for (const field of ["latitude", "longitude"] as const) {
    if (report[field] !== undefined && report[field] !== null && (typeof report[field] !== "number" || !Number.isFinite(report[field]))) {
      errors.push({ loc: ["body", field], msg: "Input should be a valid number", type: "float_type" });
    }
  }

  if (errors.length > 0) {
    response.status(422).json({ status: "error", data: null, message: "Validation failed", detail: errors });
    return;
  }
  next();
};

export const validateStatus = (request: Request, response: Response, next: NextFunction): void => {
  const body = request.body;
  const errors: ValidationErrorItem[] = [];

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    response.status(422).json({ status: "error", data: null, message: "Validation failed", detail: [{ loc: ["body"], msg: "Input should be a valid object", type: "type_error.object" }] });
    return;
  }

  const status = (body as Record<string, unknown>).status;
  if (typeof status !== "string" || !VALID_STATUSES.includes(status as ReportStatus)) {
    errors.push({ loc: ["body", "status"], msg: `Status must be one of: ${VALID_STATUSES.join(", ")}`, type: "enum" });
  }

  if (errors.length > 0) {
    response.status(422).json({ status: "error", data: null, message: "Validation failed", detail: errors });
    return;
  }
  next();
};
