# AGENTS.md

## Layout
- `src/api`: TypeScript/Express API (entry `src/index.ts`, app/routes in `src/app.ts`, DB in `src/database.ts`, spec in `swagger.yaml`). Production runs on Vercel with Supabase PostgreSQL (see `docs/INSTALL.md`, `CONFIGURE.md`).
- `src/admin`, `src/frontend`: Vite + React apps (separate `package.json` scripts).
- `src/android`: native Android app (`settings.gradle.kts` includes `:app`, namespace/app code under `app/src/main/java/br/gov/sp/fatec/women/`).
- `src/database/001-create-tables.sql`: canonical local/schema SQL (mounted by Compose). Keep schema changes in `src/database/`.
- Other instruction sources: `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md`.

## Commands
- Local stack (root): `docker compose up -d --build` — starts `admin`, `api`, `database` (Postgres); `frontend` service is commented out in `docker-compose.yaml`. API health: `http://localhost:8000/health`.
- API (`src/api`): `npm ci`, `npm run build` (`tsc`), `npm start` (`node dist/index.js`), `npm run dev` (`tsx watch src/index.ts`). Dockerfile runs `npx tsx watch src/index.ts` (dev-style) despite build script existing.
- Admin/Frontend: run in package dir — `npm install` (or `npm ci` if lock is trusted), `npm run dev`, `npm run build`, `npm run preview`; admin also has `npm run lint`.
- Android (`src/android`): open in Android Studio or Windows CLI `.\gradlew.bat assembleDebug`. Release APK CI (`.github/workflows/release-apk.yml`) builds via `docker compose -f docker-compose.mobile.yaml run --rm android sh /app/gradlew assembleDebug`.

## Conventions & gotchas
- Preserve layer boundaries: Android-only logic in `src/android`, API in `src/api`, schema/DB assets in `src/database`; do not leak DB concerns into clients or client concerns into API.
- Keep API endpoints simple/status-oriented; align with `src/api/swagger.yaml`. `app.ts` reads `create.reports.sql` from CWD and runs it on startup—mind working directory/path when changing runtime or container behavior.
- Local DB defaults/env: `DB_HOST/PORT/NAME/USER/PASSWORD` (Compose uses `database`/`fatec`; defaults in `src/api/src/database.ts`). Production credentials are Vercel/Supabase secrets—never commit them.
- `docker-compose.yaml` includes a `psql` helper service: `docker compose run psql bash` then `psql -h database -p 5432 -U fatec -d fatec -W`.
- No automated test suite is relied on in-repo (Android has example unit/instrumented stubs). Prefer smoke checks: API `/health` after DB/API changes; Gradle build/load for Android; `npm run build`/`lint` (admin) for web changes when relevant.

## Docs
- Start with `README.md`, `CONFIGURE.md`, `docs/INSTALL.md`, `docs/modelo-dominio.md`, `docker-compose.yaml`. Keep docs in sync when setup/onboarding behavior changes.
