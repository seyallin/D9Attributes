'use strict'

const tap = require('tap')
const { Attribute } = require('../index')

tap.test('Tests for checking CLass methods working', function(test) {
  test.plan(5)

  const attribute = new Attribute()

  test.test('One class adding(.addClass)', function (test) {
    attribute.addClass('first')
    test.equal(attribute.toString(), ' class="first"')
    test.end()
  });

  test.test('Multiple class adding by array(.addClass)', function (test) {
    attribute.addClass(['second', 'third', 'fourth'])
    test.equal(attribute.toString(), ' class="first second third fourth"');
    test.end();
  });

  test.test('Removing class testing(.removeClass)', function (test) {
    attribute.removeClass('second')
    test.equal(attribute.toString(), ' class="first third fourth"');
    test.end();
  });

  test.test('Exist class checking(.hasClass). First should be false, second - true', function (test) {
    test.equal(attribute.hasClass('second'), false);
    test.equal(attribute.hasClass('third'), true);
    test.end();
  });

  test.test('Getting class(.getClass)', function (test) {
    test.equal(attribute.getClass(), 'first third fourth');
    test.end();
  });
});