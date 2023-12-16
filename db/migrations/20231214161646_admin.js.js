/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
        return knex.schema.createTable("admin", (table) => {
        table.increments("admin_id").primary(); // untuk buat ID
        table.string("username");
        table.string("password");
        table.timestamp("created_at");
        table.timestamp("updated_at");
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("admin");
};
