# Deploy on Vercel

The Fatec Women web frontends are two independent Vercel projects:

| Project | Local root | Build command | Output | Framework preset |
|---------|------------|---------------|--------|------------------|
| Admin panel | `src/admin` | `npm run build` (`vite build`) | `dist` | Vite |
| Public frontend | `src/frontend` | `npm run build` (`tsc && vite build`) | `dist` | Vite |

The root `.vercelignore` excludes both directories, so **do not deploy from the repository root**. Create one Vercel project per subproject, pointing each at its own root directory.

## Prerequisites

- Vercel account: https://vercel.com/signup
- Vercel CLI (optional): `npm i -g vercel`
- The API must be deployed and reachable (see `CONFIGURE.md` / `docs/INSTALL.md`); the frontend needs its origin.

## Option 1 — Vercel Dashboard (recommended)

### Admin panel

1. Log in to Vercel → **Add New → Project**.
2. Import `tarsislimadev/fatec-women-app`.
3. In **Project Settings → General → Build and Development Settings → Root Directory**: enter `src/admin`.
4. Framework preset: **Vite** (detected automatically).
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`
5. No environment variables are required.
6. Click **Deploy**.
7. After the first deploy, go to **Settings → Domains** to add a custom domain if desired.

### Public frontend

1. Log in to Vercel → **Add New → Project**.
2. Import `tarsislimadev/fatec-women-app`.
3. Root Directory: `src/frontend`.
4. Framework preset: **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`
5. Environment variable (required):
   - `VITE_API_URL` = origin of the deployed API (e.g. `https://fatec-women-api.vercel.app`), no trailing slash.
6. Click **Deploy**.
7. Add a custom domain under **Settings → Domains** if needed.

## Option 2 — Vercel CLI

From the repository root:

```powershell
# Admin panel
vercel login
vercel --cwd src/admin --prod

# Public frontend
vercel login
vercel --cwd src/frontend --prod
```

The CLI prompts to link the directory to a Vercel project. Use `--prod` for production deployments; omit it for preview deployments.

## vercel.json (SPA routing)

Both apps use `react-router-dom`, so refreshing on a sub-route would otherwise 404. Each project root contains a `vercel.json` that rewrites unknown paths to `index.html`:

`src/admin/vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

`src/frontend/vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

If the frontend must proxy `/api` to the deployed API instead of using `VITE_API_URL`, replace `src/frontend/vercel.json` with:

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://<API_ORIGIN>/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Environment variables

| Project | Variable | Value | Required |
|---------|----------|-------|----------|
| Admin | — | — | No |
| Frontend | `VITE_API_URL` | Deployed API origin | Yes |

Add variables in Vercel under **Project Settings → Environment Variables**, then redeploy for changes to take effect.

## Verification

After deployment, open each project URL and check:

- Admin: loads the sign-in page (email `admin@admin.com`, password `admin123` per `src/admin/README.md`).
- Frontend: loads the landing page; report list/dashboard loads data from the API (confirm `VITE_API_URL` is set and the API is healthy at `<API_ORIGIN>/health`).

## CI/CD

Connecting each Vercel project to the GitHub repo triggers automatic preview deployments on pull requests and production deployments on merges to the default branch. Root directory (`src/admin` or `src/frontend`) and build settings are inherited from the project configuration above.

## Rollback

In the Vercel dashboard: **Project → Deployments → select previous deployment → ... → Promote to Production**. Or with the CLI: `vercel rollback <deployment-url>`.