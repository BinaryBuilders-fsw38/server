/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const currentDate = new Date();
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('admin').del()
  await knex('admin').insert([
    {
    username: 'admin2',
     password: '12345',
     created_at: currentDate,
     updated_at: currentDate,
    },

    {
    username: 'admin3',
    password: '12345',
    created_at: currentDate,
    updated_at: currentDate,
   },
  ]);
};
