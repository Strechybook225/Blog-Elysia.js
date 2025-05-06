import { BlogService } from "./service";
import { Blog } from "./types";

export class Controller {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  async create({ body }: { body: Blog }) {
    return this.blogService.create(body);
  }

  async findAll() {
    return this.blogService.findAll();
  }

  async findById({ params }: { params: { id: number } }) {
    return this.blogService.findById(params.id);
  }

  async findByUserId({ params }: { params: { userId: number } }) {
    return this.blogService.findByUserId(params.userId);
  }

  async update({
    params,
    body,
  }: {
    params: { id: number };
    body: Partial<Blog>;
  }) {
    return this.blogService.update(params.id, body);
  }

  async delete({ params }: { params: { id: number } }) {
    await this.blogService.delete(params.id);
    return { message: "Blog deleted successfully" };
  }
}
