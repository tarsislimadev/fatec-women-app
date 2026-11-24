import { Pool } from "pg";
import { DB_CONFIG } from "./config/env";

// Cache the pool on globalThis so serverless warm invocations (and dev hot
// reload) reuse a single pool instead of opening a new one per request.
const globalForPool = globalThis as unknown as { __fatecPool?: Pool };

if (!globalForPool.__fatecPool) {
  globalForPool.__fatecPool = new Pool({
    ...DB_CONFIG,
    max: Number.parseInt(process.env.DB_POOL_MAX ?? "5", 10),
  });
}

export const pool = globalForPool.__fatecPool;
