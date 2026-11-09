import express, { type NextFunction, type Request, type Response } from "express";
import { pool } from "./database";
import fs from "fs";

interface ReportCreate {
  name?: string | null;
  image_url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  details: string;
}

interface Report extends ReportCreate {
  id: number;
  created_at: string;
}

interface ValidationErrorItem {
  loc: Array<string | number>;
  msg: string;
  type: string;
}

const databaseReady = pool.query(fs.readFileSync("create.reports.sql", "utf8"));

const app = express();
app.use(express.json());

app.get("/", (_request: Request, response: Response) => {
  response.json({ status: "ok", data: null, message: null });
});

app.get("/health", async (_request: Request, response: Response, next: NextFunction) => {
  try {
    await databaseReady;
    const result = await pool.query<{ now: Date }>("SELECT NOW() AS now");
    response.json({
      status: "ok",
      data: {
        datetime: new Date().toISOString(),
        now: result.rows[0].now.toString(),
      },
      message: null,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/reports", async (_request: Request, response: Response, next: NextFunction) => {
  try {
    await databaseReady;
    const result = await pool.query<Report>(`
      SELECT id, name, image_url, latitude, longitude, details, created_at
      FROM reports
      ORDER BY created_at DESC
    `);
    response.json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.post("/reports", async (request: Request, response: Response, next: NextFunction) => {
  const validationErrors = validateReport(request.body);
  if (validationErrors.length > 0) {
    response.status(422).json({ detail: validationErrors });
    return;
  }

  const report = request.body as ReportCreate;
  try {
    await databaseReady;
    const result = await pool.query<Report>(
      `
        INSERT INTO reports (name, image_url, latitude, longitude, details)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, image_url, latitude, longitude, details, created_at
      `,
      [
        report.name ?? null,
        report.image_url ?? null,
        report.latitude ?? null,
        report.longitude ?? null,
        report.details,
      ],
    );
    response.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.use(
  (error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    console.error(error);
    response.status(500).json({ detail: "Internal server error" });
  },
);



function validateReport(body: unknown): ValidationErrorItem[] {
  const errors: ValidationErrorItem[] = [];
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return [{ loc: ["body"], msg: "Input should be a valid object", type: "type_error.object" }];
  }

  const report = body as Record<string, unknown>;
  if (typeof report.details !== "string") {
    errors.push({
      loc: ["body", "details"],
      msg: "Field required",
      type: "missing",
    });
  }

  for (const field of ["name", "image_url"] as const) {
    if (report[field] !== undefined && report[field] !== null && typeof report[field] !== "string") {
      errors.push({
        loc: ["body", field],
        msg: "Input should be a valid string",
        type: "string_type",
      });
    }
  }

  for (const field of ["latitude", "longitude"] as const) {
    if (
      report[field] !== undefined &&
      report[field] !== null &&
      (typeof report[field] !== "number" || !Number.isFinite(report[field]))
    ) {
      errors.push({
        loc: ["body", field],
        msg: "Input should be a valid number",
        type: "float_type",
      });
    }
  }

  return errors;
}

export { app };
