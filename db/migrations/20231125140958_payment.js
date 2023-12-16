    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.up = function (knex) {
        return knex.schema.createTable("payment", function (table) {
        table.increments("payment_id").primary();
        table.string("payment_method", 20).notNullable();
        table.string("payment_reference", 50).notNullable();
        table.integer("user_id").references("user_id").inTable("user");
        table.integer("checkout_id").references("checkout_id").inTable("checkout");
        table.decimal("amount", 10, 2).notNullable();
        table.string("status", 20).notNullable();
        table.timestamp("created_at");
        table.timestamp("updated_at");
        });
    };
    
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.down = function (knex) {
        return knex.schema.dropTableIfExists("payment");
    };
    