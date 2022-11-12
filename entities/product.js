// - 아이디
// - 상품
// - 이름
// - 카테고리
// - 가격
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4, validate } = require('uuid');

const categories = ['food', 'shoes'];

function mapProduct(record) {
  const { id: _id, product_id: id, ...rest } = record;
  const productProps = { id, ...rest };
  return productProps;
}

class Product {
  constructor(props) {
    const { name, category, price } = props;

    // validate
    this.id = props?.id ?? uuidv4();
    this.name = name;
    this.category = category;
    this.price = typeof price === 'string' ? Number.parseInt(price, 10) : price;

    this.validate();
  }

  validate() {
    if (!this.name || typeof this.name !== 'string') {
      throw new Error();
    }
    if (
      typeof this.category !== 'string' ||
      !categories.includes(this.category)
    ) {
      throw new Error();
    }
    if (typeof this.price !== 'number' || this.price <= 0) {
      throw new Error();
    }
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
  mapProduct,
};
