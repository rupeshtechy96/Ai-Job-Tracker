import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { AuthenticatedUserPayload } from "../types";

export function signToken(payload: AuthenticatedUserPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): AuthenticatedUserPayload {
  return jwt.verify(token, env.JWT_SECRET) as AuthenticatedUserPayload;
}