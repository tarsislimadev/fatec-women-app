---
name: "deploy-admin-vercel"
description: "Deploy the Fatec Women admin panel (src/admin) to Vercel. Use when deploying, re-deploying, or verifying the admin app on Vercel."
---

# Deploy Admin Panel on Vercel

## When To Use

- Deploying the admin panel (`src/admin`) to Vercel.
- Re-deploying after changes to the admin app.
- Verifying admin deployment settings, API wiring, or SPA routing.

## Project Details (verified 2026-11-23)

| Setting | Value |
| --- | --- |
| Vercel team | `tmvdl's projects` — slug `tmvdls-projects`, id `team_UBBe5Zr1x1YLaBhJmBFuPpDF` |
| Project | `fatec-women-admin` — id `prj_W172jw8zrT0dShXmURjHIbFlkOKy` |
| Git repo | `tarsislimadev/fatec-women-app`, production branch `main` |
| Root Directory | `src/admin` |
| Framework preset | Vite |
| Build command | `npm run build` (`vite build`) |
| Output directory | `dist` |
| Install command | `npm ci` |
| Node version | 26.x (Vercel default) |
| Env var | `VITE_API_URL` set to `https://<API_ORIGIN>` on `production` + `preview` — **currently unused by the code**, see gotchas |
| Production URL | https://fatec-women-admin.vercel.app |

## Prerequisites

- `src/admin` must **not** be listed in the repo-root `.vercelignore` (see `.kilo/skills/README.md`).
- The API must be deployed and reachable — but note the admin app does not read `VITE_API_URL` yet (below).

## Gotchas

- **The admin app does not consume `VITE_API_URL`.** API origins are hardcoded:
  - `src/admin/src/utils/api.jsx:2` — `BASE_URL = 'http://localhost:8000'` (the `getenv` variant is commented out).
  - `src/admin/src/pages/Dashboard.jsx:15` — `fetch('http://localhost:3000/reports')` (note: port 3000, not 8000).

  Setting the env var is harmless but has no effect. Before the admin panel can work in production, replace those literals with `import.meta.env.VITE_API_URL` (matching `src/frontend/src/services/api.ts:35`) and redeploy. Until then, the deployed admin UI loads but cannot reach the API from a browser.
- **No `vercel.json` → SPA deep links 404.** `src/admin/src/App.jsx` defines `/`, `/login`, `/dashboard`, `/profile` via `BrowserRouter`, but there is no rewrite to `index.html`. Confirmed: `https://fatec-women-admin.vercel.app/dashboard` → 404. Fix by adding `src/admin/vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

  Then commit and redeploy.
- **`.vercel/` local artifacts.** `src/admin/.vercel/` (created by a local `vercel` CLI link/build) is gitignored via `src/admin/.gitignore`. It contains a stale `output/static` build — do not deploy from it or commit it; always build from source on Vercel.
- **Default credentials** (from `src/admin/README.md`): email `admin@admin.com`, password `admin123`. These are development seeds, not production-safe.

## Option 1 — Via MCP (recommended)

1. Discover (read-only): `vercel_get_git_deployment_context`, `vercel_list_projects` (with `teamId`).
2. Create + link without deploying:
   - `vercel_create_git_project` — `repo: "tarsislimadev/fatec-women-app"`, `teamId: "team_UBBe5Zr1x1YLaBhJmBFuPpDF"`, `projectName: "fatec-women-admin"`, `rootDirectory: "src/admin"`, `deploy: false`.
3. Set the API origin (for future use, once the code reads it):
   - `vercel_create_project_env` — `key: "VITE_API_URL"`, `value: "https://<API_ORIGIN>"`, `type: "encrypted"`, `target: ["production", "preview"]`, `customEnvironmentIds: []`, `upsert: "true"`.
4. Trigger a production deployment:
   - `vercel_create_deployment` with `project`, `target: "production"`, `skipAutoDetectionConfirmation: "1"`, and a `requestBody` containing `files: []`, `gitSource: { type: "github", org: "tarsislimadev", repo: "fatec-women-app", ref: "main" }`, and `projectSettings: { framework: "vite", rootDirectory: "src/admin", buildCommand: "npm run build", installCommand: "npm ci", outputDirectory: "dist" }`.
   - `vercel_create_deployment` requires `name`, `gitSource`, and `requestBody`; `requestBody` must be an object with `files` as an array, and `projectSettings` is mandatory on the first deployment unless `skipAutoDetectionConfirmation=1` is passed.
5. Verify: `vercel_get_deployment` → `readyState: "READY"`; `vercel_get_project` → `rootDirectory: "src/admin"`, framework `vite`.

Notes:
- `403 forbidden — "You don't have permission to create the project"` means the MCP token is read-only. Reads still work; re-authorize with write scope or use Option 2/3.
- Pushing to `main` auto-deploys once the project is linked. To redeploy a specific commit, call `vercel_create_deployment` with that `sha`.

## Option 2 — Vercel Dashboard

1. **Add New → Project** → import `tarsislimadev/fatec-women-app`.
2. **Settings → General → Build and Development Settings → Root Directory**: `src/admin`.
3. Framework preset **Vite**; Build `npm run build`; Output `dist`; Install `npm ci`.
4. Add `VITE_API_URL` (Environment Variables) before deploying — see gotchas for the code change required to make it effective.
5. **Deploy**, then add a custom domain under **Settings → Domains**.

## Option 3 — Vercel CLI

```powershell
vercel login
vercel --cwd src/admin --prod
```

The CLI prompts to link the directory. `--prod` targets production; omit for preview. This is what produced the gitignored `src/admin/.vercel/` directory.

## Verification

- `GET https://fatec-women-admin.vercel.app/` → 200.
- Sign-in page loads; sign-in works only if the API origin is reachable from the browser (see gotchas — currently it is not).
- Deep link (e.g. `/dashboard`) returns 200, not 404 — requires `vercel.json` rewrite.

## CI/CD

The project is linked to GitHub: pull requests get preview deployments, merges to `main` get production deployments. Root directory and build settings come from the project configuration.

## Rollback

Dashboard: **Project → Deployments → select previous deployment → … → Promote to Production**. CLI: `vercel rollback <deployment-url>`.