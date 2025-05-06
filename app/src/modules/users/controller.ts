import { UserService } from "./service";
import { User } from "./types";

export class Controller {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create({ body }: { body: User }) {
    return this.userService.create(body);
  }

  async findAll() {
    return this.userService.findAll();
  }

  async findById({ params }: { params: { id: number } }) {
    return this.userService.findById(params.id);
  }

  async update({
    params,
    body,
  }: {
    params: { id: number };
    body: Partial<User>;
  }) {
    return this.userService.update(params.id, body);
  }

  async delete({ params }: { params: { id: number } }) {
    await this.userService.delete(params.id);
    return { message: "User deleted successfully" };
  }
}
