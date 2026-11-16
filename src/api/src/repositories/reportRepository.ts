import { pool } from "../database";
import type { Report, ReportStatus } from "../types";

export const reportRepository = {
  findAll: async (userId: number, isAdmin: boolean) => {
    const result = await pool.query<Report>(
      `SELECT r.id, r.user_id, r.name, r.image_url, r.latitude, r.longitude, r.details,
              r.status, r.is_anonymous, r.created_at,
              CASE WHEN r.is_anonymous THEN NULL ELSE u.name END AS user_name
       FROM reports r
       LEFT JOIN users u ON r.user_id = u.id
       ${isAdmin ? "" : "WHERE r.user_id = $1"}
       ORDER BY r.created_at DESC`,
      isAdmin ? [] : [userId]
    );
    return result.rows;
  },

  create: async (
    userId: number,
    name: string | null,
    imageUrl: string | null,
    latitude: number | null,
    longitude: number | null,
    details: string,
    isAnonymous: boolean
  ) => {
    const result = await pool.query<Report>(
      `INSERT INTO reports (user_id, name, image_url, latitude, longitude, details, is_anonymous)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, user_id, name, image_url, latitude, longitude, details, status, is_anonymous, created_at`,
      [userId, name, imageUrl, latitude, longitude, details, isAnonymous]
    );
    return result.rows[0];
  },

  addStatusHistory: async (reportId: number, status: string, changedBy: number) => {
    await pool.query(
      "INSERT INTO report_status_history (report_id, status, changed_by) VALUES ($1, $2, $3)",
      [reportId, status, changedBy]
    );
  },

  findById: async (reportId: number) => {
    const result = await pool.query<Report>("SELECT id FROM reports WHERE id = $1", [reportId]);
    return result.rows[0];
  },

  updateStatus: async (reportId: number, status: ReportStatus) => {
    await pool.query("UPDATE reports SET status = $1 WHERE id = $2", [status, reportId]);
  },

  checkAccess: async (reportId: number) => {
    const result = await pool.query<{ user_id: number; is_anonymous: boolean; role: string }>(
      `SELECT r.user_id, r.is_anonymous, u.role FROM reports r JOIN users u ON r.user_id = u.id WHERE r.id = $1`,
      [reportId]
    );
    return result.rows[0];
  },

  findHistory: async (reportId: number) => {
    const result = await pool.query(
      `SELECT h.id, h.status, h.changed_by, h.changed_at, u.name AS changed_by_name
       FROM report_status_history h
       LEFT JOIN users u ON h.changed_by = u.id
       WHERE h.report_id = $1
       ORDER BY h.changed_at ASC`,
      [reportId]
    );
    return result.rows;
  },
};
