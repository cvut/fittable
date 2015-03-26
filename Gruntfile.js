// Foundation Default -- Marián Hlaváč
// Generated on 2014-12-10 using generator-foundationdefault 1.0.2
'use strict';

module.exports = function (grunt) {

	// Project configuration
	grunt.initConfig({
        
        pkg: grunt.file.readJSON("package.json"),
        
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
			dev: '.tmp'
		},
        
        // Compiles Sass to CSS and generates necessary files if requested
		compass: {
            dev: {
				options: {
					sassDir: 'src/scss',
					cssDir: 'src/css',
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
				tasks: ['compass', 'autoprefixer:dev']
			},
            browserify: {
                files: ['src/js/*.es'],
                tasks: ['browserify']
            }
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie >= 8', 'Android 3'] // add Android 3 for Android 4.3- gradients
			},
			dev: {
				files:  [{
					src: 'src/css/*.css'
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
					src: [
                        'src/**.{ico,png,txt,xml}',
                        'src/.htaccess'
					]
				}]
			}
		},

        // Browserify
        browserify: {
            dev: {
                files: {
                    'src/js/app.js': 'src/js/app.es'
                }
            },
            dist: {
                files: {
                    'dist/fittable.js': 'src/js/app.es'
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
            options: {
                compress: true,
                preserveComments: false,
                banner: '/** Fittable <%= pkg.version %> */'
            },
            dist: {
                'dist/fittable.min.js': ['dist/fittable.js']
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
