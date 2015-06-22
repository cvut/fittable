'use strict';

var npmDest = 'dist';
var buildDest = 'dist';
var entryJS = 'src/js/app.js';
var devDest = '.tmp';
var devBundle = devDest + '/fittable.js';

module.exports = function (grunt) {
  // Project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concurrent: {
      dev: {
        tasks: [
          // 'nodemon',               // start server
          'compass:dev',              // start compass watch
          'browserify:dev',           // start watchify
          'shell:bundleMonitoring',   // start monitoring bundle changes
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

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
            devDest,
          ]
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: devDest,
          noLineComments: true,
          watch: true
        }
      },
      dist: {
        options: {
          sassDir: 'src/scss',
          cssDir: buildDest,
          environment: 'production'
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
          src: devDest + '/*.css'
        }]
      },
      dist: {
        files: [{
          src: buildDest + '/*.css'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          dest: buildDest,
          flatten: false,
          src: [
            'index.html',
            'landing.html',
            'img/**',
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
          cwd: 'src/',
          dest: devDest,
          flatten: false,
          src: [
            'index.html',
            'landing.html',
            'img/**',
          ]
        }]
      },
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
        src: entryJS,
        dest: devBundle,
        options: {
          watch: true,
          keepAlive: true,
          transform: [[{}, 'babelify'], [{global: true, preventCache: false}, 'livereactload']],
          browserifyOptions: {
            debug: true,
            standalone: 'fittable'
          }
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
            dest: npmDest + '/js'
        }]
      }
    },

    shell: {
      bundleMonitoring: {
        command: 'node_modules/.bin/livereactload monitor ' + devBundle
      }
    }


  });

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dev', [
    'concurrent:dev'
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
