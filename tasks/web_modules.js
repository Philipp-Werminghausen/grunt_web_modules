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

    grunt.registerMultiTask('build_module', 'Building the self-contained module', build_module);
    grunt.registerMultiTask('create_module', 'Create ground structure of a web-module', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var fs = require('fs-extra'),
            options = this.options({
                name:grunt.option('name') || "new_module"
            }),
            dir = this.files[0].dest  + '/' + options.name;

        createFolder(dir);

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
        }
    });
    var fs = require('fs-extra');

    function build_module(module) {
        var options = this.options({
            module:module || grunt.option('module') || false
        })
        if(!options.module){
            console.log('Please provide the module you want to build as a parameter.');
            console.log('Ex. >  grunt build_module --module=module-name');
            return false;
        }
        //check if module exists --(triv)
        //if not return false with message --(triv)
        var path = this.files[0].dest + '/' + options.module + '/html/' + options.module + '.html'
        var module = getFile(path);
        var grabDependanciesRexExp = new RegExp('<!-- module:scripts:shared -->((.|\n)*)?<!-- \/module:scripts:shared -->');
        var match = module.match(grabDependanciesRexExp).map(function(val){
           return val.replace(/<!-- \/?module:scripts:shared -->/s,'');
        });
        console.log(module);
        console.log(match);
        //get array of dependantcies modules
        //build dependancy modules

        //insert copy

        //grab scripts from Depencancies
        //grab styles from Depencancies
        //insert dependancies
        //copy scripts/styles from dempenancies modules (resolve naming conflicts / overwrites)

        //grab scripts
        //grab styles

        //styles unique
        //styles update reference unique

        //scripts unique
        //scripts update reference unique

        //insert scripts
        //insert styles

        //return module

    };
    function getFile(path) {
        console.log('Trying to read this file : ' + path);
        return fs.readFileSync(path,{'encoding':'utf8'});
    }

};