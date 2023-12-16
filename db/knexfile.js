// Update with your config settings.
require('dotenv').config({path: '../env/.env'})
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.CONNECTION_STRING,
      ssl: { rejectUnauthorized: false }
    // host : '127.0.0.1',
    // port : 5432,
    // user : 'postgres',
    // password : process.env.POSTGRES_PASSWORD,
    // database : process.env.DATABASE_NAME
    // }
    }
  }
};
