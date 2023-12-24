/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("review", (table) => {
    table.increments("review_id").primary();
    table.integer("user_id").unsigned().references("user_id").inTable("user");
    table
      .integer("product_id")
      .unsigned()
      .references("product_id")
      .inTable("product");
    table.text("comment");
    table.integer("score");
    table.timestamp("created_at");
    table.timestamp("updated_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("review");
};
