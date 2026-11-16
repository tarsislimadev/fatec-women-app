import { PORT } from "./config/env";
import { pool } from "./database";
import { app } from "./app";
import { initDatabase } from "./database";

const server = app.listen(PORT, async () => {
  await initDatabase();
  console.log(`Fatec Women API listening on port ${PORT}`);
});

const shutdown = async () => {
  server.close();
  await pool.end();
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
