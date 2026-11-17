import bcrypt from "bcrypt";
import { pool } from "./database";
import { SALT_ROUNDS } from "./config/env";

async function seed(): Promise<void> {
  const passwordHash = await bcrypt.hash("admin", SALT_ROUNDS);

  await pool.query(
    `INSERT INTO users (name, email, phone, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO NOTHING`,
    ["Administrator", "admin@admin.com", "0000000000", passwordHash, "admin"],
  );
}

seed()
  .then(() => pool.end())
  .catch(async (error: unknown) => {
    console.error("Failed to seed admin user:", error);
    await pool.end();
    process.exitCode = 1;
  });


