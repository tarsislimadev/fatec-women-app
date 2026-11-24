---
name: "deploy-api-vercel"
description: "Deploy the Fatec Women API (src/api) to Vercel. Use when deploying, re-deploying, or verifying the Express/TypeScript API on Vercel."
---

# Deploy API on Vercel

## When To Use

- Deploying the API (`src/api`) to Vercel.
- Re-deploying after changes to the Express/TypeScript backend.
- Verifying API deployment settings, database wiring, or the `/health` endpoint.

## Project Details (planned 2026-11-24 — project not yet created)

| Setting | Value |
| --- | --- |
| Vercel team | `tmvdl's projects` — slug `tmvdls-projects`, id `team_UBBe5Zr1x1YLaBhJmBFuPpDF` |
| Project | `fatec-women-api` — **does not exist yet** (`vercel_get_project` → 404; `https://fatec-women-api.vercel.app/health` → 404) |
| Git repo | `tarsislimadev/fatec-women-app`, production branch `main` |
| Root Directory | `src/api` |
| Framework preset | Other (no framework — plain Node/Express) |
| Build command | `npm run build` (`tsc`) |
| Output directory | (none — serverless function, not a static build) |
| Install command | `npm ci` |
| Node version | 26.x (Vercel default) |
| Env vars | `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET` — set as `encrypted` on `production` + `preview` |
| Production URL | `https://fatec-women-api.vercel.app` (planned; currently 404) |

## Prerequisites

- The Supabase database must be provisioned first (see `.kilo/skills/deploy-database-supabase/SKILL.md`); the API needs reachable `DB_*` credentials.
- `src/api` must **not** be listed in the repo-root `.vercelignore` (currently it is not — see `.kilo/skills/README.md`).
- **A serverless entry point must exist** (see gotcha below). Without it, the first deploy will build but every request will hang/timeout.

## Gotchas

- **`src/api/src/index.ts` calls `app.listen(...)` and is not serverless-compatible.** On Vercel a serverless function must export a request handler; a long-lived listening server will not receive requests. The deploy needs an entry file that re-exports the Express `app` as a serverless handler. Vercel's Node runtime supports exporting the app directly:

  ```ts
  // src/api/api/index.ts  (or src/api/index.ts at the function root)
  import { app } from "../src/app";
  export default app;
  ```

  Concretely, either:
  - add `src/api/api/index.ts` (Vercel auto-detects `/api/*` as serverless functions and ignores the build output), **or**
  - add `src/api/vercel.json` with `rewrites`/`builds` pointing at a handler file, **or**
  - set the project's Build to a no-op and use `@vercel/node` (framework `null`) with the handler in `api/`.

  `app.listen` in `src/index.ts` is for local/Docker only. Keep it for local dev; add a separate serverless handler for Vercel. Do not assume the Dockerfile/`npm start` path runs on Vercel — it does not.
