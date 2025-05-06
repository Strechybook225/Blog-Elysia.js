import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { BlogController } from "./modules/blogs/blog.controller";
import { UserController } from "./modules/users/user.controller";

const app = new Elysia()
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "Blog API Documentation",
          version: "1.0.0",
          description: "API documentation for Blog and User management",
        },
        tags: [
          { name: "Users", description: "User endpoints" },
          { name: "Blogs", description: "Blog endpoints" },
        ],
      },
    })
  )
  .use(new UserController().routes())
  .use(new BlogController().routes())
  .listen(3000);

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
