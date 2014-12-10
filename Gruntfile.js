// Foundation Default -- Marián Hlaváč
// Generated on 2014-12-10 using generator-foundationdefault 1.0.2
'use strict';

module.exports = function (grunt) {

	// Project configuration
	grunt.initConfig({

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			compass: {
				files: ['scss/**/*.scss'],
				tasks: ['compass', 'autoprefixer:dev']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'*.html',
					'scss/**/*.scss',
					'img/**/*.{gif,jpeg,jpg,png,svg}',
					'js/**/*.js'
				]
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
			server: '.tmp'
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
            dev: {
				options: {
					sassDir: 'scss',
					cssDir: 'css',
					noLineComments: true
				}
			},
			dist: {
				options: {
					sassDir: 'scss',
					cssDir: 'dist/css',
					noLineComments: true
				}
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie >= 8', 'Android 3'] // add Android 3 for Android 4.3- gradients
			},
			dev: {
				files: [{
					expand: true,
					cwd: '.tmp',
					src: '**/*.css',
					dest: 'css'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp',
					src: '**/*.css',
					dest: '.tmp/prefixed'
				}]
			}
		},

		uglify: {
            dist: {
                files: {
                    'dist/js/jquery.min.js': ['bower_components/jquery/dist/jquery.min.js'],
                    'dist/js/foundation.min.js': ['bower_components/foundation/js/foundation.min.js'],
                    'dist/js/main.min.js': ['js/main.js']
                }
            }
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeCDATASectionsFromCDATA: true,
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					minifyJS: true,
					minifyCSS: true
				},
				files: [{
					expand: true,
					cwd: 'dist',
					src: '*.html',
					dest: 'dist'
				}]
			}
		},    
                
        targethtml: {
          dist: {
            files: {
              'dist/index.html': 'index.html'
            }
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
					src: [
                        '**.{ico,png,txt,xml}',
						'img/**',
                        'font/**',
                        '.htaccess'
					]
				}]
			}
		}
	});

	// Load grunt tasks automaticly
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'clean:server',
		'compass:dev',
		'autoprefixer:dev',
		'watch'
	]);

	grunt.registerTask('serve', [
		'build'
	]);

	grunt.registerTask('build', [
		'clean:dist',
        'compass:dist',
        'targethtml:dist',
        'copy:dist',
		'autoprefixer:dist',
		'uglify:dist'/*,
		'htmlmin'*/
	]);
};
