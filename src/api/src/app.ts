import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { authenticateToken, requireRole } from "./middleware/auth";
import { validateReport, validateStatus } from "./middleware/validation";
import { errorHandler } from "./middleware/errorHandler";
import { healthController } from "./controllers/healthController";
import { authController } from "./controllers/authController";
import { reportController } from "./controllers/reportController";
import { pool } from "./database";

const app = express();

app.use(express.json());
app.use(cors());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { status: "error", data: null, message: "Too many requests, please try again later." },
});
app.use("/auth/", authLimiter);

app.get("/", (_request, response) => {
  response.status(200).json({ status: "ok", data: null, message: null });
});

app.get("/health", healthController.check);

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/me", authenticateToken, authController.me);
app.post("/auth/face-login", authController.faceLogin);

app.get("/reports", authenticateToken, reportController.list);
app.post("/reports", authenticateToken, validateReport, reportController.create);
app.patch("/reports/:id/status", authenticateToken, requireRole("admin"), validateStatus, reportController.updateStatus);
app.get("/reports/:id/history", authenticateToken, reportController.getHistory);

app.use(errorHandler);

export { app };
export { pool };
