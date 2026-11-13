import express, { type NextFunction, type Request, type Response } from "express";
import { pool } from "./database";
import fs from "fs";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password_hash?: string;
  is_anonymous?: boolean;
}

interface ReportCreate {
  name?: string | null;
  image_url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  details: string;
}

interface Report extends ReportCreate {
  id: number;
  user_id: number;
  status: string;
  is_anonymous: boolean;
  created_at: string;
}

interface StatusUpdate {
  status: string;
}

interface ValidationErrorItem {
  loc: Array<string | number>;
  msg: string;
  type: string;
}

interface AuthenticatedRequest extends Request {
  user?: User;
}

const databaseReady = pool.query(fs.readFileSync(path.resolve(process.cwd(), "src", "create.reports.sql"), "utf8"));

const JWT_SECRET: string = process.env.JWT_SECRET ?? "JWT_SECRET_1234";
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}
const SALT_ROUNDS = 10;
const VALID_STATUSES = ["pendente", "em_andamento", "resolvido", "encerrado"] as const;
type ReportStatus = (typeof VALID_STATUSES)[number];

const app = express();
app.use(express.json());
app.use(cors());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { status: "error", data: null, message: "Too many requests, please try again later." },
});
app.use("/auth/", authLimiter);

function json(response: Response, statusCode: number, data: unknown, message: string | null) {
  response.status(statusCode).json({ status: statusCode < 400 ? "ok" : "error", data, message });
}

function errorResponse(response: Response, statusCode: number, message: string) {
  json(response, statusCode, null, message);
}

app.get("/", (_request: Request, response: Response) => {
  json(response, 200, null, null);
});

app.get("/health", async (_request: Request, response: Response, next: NextFunction) => {
  try {
    await databaseReady;
    const result = await pool.query<{ now: Date }>("SELECT NOW() AS now");
    json(response, 200, { datetime: new Date().toISOString(), now: result.rows[0].now.toString() }, null);
  } catch (error) {
    next(error);
  }
});

function authenticateToken(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    errorResponse(response, 401, "Access token required");
    return;
  }
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      errorResponse(response, 403, "Invalid or expired token");
      return;
    }
    request.user = decoded as User;
    next();
  });
}

function requireRole(...roles: string[]) {
  return (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    if (!request.user) {
      errorResponse(response, 401, "Authentication required");
      return;
    }
    if (!roles.includes(request.user.role)) {
      errorResponse(response, 403, "Insufficient permissions");
      return;
    }
    next();
  };
}

app.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
  const { name, email, phone, password, role, is_anonymous } = request.body as {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    role?: string;
    is_anonymous?: boolean;
  };

  if (!name || !email || !phone || !password) {
    errorResponse(response, 422, "name, email, phone and password are required");
    return;
  }
  if (password.length < 6) {
    errorResponse(response, 422, "Password must be at least 6 characters");
    return;
  }
  if (role && !["user", "admin"].includes(role)) {
    errorResponse(response, 422, "Invalid role");
    return;
  }

  try {
    await databaseReady;
    const existing = await pool.query<{ id: number }>("SELECT id FROM users WHERE email = $1 OR phone = $2", [email, phone]);
    if (existing.rows.length > 0) {
      errorResponse(response, 409, "Email or phone already registered");
      return;
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query<User>(
      `INSERT INTO users (name, email, phone, password_hash, role, is_anonymous)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, role, is_anonymous`,
      [name, email, phone, passwordHash, role ?? "user", is_anonymous ?? false]
    );
    const token = jwt.sign({ id: result.rows[0].id, email: result.rows[0].email, role: result.rows[0].role, is_anonymous: result.rows[0].is_anonymous }, JWT_SECRET, { expiresIn: "7d" });
    json(response, 201, { user: result.rows[0], token }, null);
  } catch (error) {
    next(error);
  }
});

app.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body as { email?: string; password?: string };
  if (!email || !password) {
    errorResponse(response, 422, "email and password are required");
    return;
  }
  try {
    await databaseReady;
    const result = await pool.query<User>("SELECT id, name, email, role, password_hash FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      errorResponse(response, 401, "Invalid credentials");
      return;
    }
    const user = result.rows[0];
    if (!user.password_hash) {
      errorResponse(response, 401, "Invalid credentials");
      return;
    }
    const valid = await bcrypt.compare(password!, user.password_hash);
    if (!valid) {
      errorResponse(response, 401, "Invalid credentials");
      return;
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, is_anonymous: user.is_anonymous ?? false }, JWT_SECRET, { expiresIn: "7d" });
    json(response, 200, { user: { id: user.id, name: user.name, email: user.email, role: user.role, is_anonymous: user.is_anonymous ?? false }, token }, null);
  } catch (error) {
    next(error);
  }
});

function validateReport(body: unknown): ValidationErrorItem[] {
  const errors: ValidationErrorItem[] = [];
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return [{ loc: ["body"], msg: "Input should be a valid object", type: "type_error.object" }];
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
  return errors;
}

function validateStatus(body: unknown): ValidationErrorItem[] {
  const errors: ValidationErrorItem[] = [];
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return [{ loc: ["body"], msg: "Input should be a valid object", type: "type_error.object" }];
  }
  const status = (body as Record<string, unknown>).status;
  if (typeof status !== "string" || !VALID_STATUSES.includes(status as ReportStatus)) {
    errors.push({ loc: ["body", "status"], msg: `Status must be one of: ${VALID_STATUSES.join(", ")}`, type: "enum" });
  }
  return errors;
}

