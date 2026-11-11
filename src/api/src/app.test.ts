import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import fs from "fs";
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

async function execSqlFile(path: string) {
  const sql = fs.readFileSync(path, "utf8");
  await testPool.query(sql);
}

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

async function registerUser(overrides: Partial<{ name: string; email: string; phone: string; password: string; role: string; is_anonymous: boolean }> = {}) {
  const payload = {
    name: overrides.name ?? "Test User",
    email: overrides.email ?? `user_${Date.now()}@example.com`,
    phone: overrides.phone ?? `11${Math.floor(Math.random() * 9000000000)}`,
    password: overrides.password ?? "senha123",
    role: overrides.role ?? "user",
    ...(overrides.is_anonymous !== undefined ? { is_anonymous: overrides.is_anonymous } : {}),
  };
  const res = await request.post("/auth/register").send(payload);
  expect(res.status).toBe(201);
  return { ...payload, token: res.body.data.token, user: res.body.data.user };
}

async function loginUser(email: string, password: string) {
  const res = await request.post("/auth/login").send({ email, password });
  expect(res.status).toBe(200);
  return res.body.data.token;
}

describe("Auth (US08, US09)", () => {
  it("registers a new user and issues a JWT", async () => {
    const { token, user } = await registerUser({ email: "reg@example.com" });
    expect(token).toBeDefined();
    expect(user.email).toBe("reg@example.com");
    expect(user.role).toBe("user");
  });

  it("rejects duplicate email", async () => {
    await registerUser({ email: "dup@example.com" });
    const res = await request.post("/auth/register").send({
      name: "Dup", email: "dup@example.com", phone: "11999999999", password: "senha123",
    });
    expect(res.status).toBe(409);
  });

  it("logs in with correct credentials", async () => {
    await registerUser({ email: "login@example.com", password: "senha123" });
    const token = await loginUser("login@example.com", "senha123");
    expect(token).toBeDefined();
  });

  it("rejects wrong password", async () => {
    await registerUser({ email: "wrong@example.com", password: "senha123" });
    const res = await request.post("/auth/login").send({ email: "wrong@example.com", password: "errada" });
    expect(res.status).toBe(401);
  });

  it("returns current user with token", async () => {
    const { token } = await registerUser({ email: "me@example.com" });
    const res = await request.get("/auth/me").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe("me@example.com");
  });

  it("rejects /auth/me without token", async () => {
    const res = await request.get("/auth/me");
    expect(res.status).toBe(401);
  });
});

describe("Reports (US11, US15, US16, US17)", () => {
  it("creates a report linked to the authenticated user", async () => {
    const { token } = await registerUser();
    const res = await request
      .post("/reports")
      .set("Authorization", `Bearer ${token}`)
      .send({ details: "Registro de teste", name: "Ana" });
    expect(res.status).toBe(201);
    expect(res.body.data.details).toBe("Registro de teste");
    expect(res.body.data.status).toBe("pendente");
    expect(res.body.data.is_anonymous).toBe(false);
  });

  it("rejects report creation without auth", async () => {
    const res = await request.post("/reports").send({ details: "x" });
    expect(res.status).toBe(401);
  });

  it("lists only own reports for regular user", async () => {
    const { token: t1 } = await registerUser({ email: "u1@example.com" });
    const { token: t2 } = await registerUser({ email: "u2@example.com" });
    await request.post("/reports").set("Authorization", `Bearer ${t1}`).send({ details: "report u1" });
    await request.post("/reports").set("Authorization", `Bearer ${t2}`).send({ details: "report u2" });
    const res = await request.get("/reports").set("Authorization", `Bearer ${t1}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].details).toBe("report u1");
  });

  it("lists all reports for admin", async () => {
    const { token: adminToken } = await registerUser({ email: "admin@example.com", role: "admin" });
    const { token: uToken } = await registerUser({ email: "u@example.com" });
    await request.post("/reports").set("Authorization", `Bearer ${uToken}`).send({ details: "report u" });
    const res = await request.get("/reports").set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it("hides user name when report is anonymous", async () => {
    const { token } = await registerUser({ email: "anon@example.com", is_anonymous: true });
    await request
      .post("/reports")
      .set("Authorization", `Bearer ${token}`)
      .send({ details: "anon report", name: "Ana" });
    const res = await request.get("/reports").set("Authorization", `Bearer ${token}`);
    expect(res.body.data[0].user_name).toBeNull();
  });

  it("updates report status (admin only) and records history", async () => {
    const { token: adminToken } = await registerUser({ email: "admin2@example.com", role: "admin" });
    const { token: uToken, user } = await registerUser({ email: "u3@example.com" });
    const createRes = await request
      .post("/reports")
      .set("Authorization", `Bearer ${uToken}`)
      .send({ details: "status report" });
    const reportId = createRes.body.data.id;

    const updRes = await request
      .patch(`/reports/${reportId}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "resolvido" });
    expect(updRes.status).toBe(200);
    expect(updRes.body.data.status).toBe("resolvido");

    const histRes = await request
      .get(`/reports/${reportId}/history`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(histRes.status).toBe(200);
    expect(histRes.body.data.some((h: any) => h.status === "resolvido")).toBe(true);
  });

  it("rejects status update by non-admin", async () => {
    const { token } = await registerUser();
    const createRes = await request
      .post("/reports")
      .set("Authorization", `Bearer ${token}`)
      .send({ details: "status report" });
    const reportId = createRes.body.data.id;
    const res = await request
      .patch(`/reports/${reportId}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "resolvido" });
    expect(res.status).toBe(403);
  });

  it("rejects invalid status", async () => {
    const { token } = await registerUser({ role: "admin" });
    const createRes = await request
      .post("/reports")
      .set("Authorization", `Bearer ${token}`)
      .send({ details: "status report" });
    const reportId = createRes.body.data.id;
    const res = await request
      .patch(`/reports/${reportId}/status`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "invalido" });
    expect(res.status).toBe(422);
  });

  it("denies access to anonymous report history for non-owner", async () => {
    const { token: ownerToken } = await registerUser({ email: "owner@example.com", is_anonymous: true });
    const { token: otherToken } = await registerUser({ email: "other@example.com" });
    const createRes = await request
      .post("/reports")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ details: "anon", name: "Owner" });
    const reportId = createRes.body.data.id;
    const res = await request
      .get(`/reports/${reportId}/history`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(res.status).toBe(403);
  });
});

describe("Validation (US12)", () => {
  it("rejects report with missing details", async () => {
    const { token } = await registerUser();
    const res = await request
      .post("/reports")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "No details" });
    expect(res.status).toBe(422);
  });

  it("rejects login with missing fields", async () => {
    const res = await request.post("/auth/login").send({ email: "x@example.com" });
    expect(res.status).toBe(422);
  });
});

describe("Health (US13)", () => {
  it("returns standardized health response", async () => {
    const res = await request.get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.data).toBeDefined();
    expect(res.body.message).toBeNull();
  });
});
