require('dotenv').config({path: './env/.env'})
const knex = require('knex')({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : process.env.POSTGRES_PASSWORD,
    database : 'e-commerce'
    }
});
let self = module.exports = {
    select: async function select(table, where) {
        try {
            const data = await knex.select('*').from(table).where(where)
            return data
        } catch (error) {
            console.error("Gagal mengambil data dari tabel:", error);
            throw error
        }
    },

    selectAll: async function(table) {
        const data =await knex.select('*').from(table)
        return data
    },
    
    insertUser: async function insert(table, data) {
        try {
            const post = await knex(table).insert(data).returning('id')
            return post
        } catch (error) {
            console.error("Gagal menyisipkan data ke dalam tabel:", error);
            throw error
        }
    },
    insert: async function insert(table, data) {
        try {
            const post = await knex(table).insert(data)
            return post
        } catch (error) {
            console.error("Gagal menyisipkan data ke dalam tabel:", error);
            throw error
        }
    },

    update: async function update(table, data, where) {
        try {
            const post = await knex(table).update(data).where(where)
            return post
        } catch (error) {
            console.error("Gagal mengupdate data dalam tabel:", error);
            throw error
        }
    },
    // Tambahkan delete on cascade (foreign key)
    delete:async function remove(table, criteria) {
        try {
        const deletedCount = await knex(table).where(criteria).del()
            return deletedCount
        } catch (error) {
        console.error("Gagal menghapus data dari tabel:", error);
            throw error
        }
    } 
}
