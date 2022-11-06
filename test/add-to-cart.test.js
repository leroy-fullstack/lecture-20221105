var request = require('request');
var expect = require('chai').expect;
var assert = require('assert');

describe('Cart', function () {
  describe('add product', function () {
    it('should return product name when request is suceeded.', function (done) {
      request.get(
        'http://localhost:3000/product-list',
        function (err, res, body) {
          expect(res.statusCode).to.equal(200);
          const products = JSON.parse(res.body);
          expect(products.length).to.equal(1);
          console.log(res.body);

          request.get(
            `http://localhost:3000/add-to-cart?productId=${products[0].id}&productCount=1`,
            function (err, res, body) {
              expect(res.statusCode).to.equal(200);
              const productId = res.body;
              assert(productId, products[0].id);
              console.log(res.body);
              done();
            },
          );
        },
      );
    });
  });
});
