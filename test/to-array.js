'use strict'

const tap = require('tap');
const { Attribute } = require('../index');

tap.test('Get array attribute(toArray() method) return object with key -> value type where values is array and key is object parameter.', function(test) {
  test.plan(5)
  const expect = {
    class: ['one', 'two', 'three'],
    id: ['att-id'],
    rel: []
  }
  test.test('1. The attribute object without parameters should return the empty object.', function (test) {
    let attribute = new Attribute();
    test.same(attribute.toArray(), {});
    test.end();
  });

  test.test('2. TCreating attribute with parameter as object should return string with those attributes.', function (test) {
    let attribute = new Attribute({
      class: ['one', 'two', 'three'],
      id: 'att-id',
      rel: null
    });
    test.same(attribute.toArray(), expect);
    test.end();
  });

  test.test('3. TCreating attribute with parameter as array with object key - value should return string with those attributes.', function (test) {
    let attribute = new Attribute([
      {
        key: 'class',
        value: ['one', 'two', 'three']
      },
      {
        key: 'id',
        value: 'att-id'
      },
      {
        key: 'rel',
      }
    ]);
    test.same(attribute.toArray(), expect);
    test.end();
  });

  test.test('4. TCreating attribute with parameter as arrays (first elem is data key) should return string with those attributes.', function (test) {
    let attribute = new Attribute([
      ['class', 'one', 'two', 'three'],
      ['id', 'att-id'],
      ['rel']
    ]);
    test.same(attribute.toArray(), expect);
    test.end();
  });

  test.test('5. TCreating attribute with parameter as arrays of two items:  first - key, second - value should return string with those attributes.', function (test) {
    let attribute = new Attribute([
      ['class', ['one', 'two', 'three']],
      ['id', 'att-id'],
      ['rel']
    ]);
    test.same(attribute.toArray(), expect);
    test.end();
  });
});