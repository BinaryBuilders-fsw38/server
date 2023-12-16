/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
        return knex.schema.createTable("article", (table) => {
        table.increments("article_id").primary();
        table.integer("admin_id").unsigned().references("admin_id").inTable("admin");
        table.string("title");
        table.text("contain");
        table.timestamp("created_at");
        table.timestamp("updated_at");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("article");
};
