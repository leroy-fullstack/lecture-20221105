const express = require('express');
const app = express();

const cart = [];
const CartItem = require('./entities/cart-item').CartItem;

const Product = require('./entities/product').Product;
const product = new Product({
  name: 'test name',
  category: 'food',
  price: 100,
});
const products = [product];

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/product-list', function (req, res) {
  res.send(JSON.stringify(products));
});

app.get('/product-detail', function (req, res) {
  const productId = req.query['productId'];
  if (!productId) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const product = products.find((item) => item.id === productId);

  if (!product) {
    res.statusCode = 404;
    res.end();
    return;
  }

  res.send(JSON.stringify(product));
});

app.get('/add-to-cart', function (req, res) {
  console.log(JSON.stringify(req.query, null, 2));
  const productId = req.query['productId'];
  const productCount = req.query['productCount'];

  const cartItem = new CartItem({
    registeredAt: new Date(),
    productId: productId,
    productCount: productCount,
  });

  cart.push(cartItem);

  res.send(productId);
});

app.listen(3000, () => console.log('app start to listen port 3000..'));
