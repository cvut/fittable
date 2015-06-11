'use strict';

module.exports = function (grunt) {

  // Project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      dev: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'index.html',
            'fittable.js',
            'fittable.css',
            'react.js'
          ]
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: './',
          noLineComments: true
        }
      },
      dist: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'dist/',
          noLineComments: true,
          outputStyle: 'compressed'
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      compass: {
        files: ['src/scss/**/*.scss'],
        tasks: ['compass:dev', 'autoprefixer:dev']
      },
      browserify: {
        files: ['src/js/**/*.js'],
        tasks: ['browserify:dev']
      },
      copy: {
        files: ['src/*.html'],
        tasks: ['copy:dev']
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie >= 8', 'Android 3'] // add Android 3 for Android 4.3- gradients
      },
      dev: {
        files: [{
          src: '*.css'
        }]
      },
      dist: {
        files: [{
          src: 'dist/*.css'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.',
          dest: 'dist',
          flatten: true,
          src: [
            'src/*.html',
            'node_modules/react/dist/react.js',
            'node_modules/babel/browser-polyfill.js'
          ]
        }]
      },
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.',
          dest: './',
          flatten: true,
          src: [
            'src/index.html',
            'node_modules/react/dist/react.js',
            'node_modules/babel/browser-polyfill.js'
          ]
        }]
      }
    },

    // Browserify
    browserify: {
      dev: {
        files: {
          './fittable.js': 'src/js/app.js'
        }
      },
      dist: {
        files: {
          'dist/fittable.js': 'src/js/app.js'
        }
      },
      options: {
        transform: [ 'babelify' ],
        browserifyOptions: {
          debug: true
        }
      }
    },

    // Uglify
    uglify: {
      dist: {
        files: {
          'dist/fittable.min.js': [ 'dist/react.js', 'dist/browser-polyfill.js', 'dist/fittable.js' ]
        }
      }
    }
  });

  // Load grunt tasks automaticly
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'clean:dev',
    'compass:dev',
    'autoprefixer:dev',
    'browserify:dev',
    'copy:dev',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'compass:dist',
    'autoprefixer:dist',
    'browserify:dist',
    'uglify:dist',
    'copy:dist'
  ]);
};
