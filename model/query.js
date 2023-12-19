require("dotenv").config({ path: "./env/.env" });
const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  },
});

let self = (module.exports = {
  select: async function select(table, where) {
    try {
      const data = await Promise.race([
        knex.select("*").from(table).where(where),
      ]);
      return data;
    } catch (error) {
      console.error("Gagal mengambil data dari tabel:", error);
      throw error;
    }
  },

  insert: async function insert(table, data) {
    try {
      const post = await Promise.race([knex(table).insert(data)]);
      return post;
    } catch (error) {
      console.error("Gagal menyisipkan data ke dalam tabel:", error);
      throw error;
    }
  },

  insertUser: async function insertUser(table, data) {
    try {
      const post = await Promise.race([
        knex(table).insert(data).returning("id"),
      ]);
      return post;
    } catch (error) {
      console.error("Gagal menyisipkan data ke dalam tabel:", error);
      throw error;
    }
  },

  update: async function update(table, data, where) {
    try {
      const post = await Promise.race([knex(table).update(data).where(where)]);
      return post;
    } catch (error) {
      console.error("Gagal mengupdate data dalam tabel:", error);
      throw error;
    }
  },

  delete: async function remove(table, criteria) {
    try {
      const deletedCount = await Promise.race([
        knex(table).where(criteria).del(),
      ]);
      return deletedCount;
    } catch (error) {
      console.error("Gagal menghapus data dari tabel:", error);
      throw error;
    }
  },

  selectAll: async function select(table) {
    try {
      const data = await Promise.race([knex(table).select("*")]);
      return data;
    } catch (error) {
      console.error("Gagal get data user dari tabel:", error);
      throw error;
    }
  },
});
