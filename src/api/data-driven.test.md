# API Data-Driven Testing Plan

## Goal

Build a repeatable, data-driven test suite for the Fatec Women API. Each
behavior should be tested through a shared execution path with multiple input
rows, including valid values, boundaries, malformed values, and privacy-safe
fixtures.

The plan covers the current endpoints in [`src/index.ts`](./src/index.ts),
the PostgreSQL access in [`src/database.ts`](./src/database.ts), and the
contracts documented in [`swagger.yaml`](./swagger.yaml).

## Foundation

1. Add a compatible TypeScript test runner and a `test` script to
   [`package.json`](./package.json).
2. Refactor the Express application into an exported app factory, keeping
   `listen` and signal shutdown in the process entry point. Tests must be able
   to send requests without opening a network port.
3. Inject the database pool or query adapter into the app factory. Unit tests
   can use a controlled adapter, while integration tests use isolated
   PostgreSQL.
4. Add shared TypeScript types for report inputs, expected validation errors,
   response envelopes, and test cases.
5. Ensure each case creates fresh objects and does not mutate a shared fixture.

## Data-driven case model

Every case should have a stable ID and the minimum data needed to exercise the
behavior:

```ts
{
  id: string;
  description: string;
  input: unknown;
  expectedStatus: number;
  expectedBody: unknown;
  databaseAssertions?: string[];
}
```

Failure output should include the case ID and expected-versus-actual summary,
but never print report details, names, image URLs, or other sensitive values.

## Case groups

### Root and health endpoints

- `root-returns-status`: verify the `200` response and the
  `{ status, data, message }` shape.
- `health-returns-database-time`: verify the `200` response, ISO timestamp,
  database timestamp, and `message: null`.
- Database failure: verify the documented `500` error shape and that internal
  database details are not exposed.

### Report creation

Use table-driven POST cases covering:

| Case category | Examples | Expected result |
|---|---|---|
| Minimal valid input | `details` only | `201`, nullable optional fields |
| Complete valid input | strings, coordinates, and details | `201`, persisted values match |
| Explicit nulls | nullable optional fields set to `null` | `201`, nulls remain null |
| Empty details | empty string | Define and enforce the chosen policy |
| Missing details | omitted, `undefined`-equivalent JSON input | `422`, `missing` validation item |
| Wrong object shape | `null`, array, string, number | `422`, object type error |
| Invalid strings | non-string `name` or `image_url` | `422`, field-specific error |
| Invalid coordinates | string, boolean, `NaN`/infinite equivalent | `422`, field-specific number error |
| Boundary values | 100-character `name`, long URL, min/max coordinates | Contract-defined result |
| Unknown fields | extra JSON properties | Define whether ignored or rejected |

For every accepted row, assert `201`, numeric `id`, valid `created_at`, and
the complete returned report shape. For every rejected row, assert `422`,
`detail` as an array, and the exact `loc`, `msg`, and `type` values.

### Report listing

- Empty database returns `200` and an empty array.
- Multiple inserted reports are returned newest first.
- Returned rows contain only the documented report fields.
- Ordering remains deterministic when timestamps are equal; if the API
  requires this guarantee, add a stable secondary ordering key.

### Persistence and failure behavior

- Verify each accepted case is persisted with the expected nullable values.
- Verify validation failures do not insert rows.
- Verify a database insertion failure returns `500` without leaking SQL or
  connection details.
- Reset the reports table between integration cases or use a transaction
  rollback strategy so case order cannot affect results.

## Execution layers

### Fast unit/data tests

Run validation cases against the request handler or validation boundary with a
controlled database adapter. These tests should not require Docker, production
credentials, or network access.

### API integration tests

Run the same case tables through HTTP against an isolated PostgreSQL instance.
Use deterministic schema setup, cleanup, and seed data. Confirm both HTTP
responses and database state.

### Contract checks

Compare success and error responses with the schemas in
[`swagger.yaml`](./swagger.yaml). Keep contract assertions focused on fields,
types, required values, and status codes rather than duplicating the entire
OpenAPI document in test code.

## Privacy and fixture rules

- Use synthetic names, descriptions, URLs, and coordinates.
- Do not use production credentials or unmasked case information.
- Do not load the repository CSV into API tests unless a small anonymized
  fixture and its schema have been explicitly defined.
- Redact request bodies from logs and test failure messages.
- Keep case IDs descriptive without embedding personal information.

## Acceptance criteria

- The API package has a documented command for running data-driven tests.
- Every report validation branch has valid, boundary, and invalid cases.
- The same report case tables can run in fast and PostgreSQL integration modes.
- Tests verify status codes, response shapes, validation details, and
  persistence behavior.
- Tests are isolated, deterministic, and independent of case ordering.
- Pull requests run the fast suite; PostgreSQL integration runs with an
  isolated database in CI or the documented local container workflow.
