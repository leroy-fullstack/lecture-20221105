const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/product-list', function (req, res) {
  const products = [{ name: 'test name' }];
  res.send(JSON.stringify(products));
});

app.get('/product-detail', function (req, res) {
  // res.statusCode = 404;
  // res.end();
  const product = { name: 'test name' };
  res.send(JSON.stringify(product));
});

app.listen(3000);
