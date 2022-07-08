'use strict'

const tap = require('tap')
const { Attribute } = require('../index')

tap.test('Tests for checking Attributes methods working', function(test) {
  test.plan(5)

  const attribute = new Attribute()

  test.test('One attribute adding(.setAttribute)', function (test) {
    attribute.setAttribute('href', "#")
    test.equal(attribute.toString(), ' href="#"')
    test.end()
  });

  test.test('The attribute adding with multiple values(.setAttribute)', function (test) {
    attribute.setAttribute('class', ['first', 'second', 'third', 'fourth'])
    test.equal(attribute.toString(), ' href="#" class="first second third fourth"');
    test.end();
  });

  test.test('Removing attribute(.removeAttribute)', function (test) {
    attribute.removeAttribute('class')
    test.equal(attribute.toString(), ' href="#"');
    test.end();
  });

  test.test('The attributes exist(.hasAttribute). First shold be true, second - false.', function (test) {
    test.equal(attribute.hasAttribute('href'), true);
    test.not(attribute.hasAttribute('class'), true);
    test.end();
  });

  test.test('Get attribute value by key parameter(attribute.key)', function (test) {
    test.equal(attribute.href, '#');
    test.end();
  });
});