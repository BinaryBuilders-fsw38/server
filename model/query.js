require("dotenv").config();
const knex = require("knex")({
  // Untuk Prod
  // client: "pg",
  // connection:
  //   "postgres://postgres.zmseibmoxyavlspvqljo:sembahsulton@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
  // use_env_variable: "DATABASE_URL",

  // Untuk Dev
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
  //ini untuk join tabel lebih dari satu
  join: async function join(tables, columns, where) {
    try {
      let query = knex.select("*").from(tables[0]);
      for (let i = 1; i < tables.length; i++) {
        query = query.join(tables[i], columns[i - 1][0], columns[i - 1][1]);
      }
      const data = await Promise.race([query.where(where)]);
      return data;
    } catch (error) {
      console.error("Gagal melakukan join tabel:", error);
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

  insertUser: async function insert(table, data) {
    try {
      const post = await knex(table).insert(data).returning("user_id");
      return post;
    } catch (error) {
      console.error("Gagal menyisipkan data ke dalam tabel:", error);
      throw error;
    }
  },

  //untuk mengambil semua brand unik dari tabel produk
  selectDistinct: async function (table, column) {
    try {
      const data = await knex(table).distinct(column);
      return data;
    } catch (error) {
      console.error(
        `Gagal mengambil data unik dari kolom ${column} di tabel ${table}:`,
        error
      );
      throw error;
    }
  },
  //join table
  leftJoin: async function select(
    mainTable,
    joinTable,
    mainColumn,
    joinColumn,
    where = {}
  ) {
    try {
      const data = await knex(mainTable)
        .select(`${mainTable}.*`, `${joinTable}.*`)
        .leftJoin(
          joinTable,
          `${mainTable}.${mainColumn}`,
          `${joinTable}.${joinColumn}`
        )
        .where(where);
      return data;
    } catch (error) {
      console.error("Gagal melakukan left join:", error);
      throw error;
    }
  },

  selectColumns: async function selectColumns(table, conditions, columns) {
    try {
      const data = await knex(table).select(columns).where(conditions);
      return data;
    } catch (error) {
      console.error(`Gagal mengambil data dari tabel ${table}:`, error);
      throw error;
    }
  },
});
