import db from "../database";

export async function up() {
  const exists = await db.schema.hasTable("refresh_tokens");

  if (!exists) {
    await db.schema.createTable("refresh_tokens", (table) => {
      table.increments("id").primary();
      table.string("token", 255).notNullable().unique();
      table.integer("user_id").unsigned().notNullable();
      table.datetime("expires_at").notNullable();
      table.datetime("created_at").defaultTo(db.fn.now());

      // Foreign key reference to users table
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");

      // Add indexes
      table.index("token");
      table.index("user_id");
      table.index("expires_at");
    });
  }
}
