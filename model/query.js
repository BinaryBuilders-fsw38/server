require('dotenv').config({path: './env/.env'})
const knex = require('knex')({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : process.env.POSTGRES_PASSWORD,
    database : 'E-COMERCE'
    }
}) 

const TIMEOUT_DURATION = 10000
const TIMEOUT_DEADLINE = 60000

let self = (module.exports = {
  select: async function select(table, where) {
    try {
      const data = await Promise.race([
        knex.select("*").from(table).where(where),
        timeout({
          response: TIMEOUT_DURATION,
          deadline: TIMEOUT_DEADLINE
        })
      ]);
      return data;
    } catch (error) {
      console.error("Gagal mengambil data dari tabel:", error);
      throw error;
    }
  },

  insert: async function insert(table, data) {
    try {
      const post = await Promise.race([
        knex(table).insert(data),
        timeout({
          response: TIMEOUT_DURATION,
          deadline: TIMEOUT_DEADLINE
        })
      ]);
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
        timeout({
          response: TIMEOUT_DURATION,
          deadline: TIMEOUT_DEADLINE
        })
      ]);
      return post;
    } catch (error) {
      console.error("Gagal menyisipkan data ke dalam tabel:", error);
      throw error;
    }
  },

  update: async function update(table, data, where) {
    try {
      const post = await Promise.race([
        knex(table).update(data).where(where),
        timeout({
          response: TIMEOUT_DURATION,
          deadline: TIMEOUT_DEADLINE
        })
      ]);
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
        timeout({
          response: TIMEOUT_DURATION,
          deadline: TIMEOUT_DEADLINE
        })
      ]);
      return deletedCount;
    } catch (error) {
      console.error("Gagal menghapus data dari tabel:", error);
      throw error;
    }
  },
})

function timeout({ response, deadline }) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timeout')), deadline)
  )
}
