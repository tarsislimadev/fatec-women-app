---
applyTo: "src/database/**"
description: "Use when working on the database schema or migrations for the Fatec Women app."
---

# Database guidance

- Keep schema changes explicit and incremental by adding or updating SQL scripts in this folder.
- Prefer idempotent migration patterns that work safely with existing local containers.
- Keep columns, constraints, and table relationships easy to reason about.
- Align database names and credentials with the values defined in [docker-compose.yaml](docker-compose.yaml).
- Do not add app-specific logic in SQL; keep DDL focused on schema and data integrity.
- Validate database changes by restarting the compose stack and checking that startup succeeds without errors.
