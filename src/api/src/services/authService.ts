import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";
import { JWT_SECRET, SALT_ROUNDS } from "../config/env";
import type { User } from "../types";

export const authService = {
  register: async (
    name: string,
    email: string,
    phone: string,
    password: string,
    role: string,
    isAnonymous: boolean
  ) => {
    const existing = await userRepository.findByEmailOrPhone(email, phone);
    if (existing.length > 0) {
      throw { status: 409, message: "Email or phone already registered" };
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userRepository.create(name, email, phone, passwordHash, role, isAnonymous);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, is_anonymous: user.is_anonymous },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { user, token };
  },

  login: async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user || !user.password_hash) {
      throw { status: 401, message: "Invalid credentials" };
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw { status: 401, message: "Invalid credentials" };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, is_anonymous: user.is_anonymous ?? false },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_anonymous: user.is_anonymous ?? false,
      },
      token,
    };
  },

  getProfile: async (userId: number) => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    return user;
  },

  faceLogin: async (email: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw { status: 401, message: "User not found" };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, is_anonymous: user.is_anonymous ?? false },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { user, token, face_verified: true };
  },
};
