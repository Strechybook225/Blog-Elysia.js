import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { blogRouter } from "./modules/blogs/router";
import { userRouter } from "./modules/users/router";

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
  .use(userRouter)
  .use(blogRouter)
  .listen(3000);

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
