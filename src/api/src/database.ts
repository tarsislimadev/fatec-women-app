import { Pool } from "pg";
import { DB_CONFIG } from "./config/env";
import fs from "fs";
import path from "path";

export const pool = new Pool(DB_CONFIG);

export async function initDatabase(): Promise<void> {
  const sql = fs.readFileSync(path.resolve(process.cwd(), "src", "001-create-tables.sql"), "utf8");
  await pool.query(sql);
}
