import { CreateBlogInput, UpdateBlogInput } from "./request.schema";
import { BlogService } from "./service";
import { Blog } from "./types";

export class Controller {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  async create({
    body,
    user,
  }: {
    body: CreateBlogInput;
    user: { userId: number };
  }) {
    // Use authenticated user's ID for the blog post
    const blogData = {
      ...body,
      user_id: user.userId,
    };

    const blog = await this.blogService.create(blogData as Blog);

    return {
      success: true,
      message: "Blog created successfully",
      blog,
    };
  }

  async findAll() {
    const blogs = await this.blogService.findAll();

    return {
      success: true,
      blogs,
    };
  }

  async findById({ params }: { params: { id: number } }) {
    const blog = await this.blogService.findById(params.id);

    if (!blog) {
      return {
        success: false,
        message: "Blog not found",
      };
    }

    return {
      success: true,
      blog,
    };
  }

  async findByUserId({ user }: { user: { userId: number } }) {
    // Use the authenticated user's ID
    const blogs = await this.blogService.findByUserId(user.userId);

    return {
      success: true,
      blogs,
    };
  }

  async update({
    params,
    body,
    user,
  }: {
    params: { id: number };
    body: UpdateBlogInput;
    user: { userId: number };
  }) {
    // First check if the blog belongs to the authenticated user
    const blog = await this.blogService.findById(params.id);

    if (!blog) {
      return {
        success: false,
        message: "Blog not found",
      };
    }

    if (blog.user_id !== user.userId) {
      return {
        success: false,
        message: "You don't have permission to update this blog",
      };
    }

    const updatedBlog = await this.blogService.update(params.id, body);

    return {
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    };
  }

  async delete({
    params,
    user,
  }: {
    params: { id: number };
    user: { userId: number };
  }) {
    // First check if the blog belongs to the authenticated user
    const blog = await this.blogService.findById(params.id);

    if (!blog) {
      return {
        success: false,
        message: "Blog not found",
      };
    }

    if (blog.user_id !== user.userId) {
      return {
        success: false,
        message: "You don't have permission to delete this blog",
      };
    }

    await this.blogService.delete(params.id);

    return {
      success: true,
      message: "Blog deleted successfully",
    };
  }
}
