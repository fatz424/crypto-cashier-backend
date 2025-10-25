const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: './data.db' },
  useNullAsDefault: true
});

async function init() {
  await knex.schema.hasTable('merchants').then(async (exists) => {
    if (!exists) {
      await knex.schema.createTable('merchants', (t) => {
        t.increments('id').primary();
        t.string('name');
        t.string('email');
        t.string('api_key');
        t.boolean('active').defaultTo(true);
        t.timestamps(true, true);
      });
    }
  });

  await knex.schema.hasTable('invoices').then(async (exists) => {
    if (!exists) {
      await knex.schema.createTable('invoices', (t) => {
        t.increments('id').primary();
        t.string('invoice_id').unique();
        t.integer('merchant_id').references('id').inTable('merchants');
        t.float('amount_usd');
        t.string('crypto_currency');
        t.float('crypto_amount');
        t.string('status');
        t.string('crypto_address');
        t.string('exchange');
        t.timestamps(true, true);
      });
    }
  });
}

module.exports = { knex, init };
