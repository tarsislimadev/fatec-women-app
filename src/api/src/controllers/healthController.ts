import { type Request, type Response, type NextFunction } from "express";
import { pool } from "../database";

export const healthController = {
  check: async (_request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await pool.query<{ now: Date }>("SELECT NOW() AS now");
      return response.status(200).json({
        status: "ok",
        data: { datetime: new Date().toISOString(), now: result.rows[0].now.toString() },
        message: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
