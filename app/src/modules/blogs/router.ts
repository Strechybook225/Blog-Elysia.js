import { Elysia } from "elysia";
import { requireAuth } from "../../middlewares/auth.middleware";
import { Controller } from "./controller";
import {
  blogIdSchema,
  createBlogSchema,
  updateBlogSchema,
} from "./request.schema";

const controller = new Controller();

export const blogRouter = new Elysia({ prefix: "/blogs" })
  // Public routes - no authentication required
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
    params: blogIdSchema,
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

  // Protected routes - authentication required
  .use(requireAuth)
  .post("/", controller.create.bind(controller), {
    body: createBlogSchema,
    detail: {
      tags: ["Blogs"],
      summary: "Create a new blog post",
      description: "Creates a new blog post with the provided information",
      responses: {
        200: { description: "Blog post created successfully" },
        401: { description: "Authentication required" },
      },
    },
  })
  .get("/my-blogs", controller.findByUserId.bind(controller), {
    detail: {
      tags: ["Blogs"],
      summary: "Get current user's blog posts",
      description: "Retrieves all blog posts written by the authenticated user",
      responses: {
        200: { description: "User's blog posts retrieved successfully" },
        401: { description: "Authentication required" },
      },
    },
  })
  .put("/:id", controller.update.bind(controller), {
    params: blogIdSchema,
    body: updateBlogSchema,
    detail: {
      tags: ["Blogs"],
      summary: "Update blog post",
      description: "Updates an existing blog post's information",
      responses: {
        200: { description: "Blog post updated successfully" },
        401: { description: "Authentication required" },
        403: { description: "Permission denied" },
        404: { description: "Blog post not found" },
      },
    },
  })
  .delete("/:id", controller.delete.bind(controller), {
    params: blogIdSchema,
    detail: {
      tags: ["Blogs"],
      summary: "Delete blog post",
      description: "Deletes a blog post by its ID",
      responses: {
        200: { description: "Blog post deleted successfully" },
        401: { description: "Authentication required" },
        403: { description: "Permission denied" },
        404: { description: "Blog post not found" },
      },
    },
  });
