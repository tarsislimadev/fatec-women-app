import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import { Pool } from "pg";
import { app } from "./app";
import supertest from "supertest";

const request = supertest(app);

const testPool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "fatec",
  user: process.env.DB_USER || "fatec",
  password: process.env.DB_PASSWORD || "fatec",
});

async function truncateTables() {
  await testPool.query("TRUNCATE report_status_history, reports, users RESTART IDENTITY CASCADE");
}

beforeAll(async () => {
  await truncateTables();
});

beforeEach(async () => {
  await truncateTables();
});

afterAll(async () => {
  await testPool.end();
});

describe("Reports", () => {
  it("creates a report without authentication", async () => {
    const res = await request
      .post("/reports")
      .send({ details: "Registro de teste", name: "Ana" });
    expect(res.status).toBe(201);
    expect(res.body.data.details).toBe("Registro de teste");
    expect(res.body.data.status).toBe("pendente");
    expect(res.body.data.is_anonymous).toBe(false);
  });

  it("creates an anonymous report", async () => {
    const res = await request
      .post("/reports")
      .send({ details: "anon report", name: "Ana", is_anonymous: true });
    expect(res.status).toBe(201);
    expect(res.body.data.is_anonymous).toBe(true);
  });

  it("lists all reports", async () => {
    await request.post("/reports").send({ details: "report 1" });
    await request.post("/reports").send({ details: "report 2" });
    const res = await request.get("/reports");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it("hides user name when report is anonymous", async () => {
    await request.post("/reports").send({ details: "anon report", name: "Ana", is_anonymous: true });
    const res = await request.get("/reports");
    expect(res.body.data[0].user_name).toBeNull();
  });

  it("updates report status and records history", async () => {
    const createRes = await request.post("/reports").send({ details: "status report" });
    const reportId = createRes.body.data.id;

    const updRes = await request
      .patch(`/reports/${reportId}/status`)
      .send({ status: "resolvido" });
    expect(updRes.status).toBe(200);
    expect(updRes.body.data.status).toBe("resolvido");

    const histRes = await request.get(`/reports/${reportId}/history`);
    expect(histRes.status).toBe(200);
    expect(histRes.body.data.some((h: any) => h.status === "resolvido")).toBe(true);
  });

  it("returns 404 when updating status of missing report", async () => {
    const res = await request.patch(`/reports/9999/status`).send({ status: "resolvido" });
    expect(res.status).toBe(404);
  });

  it("returns 404 when fetching history of missing report", async () => {
    const res = await request.get(`/reports/9999/history`);
    expect(res.status).toBe(404);
  });
});

describe("Validation", () => {
  it("rejects report with missing details", async () => {
    const res = await request.post("/reports").send({ name: "No details" });
    expect(res.status).toBe(422);
  });

  it("rejects invalid status", async () => {
    const createRes = await request.post("/reports").send({ details: "status report" });
    const reportId = createRes.body.data.id;
    const res = await request.patch(`/reports/${reportId}/status`).send({ status: "invalido" });
    expect(res.status).toBe(422);
  });
});

describe("Health", () => {
  it("returns standardized health response", async () => {
    const res = await request.get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.data).toBeDefined();
    expect(res.body.message).toBeNull();
  });
});