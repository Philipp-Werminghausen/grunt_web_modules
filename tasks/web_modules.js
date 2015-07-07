/*
 * grunt_web_modules
 * https://github.com/Philipp-Werminghausen/grunt_web_modules
 *
 * Copyright (c) 2015 Philipp Werminghausen
 * Licensed under the MIT license.
 */

    'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    // grunt.registerMultiTask('web_modules', 'Self contained web-modules(templates/partials) (html-css-js-other)', function () {
    //     // Merge task-specific and/or target-specific options with these defaults.
    //     var options = this.options({
    //         punctuation: '.',
    //         separator: ', '
    //     });

    //     // Iterate over all specified file groups.
    //     this.files.forEach(function (f) {
    //         // Concat specified files.
    //         var src = f.src.filter(function (filepath) {
    //             // Warn on and remove invalid source files (if nonull was set).
    //             if (!grunt.file.exists(filepath)) {
    //                 grunt.log.warn('Source file "' + filepath + '" not found.');
    //                 return false;
    //             } else {
    //                 return true;
    //             }
    //         }).map(function (filepath) {
    //             // Read file source.
    //             return grunt.file.read(filepath);
    //         }).join(grunt.util.normalizelf(options.separator));

    //         // Handle options.
    //         src += options.punctuation;

    //         // Write the destination file.
    //         grunt.file.write(f.dest, src);

    //         // Print a success message.
    //         grunt.log.writeln('File "' + f.dest + '" created.');
    //     });
    // });
    grunt.registerMultiTask('create_module', 'Create ground structure of a web-module', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var fs = require('fs-extra');
        var options = this.options({
            name:grunt.option('name') || "new_module"
        });

        var dir = this.files[0].dest  + '/' + options.name;

        fs.ensureDir( dir, function(err){
            console.log(err);
        });

        forEachFolder(dir,this.files[0].orig.src);

        function forEachFolder(dir,itemsArr) {
            itemsArr.forEach(function(item) {
                if(typeof item === "object"){
                    var dir2 = dir + '/' + item.name
                    createFolder(dir2);
                    forEachFolder(dir2,item.contents);
                }else if(typeof item === "string"){
                    createFile(dir + "/" + item.replace("*", options.name));
                }
            });
        }
        function createFolder(dir) {
            console.log('Creating dir  : ' + dir);
            fs.ensureDir( dir, function(err) {
                console.log(err);
            });
        }
        function createFile(file) {
            console.log('Creating file : ' + file);
            fs.writeFile(file, '', function (err) {
                if (err) return console.log(err);
            });
            // fs.ensureFile( file, function(err) {
            //     console.log(err);
            // });
        }
    });

};