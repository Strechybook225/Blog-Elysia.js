import db from "../database";

export async function up() {
  return db.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
}

export async function down() {
  return db.schema.dropTable("users");
}
