import { Elysia, t } from "elysia";
import { Controller } from "./controller";

const controller = new Controller();

export const blogRouter = new Elysia({ prefix: "/blogs" })
  .post("/", controller.create.bind(controller), {
    body: t.Object({
      title: t.String(),
      content: t.String(),
      user_id: t.Number(),
    }),
    detail: {
      tags: ["Blogs"],
      summary: "Create a new blog post",
      description: "Creates a new blog post with the provided information",
      responses: {
        200: { description: "Blog post created successfully" },
      },
    },
  })
  .get("/", controller.findAll.bind(controller), {
    detail: {
      tags: ["Blogs"],
      summary: "Get all blog posts",
      description: "Retrieves a list of all blog posts with author information",
      responses: {
        200: { description: "List of blog posts retrieved successfully" },
      },
    },
  })
  .get("/:id", controller.findById.bind(controller), {
    params: t.Object({ id: t.Number() }),
    detail: {
      tags: ["Blogs"],
      summary: "Get blog post by ID",
      description: "Retrieves a specific blog post by its ID",
      responses: {
        200: { description: "Blog post retrieved successfully" },
        404: { description: "Blog post not found" },
      },
    },
  })
  .get("/user/:userId", controller.findByUserId.bind(controller), {
    params: t.Object({ userId: t.Number() }),
    detail: {
      tags: ["Blogs"],
      summary: "Get blog posts by user ID",
      description: "Retrieves all blog posts written by a specific user",
      responses: {
        200: { description: "User's blog posts retrieved successfully" },
      },
    },
  })
  .put("/:id", controller.update.bind(controller), {
    params: t.Object({ id: t.Number() }),
    body: t.Object({
      title: t.Optional(t.String()),
      content: t.Optional(t.String()),
    }),
    detail: {
      tags: ["Blogs"],
      summary: "Update blog post",
      description: "Updates an existing blog post's information",
      responses: {
        200: { description: "Blog post updated successfully" },
        404: { description: "Blog post not found" },
      },
    },
  })
  .delete("/:id", controller.delete.bind(controller), {
    params: t.Object({ id: t.Number() }),
    detail: {
      tags: ["Blogs"],
      summary: "Delete blog post",
      description: "Deletes a blog post by its ID",
      responses: {
        200: { description: "Blog post deleted successfully" },
        404: { description: "Blog post not found" },
      },
    },
  });
