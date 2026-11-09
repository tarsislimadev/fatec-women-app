import { port } from './environment';
import { pool } from './database';
import { app } from './app';

const server = app.listen(port, () => {
  console.log(`Fatec Women API listening on port ${port}`);
});

const shutdown = async () => {
  server.close();
  await pool.end();
};

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
