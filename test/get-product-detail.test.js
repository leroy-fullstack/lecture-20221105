var request = require('request');
var expect = require('chai').expect;

var assert = require('assert');
describe('Product', function () {
  describe('Get detail', function () {
    it('should return item with name property when requested.', function (done) {
      request.get(
        'http://localhost:3000/product-list',
        function (err, res, body) {
          expect(res.statusCode).to.equal(200);
          const products = JSON.parse(res.body);
          expect(products.length).to.equal(1);
          console.log(res.body);

          request.get(
            `http://localhost:3000/product-detail?productId=${products[0].id}`,
            function (err, res, body) {
              expect(res.statusCode).to.equal(200);
              const product = JSON.parse(res.body);
              assert(product.id, products[0].id);
              console.log(res.body);
              done();
            },
          );
        },
      );
    });
  });
});
