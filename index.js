const express = require('express');
const app = express();
const cart = [];

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

// app.get('/add-to-cart/:productName', function (req, res) {
  app.get('/add-to-cart', function (req, res) {
  // res.statusCode = 404;
  // res.end();
  console.log(JSON.stringify(req.query, null, 2));
  const productName = req.query['productName'];
  cart.push(productName);

  res.send(productName);
});

app.listen(3000);
