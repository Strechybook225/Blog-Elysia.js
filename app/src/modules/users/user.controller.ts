import { Elysia, t } from "elysia";
import { User, UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public routes() {
    return new Elysia({ prefix: "/users" })
      .post("/", this.create.bind(this), {
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
            200: {
              description: "User created successfully",
            },
          },
        },
      })
      .get("/", this.findAll.bind(this), {
        detail: {
          tags: ["Users"],
          summary: "Get all users",
          description: "Retrieves a list of all users",
          responses: {
            200: {
              description: "List of users retrieved successfully",
            },
          },
        },
      })
      .get("/:id", this.findById.bind(this), {
        params: t.Object({
          id: t.Number(),
        }),
        detail: {
          tags: ["Users"],
          summary: "Get user by ID",
          description: "Retrieves a specific user by their ID",
          responses: {
            200: {
              description: "User retrieved successfully",
            },
            404: {
              description: "User not found",
            },
          },
        },
      })
      .put("/:id", this.update.bind(this), {
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
            200: {
              description: "User updated successfully",
            },
            404: {
              description: "User not found",
            },
          },
        },
      })
      .delete("/:id", this.delete.bind(this), {
        params: t.Object({
          id: t.Number(),
        }),
        detail: {
          tags: ["Users"],
          summary: "Delete user",
          description: "Deletes a user by their ID",
          responses: {
            200: {
              description: "User deleted successfully",
            },
            404: {
              description: "User not found",
            },
          },
        },
      });
  }

  private async create({ body }: { body: User }) {
    return this.userService.create(body);
  }

  private async findAll() {
    return this.userService.findAll();
  }

  private async findById({ params }: { params: { id: number } }) {
    return this.userService.findById(params.id);
  }

  private async update({
    params,
    body,
  }: {
    params: { id: number };
    body: Partial<User>;
  }) {
    return this.userService.update(params.id, body);
  }

  private async delete({ params }: { params: { id: number } }) {
    await this.userService.delete(params.id);
    return { message: "User deleted successfully" };
  }
}
