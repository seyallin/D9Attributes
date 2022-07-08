'use strict'

const tap = require('tap');
const { Attribute } = require('../index');

tap.test('Rendering attribute(toString() method)', function(test) {
  test.plan(5)

  test.test('The attribute object without parameters should return the empty string.', function (test) {
    let attribute = new Attribute();
    test.equal(attribute.toString(), '');
    test.end();
  });

  test.test('Creating attribute with parameter as object should return string with those attributes.', function (test) {
    let attribute = new Attribute({
      class: ['one', 'two', 'three'],
      id: 'att-id'
    });
    test.equal(attribute.toString(), ' class="one two three" id="att-id"');
    test.end();
  });

  test.test('Creating attribute with parameter as array with object key - value should return string with those attributes.', function (test) {
    let attribute = new Attribute([
      {
        key: 'class',
        value: ['one', 'two', 'three']
      },
      {
        key: 'id',
        value: 'att-id'
      }
    ]);
    test.equal(attribute.toString(), ' class="one two three" id="att-id"');
    test.end();
  });

  test.test('Creating attribute with parameter as arrays (first elem is data key) should return string with those attributes.', function (test) {
    let attribute = new Attribute([
      ['class', 'one', 'two', 'three'],
      ['id', 'att-id']
    ]);
    test.equal(attribute.toString(), ' class="one two three" id="att-id"');
    test.end();
  });

  test.test('Creating attribute with parameter as arrays of two items:  first - key, second - value should return string with those attributes.', function (test) {
    let attribute = new Attribute([
      ['class', ['one', 'two', 'three']],
      ['id', 'att-id']
    ]);
    test.equal(attribute.toString(), ' class="one two three" id="att-id"');
    test.end();
  });
});