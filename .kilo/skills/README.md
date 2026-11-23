# Kilo Skills — Fatec Women

Project-scoped skills. Each directory holds a `SKILL.md` with YAML frontmatter (`name`, `description`) plus the workflow body.

| Skill | Purpose |
| --- | --- |
| `deploy-frontend-vercel` | Deploy/verify the public frontend (`src/frontend`) on Vercel. |
| `deploy-admin-vercel` | Deploy/verify the admin panel (`src/admin`) on Vercel. |
| `deploy-database-supabase` | Apply `src/database/*.sql` to the Supabase project. |

## Shared deployment facts

- Vercel team: `tmvdl's projects` — slug `tmvdls-projects`, id `team_UBBe5Zr1x1YLaBhJmBFuPpDF`.
- Git repo: `tarsislimadev/fatec-women-app`, production branch `main`.
- Vercel projects: `fatec-women-frontend` (`prj_AxG5z5C9orTCx28aXCbSCZRRYkBL`), `fatec-women-admin` (`prj_W172jw8zrT0dShXmURjHIbFlkOKy`).
- Supabase project: `fatec-women` (`ztbjdhjigsugvrfgbkfg`), org `nkxboeshrctsaoimthkt`, region `sa-east-1`.

## Repo-root `.vercelignore` is load-bearing

`.vercelignore` at the repository root is applied to **every** Vercel build, regardless of the project's Root Directory. Listing a source directory there removes it from the build context, which breaks that project's build with confusing errors:

| Symptom | Real cause |
| --- | --- |
| `npm ci` → `missing_lock_file` / `ENOENT ... package.json` | the app directory was excluded by `.vercelignore` |

Keep excluded only what no Vercel project needs. Current content excludes `src/android/`, `src/database/`, `docs/`. When adding a new Vercel project, verify its root directory is not excluded.

## SPA routing

Both `src/frontend` and `src/admin` use `react-router-dom` with `BrowserRouter`. Without a `vercel.json` rewrite, deep links 404 on refresh. Each skill documents the required `vercel.json`; neither file currently exists in the repo.

## Secrets

`.kilo/kilo.json` is committed without credentials. Do not add tokens or API keys to it — GitHub push protection will reject the push and the secret must be rotated if it ever lands in history.