require('dotenv').config();
//repository layer

const knex = require('knex')({
  client: 'pg',
  connection: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

const createProductTable = async () => {
  // Create a table
  await knex.schema.createTable('products', (table) => {
    console.info('before call table method');
    table.increments('id');
    table.string('product_id');
    table.string('name');
    table.string('category');
    table.integer('price');
    console.info('after call table method');
  });
};

const createCartItemTable = async () => {
  // Create a table
  await knex.schema.createTable('cart_items', (table) => {
    console.info('before call table method');
    table.increments('id');
    table.string('cart_item_id');
    table.datetime('registered_at');
    table.string('product_id');
    table.integer('product_count');
    console.info('after call table method');
  });
};

// try {
//   // Create a table
//   await knex.schema
//     .createTable('users', (table) => {
//       table.increments('id');
//       table.string('user_name');
//     })
//     // ...and another
//     .createTable('accounts', (table) => {
//       table.increments('id');
//       table.string('account_name');
//       table.integer('user_id').unsigned().references('users.id');
//     });

//   // Then query the table...
//   const insertedRows = await knex('users').insert({ user_name: 'Tim' });

//   // ...and using the insert id, insert into the other table.
//   await knex('accounts').insert({
//     account_name: 'knex',
//     user_id: insertedRows[0],
//   });

//   // Query both of the rows.
//   const selectedRows = await knex('users')
//     .join('accounts', 'users.id', 'accounts.user_id')
//     .select('users.user_name as user', 'accounts.account_name as account');

//   // map over the results
//   const enrichedRows = selectedRows.map((row) => ({ ...row, active: true }));

//   // Finally, add a catch statement
// } catch (e) {
//   console.error(e);
// }

const createProduct = async (product) => {
  const { id: product_id, ...rest } = product;
  const toCreate = { product_id, ...rest };
  console.info(JSON.stringify(toCreate, undefined, 2));
  const insertedCount = await knex('products').insert(toCreate);
  return insertedCount;
};

const getProductList = async () => {
  const selectedRows = await knex('products').select();
  return selectedRows;
};

const getProductDetail = async (productId) => {
  const selectedRows = await knex('products').where({ product_id: productId });
  return selectedRows;
};

const addToCart = async () => {
  // TODO: implement method
  throw new Error();

  // const selectedRows = await knex('products').select();
  // return selectedRows;
};

module.exports = {
  schema: { createProductTable, createCartItemTable },
  getProductList,
  getProductDetail,
  addToCart,
  createProduct,
};
