import { Elysia, t } from "elysia";
import { Controller } from "./controller";

const controller = new Controller();

export const userRouter = new Elysia({ prefix: "/users" })
  .post("/", controller.create.bind(controller), {
    body: t.Object({
      username: t.String(),
      email: t.String(),
      password: t.String(),
    }),
    detail: {
      tags: ["Users"],
      summary: "Create a new user",
      description: "Creates a new user with the provided information",
      responses: {
        200: { description: "User created successfully" },
      },
    },
  })
  .get("/", controller.findAll.bind(controller), {
    detail: {
      tags: ["Users"],
      summary: "Get all users",
      description: "Retrieves a list of all users",
      responses: {
        200: { description: "List of users retrieved successfully" },
      },
    },
  })
  .get("/:id", controller.findById.bind(controller), {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      tags: ["Users"],
      summary: "Get user by ID",
      description: "Retrieves a specific user by their ID",
      responses: {
        200: { description: "User retrieved successfully" },
        404: { description: "User not found" },
      },
    },
  })
  .put("/:id", controller.update.bind(controller), {
    params: t.Object({
      id: t.Number(),
    }),
    body: t.Object({
      username: t.Optional(t.String()),
      email: t.Optional(t.String()),
      password: t.Optional(t.String()),
    }),
    detail: {
      tags: ["Users"],
      summary: "Update user",
      description: "Updates an existing user's information",
      responses: {
        200: { description: "User updated successfully" },
        404: { description: "User not found" },
      },
    },
  })
  .delete("/:id", controller.delete.bind(controller), {
    params: t.Object({
      id: t.Number(),
    }),
    detail: {
      tags: ["Users"],
      summary: "Delete user",
      description: "Deletes a user by their ID",
      responses: {
        200: { description: "User deleted successfully" },
        404: { description: "User not found" },
      },
    },
  });
