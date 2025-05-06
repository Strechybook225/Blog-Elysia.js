import { z } from "zod";

const userBase = {
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
};

// Schema for user registration
export const registerUserSchema = z.object({
  username: userBase.username,
  email: userBase.email,
  password: userBase.password,
});

// Schema for user login
export const loginUserSchema = z.object({
  email: userBase.email,
  password: z.string().min(1, "Password is required"),
});

// Schema for updating a user
export const updateUserSchema = z
  .object({
    username: userBase.username.optional(),
    email: userBase.email.optional(),
    password: userBase.password.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// Schema for user ID parameter
export const userIdSchema = z.object({
  id: z.coerce.number().positive("ID must be a positive number"),
});

// Type definitions for use in controllers
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdParam = z.infer<typeof userIdSchema>;
