    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.up = function (knex) {
        return knex.schema.createTable("checkout", (table) => {
        table.increments("checkout_id").primary(); // untuk buat ID
        table.integer("total_price", 10, 2).notNullable();
        table.integer("user_id").unsigned().references("user_id").inTable("user");
        table.integer("cart_id").unsigned().references("cart_id").inTable("cart");
        table.timestamp("created_at");
        table.timestamp("updated_at");
        table.string("shipment_method", 20);
        table
            .string("shipment_status", 20)
            .notNullable()
            .defaultTo("Belum Dikirim");
        table.string("payment_status", 20).notNullable().defaultTo("Unpaid");
        table.string("tracking_number", 50);
        });
    };
    
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.down = function (knex) {
        return knex.schema.dropTable("checkout");
    };
    