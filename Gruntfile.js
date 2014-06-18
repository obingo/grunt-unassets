/*
 * grunt-unassets
 * https://github.com/xsbchen/grunt-unassets
 *
 * Copyright (c) 2014 Bingo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    copy: {
      default_options: {
        expand: true,
        cwd: 'test/fixtures/',
        src: ['**'],
        dest: 'tmp/default/'
      },
      root_options: {
        expand: true,
        cwd: 'test/fixtures/',
        src: ['**'],
        dest: 'tmp/root/'
      }
    },

    // Configuration to be run (and then tested).
    unassets: {
      default_options: {
        src: ['tmp/default/test.html', 'tmp/default/test.css'],
        dest: 'tmp/default/res/'
      },
      root_options: {
        options: {root: 'tmp/root/'},
        src: ['tmp/root/test.html', 'tmp/root/test.css'],
        dest: 'tmp/root/res/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'unassets', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
