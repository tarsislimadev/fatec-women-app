import { type Request, type Response, type NextFunction } from "express";
import { authService } from "../services/authService";
import type { AuthenticatedRequest } from "../types";

export const authController = {
  register: async (request: Request, response: Response, next: NextFunction) => {
    const { name, email, phone, password, role, is_anonymous } = request.body as {
      name?: string;
      email?: string;
      phone?: string;
      password?: string;
      role?: string;
      is_anonymous?: boolean;
    };

    if (!name || !email || !phone || !password) {
      return response.status(422).json({ status: "error", data: null, message: "name, email, phone and password are required" });
    }
    if (password.length < 6) {
      return response.status(422).json({ status: "error", data: null, message: "Password must be at least 6 characters" });
    }
    if (role && !["user", "admin"].includes(role)) {
      return response.status(422).json({ status: "error", data: null, message: "Invalid role" });
    }

    try {
      const { user, token } = await authService.register(name, email, phone, password, role ?? "user", is_anonymous ?? false);
      return response.status(201).json({ status: "ok", data: { user, token }, message: null });
    } catch (error: any) {
      if (error.status) {
        return response.status(error.status).json({ status: "error", data: null, message: error.message });
      }
      next(error);
    }
  },

  login: async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body as { email?: string; password?: string };
    if (!email || !password) {
      return response.status(422).json({ status: "error", data: null, message: "email and password are required" });
    }

    try {
      const { user, token } = await authService.login(email, password);
      return response.status(200).json({ status: "ok", data: { user, token }, message: null });
    } catch (error: any) {
      if (error.status) {
        return response.status(error.status).json({ status: "error", data: null, message: error.message });
      }
      next(error);
    }
  },

  me: async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
    try {
      const user = await authService.getProfile(request.user!.id);
      return response.status(200).json({ status: "ok", data: user, message: null });
    } catch (error: any) {
      if (error.status) {
        return response.status(error.status).json({ status: "error", data: null, message: error.message });
      }
      next(error);
    }
  },

  faceLogin: async (request: Request, response: Response, next: NextFunction) => {
    const { email, face_image } = request.body as { email?: string; face_image?: string };
    if (!email || !face_image) {
      return response.status(422).json({ status: "error", data: null, message: "email and face_image are required" });
    }

    try {
      const { user, token, face_verified } = await authService.faceLogin(email);
      return response.status(200).json({ status: "ok", data: { user, token, face_verified }, message: null });
    } catch (error: any) {
      if (error.status) {
        return response.status(error.status).json({ status: "error", data: null, message: error.message });
      }
      next(error);
    }
  },
};
