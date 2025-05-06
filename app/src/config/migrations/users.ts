import db from "../database";

export async function up() {
  const exists = await db.schema.hasTable("users");

  if (!exists) {
    return db.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });
  }

  console.log("Users table already exists, skipping creation");
  return Promise.resolve();
}

export async function down() {
  return db.schema.dropTable("users");
}
