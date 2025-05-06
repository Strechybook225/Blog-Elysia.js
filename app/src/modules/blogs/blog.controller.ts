import { Elysia, t } from "elysia";
import { Blog, BlogService } from "./blog.service";

export class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  public routes() {
    return new Elysia({ prefix: "/blogs" })
      .post("/", this.create.bind(this), {
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
            200: {
              description: "Blog post created successfully",
            },
          },
        },
      })
      .get("/", this.findAll.bind(this), {
        detail: {
          tags: ["Blogs"],
          summary: "Get all blog posts",
          description:
            "Retrieves a list of all blog posts with author information",
          responses: {
            200: {
              description: "List of blog posts retrieved successfully",
            },
          },
        },
      })
      .get("/:id", this.findById.bind(this), {
        params: t.Object({
          id: t.Number(),
        }),
        detail: {
          tags: ["Blogs"],
          summary: "Get blog post by ID",
          description: "Retrieves a specific blog post by its ID",
          responses: {
            200: {
              description: "Blog post retrieved successfully",
            },
            404: {
              description: "Blog post not found",
            },
          },
        },
      })
      .get("/user/:userId", this.findByUserId.bind(this), {
        params: t.Object({
          userId: t.Number(),
        }),
        detail: {
          tags: ["Blogs"],
          summary: "Get blog posts by user ID",
          description: "Retrieves all blog posts written by a specific user",
          responses: {
            200: {
              description: "User's blog posts retrieved successfully",
            },
          },
        },
      })
      .put("/:id", this.update.bind(this), {
        params: t.Object({
          id: t.Number(),
        }),
        body: t.Object({
          title: t.Optional(t.String()),
          content: t.Optional(t.String()),
        }),
        detail: {
          tags: ["Blogs"],
          summary: "Update blog post",
          description: "Updates an existing blog post's information",
          responses: {
            200: {
              description: "Blog post updated successfully",
            },
            404: {
              description: "Blog post not found",
            },
          },
        },
      })
      .delete("/:id", this.delete.bind(this), {
        params: t.Object({
          id: t.Number(),
        }),
        detail: {
          tags: ["Blogs"],
          summary: "Delete blog post",
          description: "Deletes a blog post by its ID",
          responses: {
            200: {
              description: "Blog post deleted successfully",
            },
            404: {
              description: "Blog post not found",
            },
          },
        },
      });
  }

  private async create({ body }: { body: Blog }) {
    return this.blogService.create(body);
  }

  private async findAll() {
    return this.blogService.findAll();
  }

  private async findById({ params }: { params: { id: number } }) {
    return this.blogService.findById(params.id);
  }

  private async findByUserId({ params }: { params: { userId: number } }) {
    return this.blogService.findByUserId(params.userId);
  }

  private async update({
    params,
    body,
  }: {
    params: { id: number };
    body: Partial<Blog>;
  }) {
    return this.blogService.update(params.id, body);
  }

  private async delete({ params }: { params: { id: number } }) {
    await this.blogService.delete(params.id);
    return { message: "Blog deleted successfully" };
  }
}
