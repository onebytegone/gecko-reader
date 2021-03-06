'use strict';

module.exports = function(grunt) {

   var DEBUG = grunt.option('debug');

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      project: {
         src: {
            base: 'src',
            js: {
               base: '<%= project.src.base %>/js',
               main: '<%= project.src.js.base %>/main.js',
               thirdparty: [],
            },
            markup: {
               base: '<%= project.src.base %>/markup',
            },
            sass: {
               base: '<%= project.src.base %>/sass',
               main: '<%= project.src.sass.base %>/main.scss',
            },
            css: {
               thirdparty: [
                  'node_modules/purecss/build/pure.css',
               ],
            },
            assets: {
               base: 'assets',
            },
         },
         dist: {
            base: 'dist',
            css: {
               base: '<%= project.dist.base %>/css',
               main: '<%= project.dist.css.base %>/main.css',
               thirdparty: '<%= project.dist.css.base %>/thirdparty.css',
            },
            js: {
               base: '<%= project.dist.base %>/js',
               main: '<%= project.dist.js.base %>/main.js',
               thirdparty: '<%= project.dist.js.base %>/thirdparty.js',
            },
            assets: {
               base: '<%= project.dist.base %>/assets',
            },
         },
      },

      browserify: {
         build: {
            files: { '<%= project.dist.js.main %>': [ '<%= project.src.js.main %>' ] },
            options: {
               browserifyOptions: {
                  debug: true,
               },
               transform: [
                  [ 'stringify', { minify: false, appliesTo: { includeExtensions: [ '.html' ] } } ],
                  [ 'envify', { global: true, NODE_ENV: (DEBUG ? 'development' : 'production') } ],
               ],
            },
         },
         thirdparty: {
            files: { '<%= project.dist.js.thirdparty %>': '<%= project.src.js.thirdparty %>' },
         },
      },

      uglify: {
         options: {
            banner: '/*! Built: <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            sourceMap: DEBUG ? {
               includeSources: true,
               content: 'inline',
               root: '/',
            } : false,
            mangle: !DEBUG,
            compress: !DEBUG,
            beautify: DEBUG,
         },
         build: {
            files: { '<%= project.dist.js.main %>': '<%= project.dist.js.main %>' },
         },
         thirdparty: {
            files: { '<%= project.dist.js.thirdparty %>': '<%= project.dist.js.thirdparty %>' },
            options: {
               sourceMap: false,
            },
         },
      },

      sass: {
         options: {
            sourceMap: DEBUG,
            includePaths: [ 'node_modules' ],
         },

         build: {
            files: { '<%= project.dist.css.main %>': '<%= project.src.sass.main %>' },
         },
      },

      cssmin: {
         options: {
            shorthandCompacting: false,
            roundingPrecision: -1,
         },
         thirdparty: {
            files: { '<%= project.dist.css.thirdparty %>': '<%= project.src.css.thirdparty %>' },
         },
      },

      copy: {
         assets: {
            files: [
               { expand: true, cwd: '<%= project.src.assets.base %>', src: '*', dest: '<%= project.dist.assets.base %>' },
            ],
         },
         markup: {
            files: [
               { expand: true, cwd: '<%= project.src.markup.base %>', src: 'index.html', dest: '<%= project.dist.base %>' },
            ],
         },
      },

      eslint: {
         target: [ 'Gruntfile.js', 'src/**/*.js', 'tests/**/*.js' ],
      },

      watch: {
         scripts: {
            files: 'Gruntfile.js',
            tasks: [ 'build' ],
         },
         markup: {
            files: '<%= project.src.markup.base %>/**/*.html',
            tasks: [ 'copy:markup' ],
         },
         sass: {
            files: '<%= project.src.sass.base %>/**/*.scss',
            tasks: [ 'sass:build' ],
         },
         js: {
            files: [
               '<%= project.src.js.base %>/**/*.js',
               '<%= project.src.js.base %>/**/*.html',
               '!<%= project.src.js.thirdparty %>',
            ],
            tasks: [ 'browserify:build', 'uglify:build' ],
         },
      },

   });

   grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-sass');
   grunt.loadNpmTasks('grunt-eslint');

   grunt.registerTask('standards', [ 'eslint' ]);
   grunt.registerTask('build-css', [ 'sass:build', 'cssmin:thirdparty' ]);
   grunt.registerTask('build-js', [ 'browserify:build', 'uglify:build', 'browserify:thirdparty', 'uglify:thirdparty' ]);
   grunt.registerTask('build', [ 'copy:markup', 'build-css', 'build-js', 'copy:assets' ]);
   grunt.registerTask('develop', [ 'build', 'watch' ]);
   grunt.registerTask('default', [ 'standards', 'build' ]);

};
