import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://fatec:fatec@0.0.0.0:5432/fatec',
  // host: process.env.DB_HOST || "database",
  // database: process.env.DB_NAME || "fatec",
  // user: process.env.DB_USER || "fatec",
  // password: process.env.DB_PASSWORD || "fatec",
});
