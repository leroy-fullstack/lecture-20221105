// - 아이디
// - 등록 일시
// - 상품 아이디
// - 상품 수량
const { v4: uuidv4 } = require('uuid');

class CartItem {
  constructor({ registeredAt, productId, productCount }) {
    this.id = uuidv4();
    this.registeredAt = registeredAt;
    this.productId = productId;
    this.productCount = productCount;
  }
}

// example
// const product = new Product({
//   name: 'test name',
//   category: 'food',
//   price: 100,
// });

// const cart = new Cart({
//   registeredAt: new Date(),
//   productId: product.id,
//   productCount: 1,
// });

// exports.default = {
//   CartItem,
// };

module.exports = {
  CartItem,
};
