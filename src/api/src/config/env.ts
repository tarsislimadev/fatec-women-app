export const PORT = Number.parseInt(process.env.PORT ?? "8000", 10);

export const JWT_SECRET: string = process.env.JWT_SECRET ?? "JWT_SECRET_1234";
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export const SALT_ROUNDS = 10;

export const VALID_STATUSES = ["pendente", "em_andamento", "resolvido", "encerrado"] as const;
export type ReportStatus = (typeof VALID_STATUSES)[number];

const isLocalhost = process.env.DB_HOST === "localhost" || process.env.DB_HOST === "127.0.0.1" || !process.env.DB_HOST;

export const DB_CONFIG = {
  host: process.env.DB_HOST ?? "localhost",
  port: Number.parseInt(process.env.DB_PORT ?? "5432", 10),
  database: process.env.DB_NAME ?? "fatec",
  user: process.env.DB_USER ?? "fatec",
  password: process.env.DB_PASSWORD ?? "fatec",
  ...(isLocalhost ? {} : { ssl: { rejectUnauthorized: false } }),
};
