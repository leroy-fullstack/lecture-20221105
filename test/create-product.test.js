require('dotenv').config();
var request = require('request');
var expect = require('chai').expect;
var assert = require('assert');

describe('Product', function () {
  describe('create', function () {
    it('should return response code 201 when request is suceeded.', function (done) {
      request.post(
        {
          headers: {
            'Content-Type': 'application/json',
          },
          url: 'http://localhost:3000/product',
          form: {
            name: 'test name',
            category: 'food',
            price: 100,
          },
        },
        function (err, res, body) {
          console.log(JSON.stringify(res, undefined, 2));
          expect(res.statusCode).to.equal(201);
          // const products = JSON.parse(res.body);
          // expect(products.length).to.equal(1);

          done();
        },
      );
    });
  });
});
