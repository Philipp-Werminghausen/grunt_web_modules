/*
 * grunt_web_modules
 * https://github.com/Philipp-Werminghausen/grunt_web_modules
 *
 * Copyright (c) 2015 Philipp Werminghausen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.initConfig({
    moduleDirBase: '.',
    module: grunt.option('module') || '',
    // Unit tests.
    create_module: {
      blah: {
        options: {
        },
        files: {
          '<%= moduleDirBase %>': [
            {
              'name':'js',
              'contents':[]
            },
            {
              'name':'html',
              'contents':['*.html']
            },
            {
              'name':'css',
              'contents':[{
                'name':'scss',
                'contents':['*-style.scss']
              }]
            },
            {
              'name':'copy',
              'contents':['*-content.json']
            },
            {
              'name':'images',
              'contents':[]
            }
          ]
        }
      }
    },/* create_module */
    build_module: {
      blah: {
        options: {
        },
        files: {
          '<%= moduleDirBase %>': []
        }
      }
    },/* create_module */
    processhtml: {
      options: {
        data: {
          message: 'Hello world!'
        },
        customBlockTypes: ['./node_modules/grunt-processhtml/node_modules/htmlprocessor/lib/dependant.js']
      },
      dist: {
        files: {
          '<%= module %>/build/<%= module %>.html': ['<%= module %>/html/<%= module %>.html']
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

};
