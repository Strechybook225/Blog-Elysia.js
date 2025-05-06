import { z } from "zod";

// Schema for user registration
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    ),

  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email cannot exceed 100 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
});

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Schema for refresh token
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

// Type definitions for use in controllers
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
