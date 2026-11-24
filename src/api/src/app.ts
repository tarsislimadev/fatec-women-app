import express from "express";
import cors from "cors";
import { validateReport, validateStatus } from "./middleware/validation";
import { errorHandler } from "./middleware/errorHandler";
import { healthController } from "./controllers/healthController";
import { reportController } from "./controllers/reportController";
import { pool } from "./database";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_request, response) => {
  response.status(200).json({ status: "ok", data: null, message: null });
});

app.get("/health", healthController.check);

app.get("/reports", reportController.list);
app.post("/reports", validateReport, reportController.create);
app.patch("/reports/:id/status", validateStatus, reportController.updateStatus);
app.get("/reports/:id/history", reportController.getHistory);

app.use(errorHandler);

export { app };
export { pool };