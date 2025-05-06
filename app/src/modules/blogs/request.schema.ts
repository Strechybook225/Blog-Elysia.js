import { z } from "zod";

// Base schema for validation rules
const blogBase = {
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content cannot exceed 5000 characters"),
};

// Schema for creating a new blog post
export const createBlogSchema = z.object({
  ...blogBase,
  title: blogBase.title,
  content: blogBase.content,
});

// Schema for updating an existing blog post
export const updateBlogSchema = z
  .object({
    title: blogBase.title.optional(),
    content: blogBase.content.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// Schema for blog ID parameter
export const blogIdSchema = z.object({
  id: z.coerce.number().positive("ID must be a positive number"),
});

// Schema for user ID parameter
export const userIdSchema = z.object({
  userId: z.coerce.number().positive("User ID must be a positive number"),
});

// Type definitions for use in controllers
export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type BlogIdParam = z.infer<typeof blogIdSchema>;
export type UserIdParam = z.infer<typeof userIdSchema>;
