import { Elysia } from "elysia";
import { Controller } from "./controller";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "./request.schema";

const controller = new Controller();

export const authRouter = new Elysia({ prefix: "/auth" })
  .post("/register", controller.register.bind(controller), {
    body: registerSchema,
    detail: {
      tags: ["Auth"],
      summary: "Register a new user",
      description:
        "Creates a new user account and returns authentication tokens",
      responses: {
        200: { description: "User registered successfully" },
        400: { description: "Validation error or duplicate user" },
      },
    },
  })
  .post("/login", controller.login.bind(controller), {
    body: loginSchema,
    detail: {
      tags: ["Auth"],
      summary: "Log in a user",
      description: "Authenticates a user and returns tokens",
      responses: {
        200: { description: "Login successful" },
        401: { description: "Invalid credentials" },
      },
    },
  })
  .post("/refresh", controller.refreshToken.bind(controller), {
    body: refreshTokenSchema,
    detail: {
      tags: ["Auth"],
      summary: "Refresh access token",
      description: "Issues a new access token using a valid refresh token",
      responses: {
        200: { description: "Token refreshed successfully" },
        401: { description: "Invalid or expired refresh token" },
      },
    },
  })
  .post("/logout", controller.logout.bind(controller), {
    body: refreshTokenSchema,
    detail: {
      tags: ["Auth"],
      summary: "Log out a user",
      description: "Invalidates the user's refresh token",
      responses: {
        200: { description: "Logged out successfully" },
      },
    },
  });
