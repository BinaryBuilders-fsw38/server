    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.up = function (knex) {
        return knex.schema.createTable("user", (table) => {
        table.increments("user_id").primary(); // untuk buat ID
        table.string("nama");
        table.string("username");
        table.string("email");
        table.string("password");
        table.string("address");
        table.integer("phone_number");
        table.timestamp("created_at");
        table.timestamp("updated_at");
        });
    };
    
    /**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
    exports.down = function (knex) {
        return knex.schema.dropTable("user");
    };
    