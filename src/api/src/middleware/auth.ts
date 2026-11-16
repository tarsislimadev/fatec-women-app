import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import type { AuthenticatedRequest, User } from "../types";

export const authenticateToken = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    response.status(401).json({ status: "error", data: null, message: "Access token required" });
    return;
  }
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      response.status(403).json({ status: "error", data: null, message: "Invalid or expired token" });
      return;
    }
    request.user = decoded as User;
    next();
  });
};

export const requireRole = (...roles: string[]) => {
  return (request: AuthenticatedRequest, response: Response, next: NextFunction): void => {
    if (!request.user) {
      response.status(401).json({ status: "error", data: null, message: "Authentication required" });
      return;
    }
    if (!roles.includes(request.user.role)) {
      response.status(403).json({ status: "error", data: null, message: "Insufficient permissions" });
      return;
    }
    next();
  };
};
