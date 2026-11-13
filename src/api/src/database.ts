import { Pool } from "pg";

export const pool = new Pool({
  host: "db.prisma.io",
  database: "postgres",
  port: 5432,
  user: "34f94c6c65627048cff648f77a1e1db50fec80d8d83a41e98c48b8bbb05d075d",
  password: "sk_qNNRxeQsdMT0bisZw5LWv",
  ssl: {
    rejectUnauthorized: false,
  },
});
