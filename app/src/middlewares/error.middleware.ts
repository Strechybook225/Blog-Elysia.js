import { Elysia } from "elysia";
import { ZodError } from "zod";

export const errorMiddleware = new Elysia().onError(({ code, error, set }) => {
  if (error instanceof ZodError) {
    set.status = 400;
    return {
      success: false,
      message: "Validation Error",
      errors: error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    };
  }

  if (code === "NOT_FOUND") {
    set.status = 404;
    return {
      success: false,
      message: "Resource not found",
    };
  }

  if (code === "UNAUTHORIZED") {
    set.status = 401;
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  if (code === "FORBIDDEN") {
    set.status = 403;
    return {
      success: false,
      message: "Forbidden access",
    };
  }

  // Default error response
  console.error("Unhandled error:", error);
  set.status = 500;
  return {
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? undefined : error.message,
  };
});
