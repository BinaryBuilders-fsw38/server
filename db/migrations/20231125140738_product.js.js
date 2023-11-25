    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.up = function (knex) {
        return knex.schema.createTable("product", (table) => {
        table.increments("product_id").primary(); // untuk buat ID
        table.string("product_name");
        table.text("description");
        table.string("brand");
        table.integer("price");
        table.integer("stock");
        table.integer("category_id");
        table.timestamp("created_at");
        table.timestamp("updated_at");
        });
    };
    
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.down = function (knex) {
        return knex.schema.dropTable("product");
    };
    