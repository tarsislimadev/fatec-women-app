import type { Request } from "express";
import { VALID_STATUSES } from "../config/env";

export type ReportStatus = (typeof VALID_STATUSES)[number];

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password_hash?: string;
  is_anonymous?: boolean;
}

export interface ReportCreate {
  name?: string | null;
  image_url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  details: string;
}

export interface Report extends ReportCreate {
  id: number;
  user_id: number;
  status: string;
  is_anonymous: boolean;
  created_at: string;
}

export interface StatusUpdate {
  status: string;
}

export interface ValidationErrorItem {
  loc: Array<string | number>;
  msg: string;
  type: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}
