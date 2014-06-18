'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.unassets = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(6);

    test.equal(grunt.file.exists('tmp/default/res/js/unused.js'), false, 'remove unused.js');
    test.equal(grunt.file.exists('tmp/default/res/css/unused.css'), false, 'remove unused.css');
    test.equal(grunt.file.exists('tmp/default/res/images/unused.gif'), false, 'remove unused.gif');

    test.equal(grunt.file.exists('tmp/default/res/js/used.js'), false, 'save used.js');
    test.equal(grunt.file.exists('tmp/default/res/css/used.css'), true, 'save used.css');
    test.equal(grunt.file.exists('tmp/default/res/images/used.gif'), true, 'save used.gif');

    test.done();
  },
  root_options: function(test) {
    test.expect(6);

    test.equal(grunt.file.exists('tmp/root/res/js/unused.js'), false, 'remove unused.js');
    test.equal(grunt.file.exists('tmp/root/res/css/unused.css'), false, 'remove unused.css');
    test.equal(grunt.file.exists('tmp/root/res/images/unused.gif'), false, 'remove unused.gif');

    test.equal(grunt.file.exists('tmp/root/res/js/used.js'), true, 'save used.js');
    test.equal(grunt.file.exists('tmp/root/res/css/used.css'), true, 'save used.css');
    test.equal(grunt.file.exists('tmp/root/res/images/used.gif'), true, 'save used.gif');

    test.done();
  }
};
