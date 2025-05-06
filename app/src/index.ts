import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { authRouter } from "./modules/auth/router";
import { blogRouter } from "./modules/blogs/router";
import { userRouter } from "./modules/users/router";

const app = new Elysia()
  .use(errorMiddleware)
  .use(authMiddleware)

  // Swagger documentation
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
          { name: "Auth", description: "Authentication endpoints" },
          { name: "Users", description: "User endpoints" },
          { name: "Blogs", description: "Blog endpoints" },
        ],
      },
    })
  )

  .use(authRouter)
  .use(userRouter)
  .use(blogRouter)

  // Start server
  .listen(3000);

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
