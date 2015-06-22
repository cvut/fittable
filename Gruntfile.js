'use strict';

var npmDest = 'dist';
var buildDest = 'dist';
var entryJS = 'src/js/app.js';
var devDest = 'dev';
var tmpDir = '.tmp';
var devBundle = devDest + '/fittable.js';

module.exports = function (grunt) {
  // Project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: [
          'browserify:dev',           // start watchify
          'compass:dev',              // start compass watch
          'copy:dev',                 // copy HTML files
          'watch:autoprefixerDev',
          'watch:copyDev',            // watch src files
          'livereactload',            // start monitoring bundle changes
          'browserSync',              // start static files server
        ],
        options: {
          logConcurrentOutput: true,
          limit: Infinity
        },
      },
      dist: {
        tasks: [
          'css:dist',
          'browserify:dist',
          'browserify:min',
          'copy:dist',
        ]
      },
      npm: {
        tasks: [
          'babel:npm',
          'copy:npm'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            tmpDir,
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
            tmpDir
          ]
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    // autoprefixer is invoked from compass, see config.rb
    compass: {
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: tmpDir,
          noLineComments: true,
          sourcemap: true,
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
      'copyDev': {
        files: ['src/*.html'],
        tasks: ['copy:dev']
      },
      'autoprefixerDev': {
        files: [tmpDir + '/*.css'],
        tasks: ['autoprefixer:dev']
      }
    },

    autoprefixer: {
      dev: {
        options: {
          map: true
        },
        files: [{
          src: [tmpDir + '/*.css'],
          dest: devDest + '/fittable.css'
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
        sourceMap: true
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

    // browserSync: Provides static server and assets reloading
    browserSync: {
      bsFiles: {
          src: [
            devDest + '/*.css',
            devDest + '/*.html'
          ]
      },
      options: {
        server: {
          baseDir: devDest
        }
      }
    },

    shell: {
      bundleMonitoring: {
        command: 'node_modules/.bin/livereactload monitor ' + devBundle
      }
    },


  });

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('livereactload', 'Runs LiveReactload monitor.', function() {
    var lrld = require('livereactload');
    // var done = this.async();
    this.async();

    // grunt.log.writeln('Running LiveReactload monitor server...');
    lrld.monitor(devBundle);
  });

  grunt.registerTask('dev', [
    'concurrent:dev',
  ]);

  grunt.registerTask('css:dist', [
    'compass:dist',
    'autoprefixer:dist'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
  ]);

  grunt.registerTask('build:npm', [
    'build',
    'concurrent:npm'
  ]);

  grunt.registerTask('default', ['dev']);
};
