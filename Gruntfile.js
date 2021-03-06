/*
 * grunt-sitemaps
 * https://github.com/chager/grunt-sitemaps
 *
 * Copyright (c) 2014 Christian Hager
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

    // Configuration to be run (and then tested).
    sitemaps: {
      default:{
        options: {
          baseUrl: 'http://www.mysite.com/',
          contentRoot: 'test/fixtures/',
          dest: 'tmp/default/'
        },
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'test/fixtures/',
          src: ['**/*.{php,html}', '!exclude/**', '!priorities/**'] // Actual patterns to match
        }]
      },
      custom:{
        options: {
          baseUrl: 'http://www.mysite.com/',
          contentRoot: 'test/fixtures/',
          dest: 'tmp/custom/',
          removeFileExtensions: true,
          mapIndexFilesToFolders: false
        },
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'test/fixtures/',
          src: ['**/*.{php,html}', '!exclude/**', '!priorities/**'] // Actual patterns to match
        }]
      },
      priorities: {
        options: {
          baseUrl: 'http://www.mysite.com/',
          contentRoot: 'test/fixtures/',
          dest: 'tmp/priorities/',
          removeFileExtensions: true,
          mapIndexFilesToFolders: false,
          priority: '0.7',
          priorities: {
            'priorities/high': '1.0',
            'priorities/low': '0.3'
          }
        },
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'test/fixtures/',
          src: ['priorities/*.html'] // Actual patterns to match
        }]
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
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sitemaps', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