- **`pg.Pool` + serverless = connection exhaustion.** `src/api/src/database.ts` creates a module-scoped `Pool` and calls `pool.connect()` at import time. Across many warm/cold serverless invocations this leaks connections. Prefer a cached pool (`globalThis` reuse) or a serverless-friendly driver (e.g. `pg` with a small `max`, or Supabase's pooler). For Supabase specifically, use the connection pooler host/port, not the direct `db.<ref>.supabase.co` host.
- **SSL is commented out in `src/api/src/config/env.ts:21`.** Supabase requires SSL. Uncomment the `ssl: { rejectUnauthorized: false }` branch (or set it conditionally when `DB_HOST` is not localhost) or the connection will fail on Vercel.
- **`JWT_SECRET` has a weak default** (`"JWT_SECRET_1234"`, `env.ts:3`). Set a real secret in Vercel env vars; never rely on the default in production.
- **`app.ts` import-time side effect.** `src/app.ts` imports `./database` and constructs the `Pool` on module load. Keep this idempotent for serverless (no top-level `await connect()` that can throw on cold start).
- **`.vercel/` / `dist/` local artifacts.** `src/api/dist/` and `node_modules/` exist locally; do not deploy from them. Always build from source on Vercel.

## Option 1 — Via MCP (recommended)

1. Discover (read-only): `vercel_get_git_deployment_context`, `vercel_list_projects` (with `slug: "tmvdls-projects"`).
2. Create + link **without deploying** so env vars land first:
   - `vercel_create_git_project` — `repo: "tarsislimadev/fatec-women-app"`, `teamId: "team_UBBe5Zr1x1YLaBhJmBFuPpDF"`, `projectName: "fatec-women-api"`, `rootDirectory: "src/api"`, `deploy: false`.
3. Set the database/secret env vars (one call each, or batch):
   - `vercel_create_project_env` — `key: "DB_HOST"`, `value: "db.ztbjdhjigsugvrfgbkfg.supabase.co"` (or the Supabase pooler host), `type: "encrypted"`, `target: ["production", "preview"]`, `customEnvironmentIds: []`, `upsert: "true"`.
   - Repeat for `DB_PORT` (`5432` or pooler port), `DB_NAME` (`fatec`... or `postgres`), `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`.
   - **Never put real passwords in the repo or in this skill** — use the Supabase/Vercel secret stores.
4. Trigger a production deployment:
   - `vercel_create_deployment` with `project: "fatec-women-api"`, `target: "production"`, `skipAutoDetectionConfirmation: "1"`, and a `requestBody` containing `files: []`, `gitSource: { type: "github", org: "tarsislimadev", repo: "fatec-women-app", ref: "main" }`, and `projectSettings: { framework: null, rootDirectory: "src/api", buildCommand: "npm run build", installCommand: "npm ci" }`.
   - `vercel_create_deployment` requires `name`, `gitSource`, and `requestBody`; `requestBody` must be an object with `files` as an array, and `projectSettings` is mandatory on the first deployment unless `skipAutoDetectionConfirmation=1` is passed.
   - If the deploy has no serverless entry (see gotcha), this will build but requests will 404/timeout — add `src/api/api/index.ts` first.
5. Verify: `vercel_get_deployment` → `readyState: "READY"`; `vercel_get_project` → `rootDirectory: "src/api"`, framework `null`/Other.

Notes:
- `403 forbidden — "You don't have permission to create the project"` means the MCP token is read-only. Reads still work; re-authorize with write scope or use Option 2/3.
- After linking, pushing to `main` auto-deploys. To redeploy a specific commit, call `vercel_create_deployment` again with that `sha`.

## Option 2 — Vercel Dashboard

1. **Add New → Project** → import `tarsislimadev/fatec-women-app`.
2. **Settings → General → Build and Development Settings → Root Directory**: `src/api`.
3. Framework preset **Other**; Build `npm run build`; Install `npm ci`; leave Output empty.
4. Add env vars (`DB_*`, `JWT_SECRET`) under **Settings → Environment Variables** for Production + Preview **before** the first deploy.
5. **Deploy**. Add `src/api/api/index.ts` serverless handler first (see gotchas), otherwise the deployment has no entry.
6. Add a custom domain under **Settings → Domains** if needed.

## Option 3 — Vercel CLI

```powershell
vercel login
vercel --cwd src/api --prod
```

The CLI prompts to link the directory. `--prod` targets production; omit for preview. The CLI can also set env vars interactively (`vercel env add DB_HOST production`).

## Verification

- `GET https://fatec-women-api.vercel.app/` → 200 with `{ "status": "ok", ... }`.
- `GET https://fatec-women-api.vercel.app/health` → 200 (currently **404 — API not deployed**).
- `POST /auth/login` reaches the DB (returns a token or a credential error, not a 500 connection error).
- Vercel **Deployments → Functions** (or runtime logs) show no `pg` connection errors.

## CI/CD

Once linked to GitHub, pull requests get preview deployments and merges to `main` get production deployments. Root directory and build settings come from the project configuration.

## Rollback

Dashboard: **Project → Deployments → select previous deployment → … → Promote to Production**. CLI: `vercel rollback <deployment-url>`.