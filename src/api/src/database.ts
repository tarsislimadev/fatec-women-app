import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST || "database",
  port: process.env.DB_PORT || "5432",
  database: process.env.DB_NAME || "fatec",
  user: process.env.DB_USER || "fatec",
  password: process.env.DB_PASSWORD || "fatec",
});
