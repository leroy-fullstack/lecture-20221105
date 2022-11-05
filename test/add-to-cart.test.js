var request = require('request');
var expect = require('chai').expect;
var assert = require('assert');

describe('Cart', function () {
  describe('add product', function () {
    it('should return product name when request is suceeded.', function (done) {
      request.get(
        'http://localhost:3000/add-to-cart/testName',
        function (err, res, body) {
          expect(res.statusCode).to.equal(200);
          const productName = res.body;
          assert(productName, 'testName');
          done();
        },
      );
    });
  });
});
