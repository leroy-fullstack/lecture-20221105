// - 아이디
// - 상품
// - 이름
// - 카테고리
// - 가격
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');

class Product {
  constructor({ name, category, price }) {
    this.id = uuidv4();
    this.name = name;
    this.category = category;
    this.price = price;
  }
}

// example
const product = new Product({
  name: 'test name',
  category: 'food',
  price: 100,
});

// exports.default = {
//   Product: Product,
// };

module.exports = {
  Product,
};
