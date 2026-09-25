---
applyTo: "src/api/**"
description: "Use when working on the Express API for the Fatec Women app."
---

# API guidance

- Keep the API small and status-focused; this service is a lightweight Express app, not a framework-heavy backend.
- Prefer simple route handlers and plain JSON responses.
- Validate changes by starting the stack with `docker compose up -d --build` and checking the health endpoint at `http://localhost:3000/health`.
- Do not introduce Android-specific logic or database schema changes in the API layer.
- Keep request/response shapes explicit and easy to debug.
- If a route or behavior is added, document the new endpoint in the existing project docs rather than duplicating notes in multiple places.
