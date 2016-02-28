'use strict';
// # Grunt File for a11y-auditor APP
//
// Tasks performed :
// 1. Run JSHint to lint the files.
// 2. Run grunt-browserify task to convert the files to be front end compatible
// 3. Have watchify to watch over the files changing under lib/*.js
//
module.exports = function(grunt) {
    // loading the npm task
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-docco-plus');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //grunt-contrib-uglify tasks to minify the output from browserify
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/a11y-auditor.min.js': ['dist/a11y-auditor.js']
                }
            }
        },
        //grunt-contrib-clean tasks to clean folders on every document, test, coverage tasks
        clean: {
            docs: ['.docs', '.cache'],
            testCoverage: ['.coverage', '.test', '.cache'],
            postUglify: ['dist/a11y-auditor.js']
        },
        //grunt-contrib-copy tasks copies the lib folder and places it inside .coverage/instrument/
        copy: {
            main: {
                files: [
                  {
                      expand: true,
                      flatten: true,
                      src: ['lib'],
                      dest: '.coverage/instrument/'
                  }
                ]
            }
        },
        // grunt-contrib-jshint tasks runs jshint across files mentioned in src
        jshint: {
            lib: {
                src: [
                    'lib/**/*.js',
                    '*.js'
                ],
                options: {
                    jshintrc: '.jshintrc'
                }
            }
        },
        //grunt-jscs tasks runs tests for code style errors
        jscs: {
            lib: {
                src: [
                    'lib/**/*.js',
                    '*.js'
                ],
                options: {
                    config: '.jscsrc'
                }
            }
        },
        //grunt-jsonlint tasks runs lint tests across .json files
        jsonlint: {
            lib: {
                src: [
                    'lib/**/*.json',
                    '*.json'
                ]
            }
        },
        // server side grunt-mocha-test task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    timeout: 50000
                },
                src: [
                    'test/*.js'
                ]
            }
        },
        //grunt-istanbul instrumentor - used to instrument files under .coverage/instrument/lib/*
        instrument: {
            files: [
                'lib/**/*.js'
            ],
            options: {
                lazy: false,
                basePath: '.coverage/instrument/'
            }
        },
        //grunt-istanbul task to store coverage info under .coverage/json/
        storeCoverage: {
            options: {
                dir: '.coverage/json/'
            }
        },
        //grunt-istanbul task to make report from .json file into .lcov
        makeReport: {
            src: '.coverage/json/**/*.json',
            options: {
                type: 'lcov',
                dir: '.coverage/reports/',
                print: 'detail'
            }
        },
        //grunt-env task to store coverage directory
        env: {
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '.coverage/instrument/'
            }
        },
        //grunt-docco-plus task to generate documentation
        'docco-plus': {
            debug: {
                src: [
                    'lib/**',
                    'test/**',
                    '*.js',
                    '*.md'
                ],
                options: {
                    output: '.docs/'
                }
            }
        },
        //grunt-gh-pages to be used by travis to auto commit into gh-pages
        'gh-pages': {
            options: {
                base: '.docs',
                // GH_TOKEN is the environment variable holding the access token for the repository
                repo: 'https://' + process.env.GH_TOKEN + '@github.com/' + process.env.TRAVIS_REPO_SLUG + '.git',
                clone: '.gh_pages',
                message: 'build #' + process.env.TRAVIS_BUILD_NUMBER + ' travis commit',
                // This configuration will suppress logging and sanitize error messages.
                silent: true,
                user: {
                    name: 'travis',
                    email: 'travis@travis-ci.com'
                }
            },
            src: [
                '**'
            ]
        },
        //grunt-coveralls to use the .lcov file
        coveralls: {
            lcov: {
                // LCOV coverage file relevant to every target
                src: '.coverage/reports/lcov.info'
            }
        },
        //grunt-browserify task to generate bundled file for browser env
        browserify: {
            main: {
                src: 'index.js',
                dest: 'dist/a11y-auditor.js',
                options: {
                    ignore: ['glob'],
                    exclude: ['glob'],
                    browserifyOptions: {
                        standalone: 'auditRunner',
                        transform: ['require-globify']
                    }
                }
            }
        },
        //grunt-contrib-watch task to watch files that change and run build
        watch: {
            files: [
                'lib/**/*.js',
                'index.js'
            ],
            tasks: ['default']
        }
    });
    //register the grunt task for mocha tests on Jsdom
    grunt.registerTask('test', [
        'lint',
        'clean:testCoverage',
        'copy:main',
        'env:coverage',
        'instrument',
        'mochaTest'
    ]);
    //register the grunt task for linting
    grunt.registerTask('lint', [
        'jshint',
        'jscs',
        'jsonlint'
    ]);
    //register the grunt task for browserify bundler
    grunt.registerTask('build', [
        'browserify',
        'uglify',
        'clean:postUglify'
    ]);
    //register the grunt task for coverage
    grunt.registerTask('coverage', [
        'test',
        'storeCoverage',
        'makeReport',
        'coveralls:lcov'
    ]);
    //register the grunt task for documentation
    grunt.registerTask('document', [
        'clean:docs',
        'docco-plus'
    ]);
    //register the default grunt tasks that need to be executed
    grunt.registerTask('default', [
        'test',
        'build',
        'watch'
    ]);
};
