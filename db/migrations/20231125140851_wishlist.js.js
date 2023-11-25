    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.up = function (knex) {
        return knex.schema.createTable("wishlist", (table) => {
        table.increments("wishlist_id").primary(); // untuk buat ID
        table.integer("user_id").unsigned().references("user_id").inTable("user");
        table
            .integer("product_id")
            .unsigned()
            .references("product_id")
            .inTable("product");
        table.timestamp("created_at");
        table.timestamp("updated_at");
        });
    };
    
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.down = function (knex) {
        return knex.schema.dropTable("wishlist");
    };
    