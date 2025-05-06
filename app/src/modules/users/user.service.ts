import db from "../../config/database";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

export class UserService {
  async create(user: User): Promise<User> {
    const [id] = await db("users").insert(user);
    return this.findById(id);
  }

  async findAll(): Promise<User[]> {
    return db("users").select("*");
  }

  async findById(id: number): Promise<User> {
    return db("users").where({ id }).first();
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await db("users").where({ id }).update(user);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await db("users").where({ id }).delete();
  }
}
