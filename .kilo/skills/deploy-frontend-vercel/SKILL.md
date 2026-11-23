---
name: "deploy-frontend-vercel"
description: "Deploy the Fatec Women public frontend (src/frontend) to Vercel. Use when deploying, re-deploying, or verifying the public frontend app on Vercel."
---

# Deploy Public Frontend on Vercel

## When To Use

- Deploying the public frontend (`src/frontend`) to Vercel.
- Re-deploying after changes to the frontend app.
- Verifying frontend deployment settings, API connectivity, or SPA routing.

## Project Details (verified 2026-11-23)

| Setting | Value |
| --- | --- |
| Vercel team | `tmvdl's projects` — slug `tmvdls-projects`, id `team_UBBe5Zr1x1YLaBhJmBFuPpDF` |
| Project | `fatec-women-frontend` — id `prj_AxG5z5C9orTCx28aXCbSCZRRYkBL` |
| Git repo | `tarsislimadev/fatec-women-app`, production branch `main` |
| Root Directory | `src/frontend` |
| Framework preset | Vite |
| Build command | `npm run build` (`tsc && vite build`) |
| Output directory | `dist` |
| Install command | `npm install` (see gotcha below) |
| Node version | 26.x (Vercel default) |
| Env var | `VITE_API_URL` = `https://<API_ORIGIN>`, no trailing slash, targets `production` + `preview` |
| Production URL | https://fatec-women-frontend.vercel.app |

## Prerequisites

- The API must be deployed and reachable; the frontend needs its origin.
- `src/frontend` must **not** be listed in the repo-root `.vercelignore` (see `.kilo/skills/README.md`).

## Gotchas

- **`npm ci` fails with `missing_lock_file`.** `src/frontend/package-lock.json` is committed, but the build ran with a working directory where the lockfile was not present — the real cause was `src/frontend/` being excluded by `.vercelignore`. After removing that line the build succeeded with `npm install`. If a build reports `missing_lock_file`, check `.vercelignore` before changing the install command.
- **`VITE_*` is baked at build time.** Vite inlines `import.meta.env.VITE_API_URL` during `vite build`. Set the env var *before* the production build, or the bundle keeps an empty origin. `src/frontend/src/services/api.ts:35` and `api.js:1` read `import.meta.env.VITE_API_URL ?? '/api'`.
- **No `vercel.json` → SPA deep links 404.** `react-router-dom` routes such as `/login` return 404 on refresh/reload because there is no rewrite to `index.html`. Confirmed: `https://fatec-women-frontend.vercel.app/login` → 404. Fix by adding `src/frontend/vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

  Then commit and redeploy. Optional API proxy variant:

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://<API_ORIGIN>/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Option 1 — Via MCP (recommended)

1. Discover (read-only): `vercel_get_git_deployment_context`, `vercel_list_projects` (with `teamId`).
2. Create + link, **without deploying** so the env var lands first:
   - `vercel_create_git_project` — `repo: "tarsislimadev/fatec-women-app"`, `teamId: "team_UBBe5Zr1x1YLaBhJmBFuPpDF"`, `projectName: "fatec-women-frontend"`, `rootDirectory: "src/frontend"`, `deploy: false`.
3. Set the API origin:
   - `vercel_create_project_env` — `key: "VITE_API_URL"`, `value: "https://<API_ORIGIN>"`, `type: "encrypted"`, `target: ["production", "preview"]`, `customEnvironmentIds: []`, `upsert: "true"`.
4. Trigger a production deployment:
   - `vercel_create_deployment` with `project`, `target: "production"`, `skipAutoDetectionConfirmation: "1"`, and a `requestBody` containing `files: []`, `gitSource: { type: "github", org: "tarsislimadev", repo: "fatec-women-app", ref: "main" }`, and `projectSettings: { framework: "vite", rootDirectory: "src/frontend", buildCommand: "npm run build", installCommand: "npm install", outputDirectory: "dist" }`.
   - `vercel_create_deployment` requires **all three** of `name`, `gitSource`, and `requestBody`; `requestBody` must be an object with `files` as an array, and `projectSettings` is mandatory on the first deployment unless `skipAutoDetectionConfirmation=1` is passed.
5. Verify: `vercel_get_deployment` → `readyState: "READY"`; `vercel_get_project` → `rootDirectory: "src/frontend"`, framework `vite`.

Notes:
- `403 forbidden — "You don't have permission to create the project"` means the MCP token is read-only. Reads still work; re-authorize with write scope or use Option 2/3.
- After the project is linked to GitHub, pushing to `main` auto-deploys. To redeploy a specific commit, call `vercel_create_deployment` again with that `sha`.

## Option 2 — Vercel Dashboard

1. **Add New → Project** → import `tarsislimadev/fatec-women-app`.
2. **Settings → General → Build and Development Settings → Root Directory**: `src/frontend`.
3. Framework preset **Vite**; Build `npm run build`; Output `dist`; Install `npm install`.
4. Add `VITE_API_URL` (Environment Variables) **before** the first deploy.
5. **Deploy**, then add a custom domain under **Settings → Domains**.

## Option 3 — Vercel CLI

```powershell
vercel login
vercel --cwd src/frontend --prod
```

The CLI prompts to link the directory. `--prod` targets production; omit for preview.

## Verification

- `GET https://fatec-women-frontend.vercel.app/` → 200.
- `GET <API_ORIGIN>/health` → 200 (currently **not** satisfied: `https://fatec-women-api.vercel.app/health` returns 404 because the API is not deployed).
- Report list/dashboard loads data from the API.
- Deep link (e.g. `/login`) returns 200, not 404 — requires `vercel.json` rewrite.

## CI/CD

The project is linked to GitHub: pull requests get preview deployments, merges to `main` get production deployments. Root directory and build settings come from the project configuration.

## Rollback

Dashboard: **Project → Deployments → select previous deployment → … → Promote to Production**. CLI: `vercel rollback <deployment-url>`.