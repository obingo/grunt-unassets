/*
 * grunt-unassets
 * https://github.com/xsbchen/grunt-unassets
 *
 * Copyright (c) 2014 Bingo
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('unassets', 'clean unused assets', function() {
    var _ = grunt.util._;
    var regex = /(?:href|src)="(?!(?:http|#|\s|"))([^"]+)"|url\(([^)]+)\)/ig;

    this.files.forEach(function(filePair) {
      var usedAssets = getUsedAssets(filePair.src);
      var allAssets = getAllAssets(filePair.dest);

      var unusedAssets = _.difference(allAssets, usedAssets);
      unusedAssets.forEach(function(filePath) {
        var relativePath = path.relative(process.cwd(), filePath);
        grunt.log.writeln('Removed unused file ' + relativePath.cyan);
        grunt.file.delete(filePath);
      });
    });

    function getUsedAssets(src) {
      var links = [];
      src.filter(function(filePath) {
        return grunt.file.isFile(filePath);
      }).forEach(function(filePath) {
        var content = grunt.file.read(filePath);
        var cwd = path.dirname(filePath);
        var result;
        regex.lastIndex = 0;
        while ((result = regex.exec(content)) !== null) {
          var file = path.resolve(cwd, result[1] || result[2]);
          links.push(file);
        }
      });

      return links.filter(function(filePath) {
        return grunt.file.exists(filePath);
      });
    }

    function getAllAssets(src, options) {
      if (grunt.file.isDir(src)) {
        return grunt.file.expand({
          filter: 'isFile',
          cwd: src
        }, ['**/*']).map(function(file) {return path.resolve(src, file);});
      }

      return grunt.file.isFile(src) ? [src] : [];
    }
  });
};