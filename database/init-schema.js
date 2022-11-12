require('dotenv').config();

const createProductTable = require('./query-builder').schema.createProductTable;
const createCartItemTable =
  require('./query-builder').schema.createCartItemTable;

(async function () {
  try {
    console.info('before create table');
    await createProductTable();
    await createCartItemTable();
    console.info('after create table');
  } catch (e) {
    console.error('error found');
    console.error(e);
  }
})();
