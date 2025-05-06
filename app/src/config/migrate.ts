import { up as blogsUp } from "./migrations/blogs";
import { up as refreshTokensUp } from "./migrations/refresh_tokens";
import { up as usersUp } from "./migrations/users";

async function migrate() {
  try {
    await usersUp();
    console.log("Users table created successfully");

    await blogsUp();
    console.log("Blogs table created successfully");

    await refreshTokensUp();
    console.log("Refresh tokens table created successfully");

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
