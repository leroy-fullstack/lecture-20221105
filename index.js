require('dotenv').config();
const bodyParser = require('body-parser');
// console.log(process.env);

const express = require('express');
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const knexClient = require('./database/query-builder');

const cart = [];
const CartItem = require('./entities/cart-item').CartItem;

const Product = require('./entities/product').Product;
const mapProduct = require('./entities/product').mapProduct;

const product = new Product({
  name: 'test name',
  category: 'food',
  price: 100,
});
const products = [product];

app.get('/', function (req, res) {
  res.send('Hello World');
});

const defaultCountPerPage = 10;
const defaultCurrentPage = 1;

app.get('/product-list', async function (req, res) {
  // 페이지 당 표시할 상품 개수
  const countPerPage = parseIntFromQuery(req.query?.countPerPage, defaultCountPerPage);
  // 현재 페이지
  const currentPage = parseIntFromQuery(req.query?.currentPage, defaultCurrentPage);

  const queryResult = await knexClient.getProductList(countPerPage, currentPage);
  console.info('/product-list', JSON.stringify(queryResult, undefined, 2));

  const productList = queryResult.map((record) => {
    const productProps = mapProduct(record);

    return new Product(productProps);
  });

  res.send(JSON.stringify(productList));
});

app.get('/product-detail', async function (req, res) {
  const productId = req.query['productId'];
  if (!productId) {
    handleError(res);
    return;
  }

  const queryResult = await knexClient.getProductDetail(productId);
  if (!Array.isArray(queryResult) || queryResult.length !== 1) {
    res.statusCode = 404;
    res.end();
    return;
  }

  const productProps = mapProduct(queryResult.at(0));
  const product = new Product(productProps);
  // const product = products.find((item) => item.id === productId);

  if (!product) {
    res.statusCode = 404;
    res.end();
    return;
  }

  res.send(JSON.stringify(product));
});

app.get('/add-to-cart', async function (req, res) {
  console.log(JSON.stringify(req.query, null, 2));
  const productId = req.query['productId'];
  const productCount = req.query['productCount'];

  const cartItem = new CartItem({
    registeredAt: new Date(),
    productId: productId,
    productCount: productCount,
  });

  const queryResult = await knexClient.addToCart(cartItem);
  // cart.push(cartItem);

  if (!queryResult) {
    res.statusCode = 500;
    res.end();
    return;
  }

  res.send(productId);
});

app.post('/product', async (req, res) => {
  // console.info(JSON.stringify(req.params, undefined, 2));
  console.info('/product', JSON.stringify(req.body, undefined, 2));
  try {
    const product = new Product(req.body);
    const queryResult = await knexClient.createProduct(product);

    if (!queryResult) {
      res.statusCode = 500;
      res.end();
      return;
    }

    res.statusCode = 201;
    res.send(JSON.stringify(product));
  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    res.end();
    return;
  }
});

app.listen(3000, () => console.log('app start to listen port 3000..'));

function handleError(res) {
  res.statusCode = 400;
  res.end();
}

function parseIntFromQuery(queryName, defaultValue) {
  if (!queryName) {
    return defaultValue;
  }
  const intValue = Number.parseInt(queryName, 10);
  return Number.isNaN(intValue) ? defaultValue : intValue;
}