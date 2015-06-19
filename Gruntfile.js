'use strict';

var npmDest = 'dist';
var entryJS = 'src/js/app.js';

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
            'landing.html',
            'fittable.js',
            'fittable.css',
            './img/'
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
            'src/*.html'
          ]
        }]
      },
      distImgs: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.',
          dest: 'dist/img',
          flatten: true,
          src: [
            'src/img/*'
          ]
        }]
      },
      npm: {
        files: [{
          expand: true,
          dest: npmDest,
          cwd: './src',
          src: [
            'lang/*'
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
            'src/landing.html',
          ]
        }]
      },
      devImgs: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.',
          dest: './img/',
          flatten: true,
          src: [
            'src/img/*'
          ]
        }]
      }
    },

    // Browserify
    browserify: {
      options: {
        transform: [ 'babelify' ],
        browserifyOptions: {
          debug: true,
          standalone: 'fittable'
        }
      },
      dev: {
        files: {
          './fittable.js': entryJS
        }
      },
      dist: {
        files: {
          'dist/fittable.js': entryJS
        }
      },
      min: {
        options: {
          transform: [ 'babelify' ],
          plugin: [ 'minifyify' ]
        },
        files: {
          'dist/fittable.min.js': entryJS
        }
      }
    },

    // Babel: Used for npm prepublishing, otherwise see browserify
    babel: {
      options: {
        sourceMap: false
      },
      npm: {
        files: [{
            expand: true,
            cwd: 'src/js',
            src: ['**/*.js'],
            dest: npmDest + '/js',
            ext: '.js'
        }]
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

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'clean:dev',
    'compass:dev',
    'autoprefixer:dev',
    'browserify:dev',
    'copy:dev',
    'copy:devImgs',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'compass:dist',
    'autoprefixer:dist',
    'browserify:dist',
    'browserify:min',
    'copy:dist',
    'copy:distImgs'
  ]);

  grunt.registerTask('build:npm', [
    'build',
    'babel:npm',
    'copy:npm'
  ]);
};
