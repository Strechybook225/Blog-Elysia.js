import db from "../../config/database";

export interface Blog {
  id?: number;
  title: string;
  content: string;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export class BlogService {
  async create(blog: Blog): Promise<Blog> {
    const [id] = await db("blogs").insert(blog);
    return this.findById(id);
  }

  async findAll(): Promise<Blog[]> {
    return db("blogs")
      .select("blogs.*", "users.username as author")
      .join("users", "blogs.user_id", "users.id");
  }

  async findById(id: number): Promise<Blog> {
    return db("blogs")
      .select("blogs.*", "users.username as author")
      .join("users", "blogs.user_id", "users.id")
      .where("blogs.id", id)
      .first();
  }

  async findByUserId(userId: number): Promise<Blog[]> {
    return db("blogs")
      .select("blogs.*", "users.username as author")
      .join("users", "blogs.user_id", "users.id")
      .where("blogs.user_id", userId);
  }

  async update(id: number, blog: Partial<Blog>): Promise<Blog> {
    await db("blogs").where({ id }).update(blog);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await db("blogs").where({ id }).delete();
  }
}
