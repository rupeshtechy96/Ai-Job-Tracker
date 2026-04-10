import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { memoryDb } from "../repositories/memoryDb";
import { loginSchema, registerSchema } from "../validators/authValidators";
import { generateId, normalizeEmail } from "../utils/helpers";
import { signToken } from "../utils/jwt";
import type { User } from "../types";
import type { AuthenticatedRequest } from "../middleware/authMiddleware";

export async function register(req: Request, res: Response): Promise<void> {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input",
    });
    return;
  }

  const { name, email, password } = parsed.data;
  const normalizedEmail = normalizeEmail(email);

  const existingUser = memoryDb.findUserByEmail(normalizedEmail);

  if (existingUser) {
    res.status(409).json({
      success: false,
      message: "User already exists with this email",
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user: User = {
    id: generateId("user"),
    name,
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  memoryDb.createUser(user);

  const token = signToken({
    userId: user.id,
    email: user.email,
  });

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input",
    });
    return;
  }

  const { email, password } = parsed.data;
  const normalizedEmail = normalizeEmail(email);

  const user = memoryDb.findUserByEmail(normalizedEmail);

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorrect) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
    return;
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
  });

  res.json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
}

export async function getMe(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const user = memoryDb.findUserById(req.userId);

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
    return;
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
}