---
name: "deploy-database-supabase"
description: "Apply the Fatec Women database SQL scripts to a Supabase PostgreSQL project. Use when provisioning or updating the production database schema and seed data on Supabase."
---

# Deploy Database SQLs on Supabase

## When To Use

- Provisioning the production database schema on Supabase.
- Applying new versioned SQL scripts to an existing Supabase database.
- Seeding the initial admin user.
- Reviewing the security posture of the deployed database.

## Scripts

- `src/database/001-create-tables.sql` — creates `users`, `messages`, `reports`, `report_status_history` with `CREATE TABLE IF NOT EXISTS` (idempotent).
- `src/database/002-insert-users.sql` — seeds the admin user `admin@admin.com` (plain `INSERT`, **not** idempotent).

## Project Context (verified 2026-11-23)

| Field | Value |
| --- | --- |
| Supabase org | `tarsislimadev` — id `nkxboeshrctsaoimthkt` |
| Project | **fatec-women** — id/ref `ztbjdhjigsugvrfgbkfg` |
| Region | `sa-east-1` (São Paulo) |
| Status | `ACTIVE_HEALTHY` |
| Postgres | 17.12.0 |
| Database host | `db.ztbjdhjigsugvrfgbkfg.supabase.co` |

Applied state: `users` (1 row — the seeded admin), `messages` (0), `reports` (0), `report_status_history` (0).

## Prerequisites

- Supabase MCP tools available (`supabase_list_*`, `supabase_apply_migration`, `supabase_execute_sql`).
- API configured with `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (see `CONFIGURE.md` / `docs/INSTALL.md`). Production credentials live in Vercel/Supabase secrets — never commit them.

## Option 1 — Via MCP (recommended)

1. Discover (read-only): `supabase_list_organizations` → org id; `supabase_list_projects` → confirm the project and capture its `project_id` (ref).
2. Apply the schema (idempotent):
   - `supabase_apply_migration` — `project_id`, `name: "001_create_tables"`, `query:` contents of `src/database/001-create-tables.sql`.
3. Seed the admin user (**not** idempotent):
   - `supabase_apply_migration` — `project_id`, `name: "002_insert_admin_user"`, `query:` contents of `src/database/002-insert-users.sql`.
   - Skip if `admin@admin.com` already exists — the unique `email`/`phone` constraints reject a duplicate.
4. Verify:
   - `supabase_list_tables` (`schemas: ["public"]`, `verbose: true`) → confirm the four tables.
   - `supabase_execute_sql` — `SELECT id, name, email, role FROM public.users;` → admin row present.

Notes:
- Migration `name` must be `snake_case`; it is recorded in Supabase's migration history.
- Keep scripts sequential and versioned (`003-...sql`); never edit an applied migration in place.
- If no project existed, creating one incurs cost — call `supabase_get_cost`, state the price, get explicit user agreement, then `supabase_confirm_cost` and `supabase_create_project`. Poll `supabase_get_project` until `ACTIVE_HEALTHY` before running SQL.

## Option 2 — SQL Editor (manual)

1. Open the Supabase project dashboard → **SQL Editor**.
2. Run `001-create-tables.sql` (safe to re-run).
3. Run `002-insert-users.sql` (skip if the admin user already exists).
4. Set the API environment variables with the Supabase connection details.
5. Validate with the API `/health` endpoint.

## Security: Row Level Security is disabled

`supabase_list_tables` reports `rls_enabled: false` on all four tables. Anyone holding the anon/publishable key can read and modify every row. The API is the only intended client, so this must be addressed before production use.

Remediation (review before running — enabling RLS **without** policies blocks all access, including the API if it connects as `anon`/`authenticated`):

```sql
ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."reports" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."report_status_history" ENABLE ROW LEVEL SECURITY;
```

Then add policies. If the API connects as a superuser/service role, RLS is bypassed and the tables stay reachable; if it connects as `anon`/`authenticated`, policies must be written for each table. Reference: https://supabase.com/docs/guides/database/postgres/row-level-security

Do not auto-apply this; surface it to the user and let them decide.

## Schema Overview

| Table | Purpose |
| --- | --- |
| `users` | Users, credentials, roles, anonymity preference. |
| `messages` | User messages with soft delete. |
| `reports` | Reports with location, details, status, optional image. |
| `report_status_history` | Status change history for reports. |

Foreign keys: `messages.user_id` and `reports.user_id` cascade on delete; `report_status_history.changed_by` is set null on delete.

## Local Development

```powershell
docker compose up -d --build database
```

Defaults: host `localhost` (or `database` inside Compose), port `5432`, database `fatec`, user `fatec`, password `fatec`.

The init script runs only on an empty data directory. Later schema changes must be applied explicitly and recorded in a new versioned script; do not recreate the container expecting the existing schema to update.

## Notes

- Never commit passwords, keys, or real data. The seed password hash is a bcrypt digest, not plaintext.
- After applying scripts, verify with `\dt` in `psql` or the Supabase table editor.
- Keep schema changes in `src/database/`, versioned sequentially (`003-...sql`, etc.).