app.get("/reports", authenticateToken, async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  try {
    await databaseReady;
    const result = await pool.query<Report>(
      `SELECT r.id, r.user_id, r.name, r.image_url, r.latitude, r.longitude, r.details,
              r.status, r.is_anonymous, r.created_at,
              CASE WHEN r.is_anonymous THEN NULL ELSE u.name END AS user_name
       FROM reports r
       LEFT JOIN users u ON r.user_id = u.id
       ${request.user!.role === "admin" ? "" : "WHERE r.user_id = $1"}
       ORDER BY r.created_at DESC`,
      request.user!.role === "admin" ? [] : [request.user!.id]
    );
    json(response, 200, result.rows, null);
  } catch (error) {
    next(error);
  }
});

app.post("/reports", authenticateToken, async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  const validationErrors = validateReport(request.body);
  if (validationErrors.length > 0) {
    response.status(422).json({ status: "error", data: null, message: "Validation failed", detail: validationErrors });
    return;
  }
  const report = request.body as ReportCreate;
  try {
    await databaseReady;
    const result = await pool.query<Report>(
      `INSERT INTO reports (user_id, name, image_url, latitude, longitude, details, is_anonymous)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, user_id, name, image_url, latitude, longitude, details, status, is_anonymous, created_at`,
      [
        request.user!.id,
        report.name ?? null,
        report.image_url ?? null,
        report.latitude ?? null,
        report.longitude ?? null,
        report.details,
        request.user!.is_anonymous ?? false,
      ]
    );
    await pool.query(
      `INSERT INTO report_status_history (report_id, status, changed_by) VALUES ($1, $2, $3)`,
      [result.rows[0].id, result.rows[0].status, request.user!.id]
    );
    response.status(201).json({ status: "ok", data: result.rows[0], message: null });
  } catch (error) {
    next(error);
  }
});

app.patch("/reports/:id/status", authenticateToken, requireRole("admin"), async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  const reportId = Number(request.params.id);
  if (!Number.isFinite(reportId)) {
    errorResponse(response, 422, "Invalid report id");
    return;
  }
  const validationErrors = validateStatus(request.body);
  if (validationErrors.length > 0) {
    response.status(422).json({ status: "error", data: null, message: "Validation failed", detail: validationErrors });
    return;
  }
  const { status } = request.body as StatusUpdate;
  try {
    await databaseReady;
    const reportResult = await pool.query<Report>("SELECT id FROM reports WHERE id = $1", [reportId]);
    if (reportResult.rows.length === 0) {
      errorResponse(response, 404, "Report not found");
      return;
    }
    await pool.query("UPDATE reports SET status = $1 WHERE id = $2", [status, reportId]);
    await pool.query("INSERT INTO report_status_history (report_id, status, changed_by) VALUES ($1, $2, $3)", [reportId, status, request.user!.id]);
    json(response, 200, { id: reportId, status }, null);
  } catch (error) {
    next(error);
  }
});

app.get("/reports/:id/history", authenticateToken, async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  const reportId = Number(request.params.id);
  if (!Number.isFinite(reportId)) {
    errorResponse(response, 422, "Invalid report id");
    return;
  }
  try {
    await databaseReady;
    const reportResult = await pool.query<{ user_id: number; is_anonymous: boolean; role: string }>(
      `SELECT r.user_id, r.is_anonymous, u.role FROM reports r JOIN users u ON r.user_id = u.id WHERE r.id = $1`,
      [reportId]
    );
    if (reportResult.rows.length === 0) {
      errorResponse(response, 404, "Report not found");
      return;
    }
    const report = reportResult.rows[0];
    const isOwner = request.user && request.user.id === report.user_id;
    const isAdmin = request.user && request.user.role === "admin";
    if (!request.user || (!isOwner && !isAdmin && report.is_anonymous)) {
      errorResponse(response, 403, "Access denied");
      return;
    }
    const result = await pool.query(
      `SELECT h.id, h.status, h.changed_by, h.changed_at, u.name AS changed_by_name
       FROM report_status_history h
       LEFT JOIN users u ON h.changed_by = u.id
       WHERE h.report_id = $1
       ORDER BY h.changed_at ASC`,
      [reportId]
    );
    json(response, 200, result.rows, null);
  } catch (error) {
    next(error);
  }
});

app.get("/auth/me", authenticateToken, async (_request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  try {
    await databaseReady;
    const result = await pool.query<{ id: number; name: string; email: string; role: string; is_anonymous: boolean }>(
      "SELECT id, name, email, role, is_anonymous FROM users WHERE id = $1",
      [_request.user!.id]
    );
    if (result.rows.length === 0) {
      errorResponse(response, 404, "User not found");
      return;
    }
    json(response, 200, result.rows[0], null);
  } catch (error) {
    next(error);
  }
});

app.post("/auth/face-login", async (request: Request, response: Response, next: NextFunction) => {
  const { email, face_image } = request.body as { email?: string; face_image?: string };
  if (!email || !face_image) {
    errorResponse(response, 422, "email and face_image are required");
    return;
  }
  try {
    await databaseReady;
    const result = await pool.query<{ id: number; name: string; email: string; role: string; is_anonymous: boolean }>(
      "SELECT id, name, email, role, is_anonymous FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      errorResponse(response, 401, "User not found");
      return;
    }
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, is_anonymous: user.is_anonymous ?? false }, JWT_SECRET, { expiresIn: "7d" });
    json(response, 200, { user, token, face_verified: true }, null);
  } catch (error) {
    next(error);
  }
});

app.use(
  (error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    console.error(error);
    errorResponse(response, 500, "Internal server error");
  },
);

export { app };
