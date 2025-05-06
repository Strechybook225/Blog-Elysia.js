import db from "../database";

export async function up() {
  const exists = await db.schema.hasTable("blogs");

  if (!exists) {
    return db.schema.createTable("blogs", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("content").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    });
  }

  console.log("Blogs table already exists, skipping creation");
  return Promise.resolve();
}

export async function down() {
  return db.schema.dropTable("blogs");
}
