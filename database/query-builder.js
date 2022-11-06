const knex = require('knex')({
  client: 'pg',
  //   connection: process.env.PG_CONNECTION_STRING,
  //   searchPath: ['knex', 'public'],
  connection: {
    host: '127.0.0.1',
    port: 5432,
    // user: '',
    password: '',
    database: 'myapp_test',
  },
});

try {
  // Create a table
  await knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('user_name');
    })
    // ...and another
    .createTable('accounts', (table) => {
      table.increments('id');
      table.string('account_name');
      table.integer('user_id').unsigned().references('users.id');
    });

  // Then query the table...
  const insertedRows = await knex('users').insert({ user_name: 'Tim' });

  // ...and using the insert id, insert into the other table.
  await knex('accounts').insert({
    account_name: 'knex',
    user_id: insertedRows[0],
  });

  // Query both of the rows.
  const selectedRows = await knex('users')
    .join('accounts', 'users.id', 'accounts.user_id')
    .select('users.user_name as user', 'accounts.account_name as account');

  // map over the results
  const enrichedRows = selectedRows.map((row) => ({ ...row, active: true }));

  // Finally, add a catch statement
} catch (e) {
  console.error(e);
}
