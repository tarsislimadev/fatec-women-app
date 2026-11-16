import { pool } from "../database";
import type { User } from "../types";

export const userRepository = {
  findByEmailOrPhone: async (email: string, phone: string) => {
    const result = await pool.query<{ id: number }>(
      "SELECT id FROM users WHERE email = $1 OR phone = $2",
      [email, phone]
    );
    return result.rows;
  },

  findByEmail: async (email: string) => {
    const result = await pool.query<User>(
      "SELECT id, name, email, role, password_hash FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },

  create: async (
    name: string,
    email: string,
    phone: string,
    passwordHash: string,
    role: string,
    isAnonymous: boolean
  ) => {
    const result = await pool.query<User>(
      `INSERT INTO users (name, email, phone, password_hash, role, is_anonymous)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, role, is_anonymous`,
      [name, email, phone, passwordHash, role, isAnonymous]
    );
    return result.rows[0];
  },

  findById: async (id: number) => {
    const result = await pool.query<{ id: number; name: string; email: string; role: string; is_anonymous: boolean }>(
      "SELECT id, name, email, role, is_anonymous FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },
};
