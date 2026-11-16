import { type NextFunction, type Request, type Response } from "express";

export const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
): void => {
  console.error(error);
  response.status(500).json({ status: "error", data: null, message: "Internal server error" });
};
