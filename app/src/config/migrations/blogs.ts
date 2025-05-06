import db from "../database";

export async function up() {
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

export async function down() {
  return db.schema.dropTable("blogs");
}
