'use strict';
// # Grunt File for a11y-auditor APP
//
// Tasks performed :
// 1. Run JSHint to lint the files.
// 2. Run grunt-browserify task to convert the files to be front end compatible
// 3. Have watchify to watch over the files changing under lib/*.js
//
// js-hint options. See the complete list of options [here](http://jshint.com/docs/options/)
var jshintOptions = {
    nonew: true,
    plusplus: false,
    curly: true,
    latedef: true,
    maxdepth: 6,
    unused: true,
    noarg: true,
    trailing: true,
    indent: 4,
    forin: true,
    noempty: true,
    quotmark: true,
    maxparams: 6,
    node: true,
    eqeqeq: true,
    strict: true,
    undef: true,
    bitwise: true,
    newcap: true,
    immed: true,
    camelcase: true,
    maxcomplexity: 7,
    maxlen: 120,
    nonbsp: true,
    freeze: true
};
module.exports = function(grunt) {
    // loading the npm task
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-docco-plus');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    // Project configuration.
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            clean: [
                '.coverage',
                '.test',
                '.cache'
            ],
            jshint: {
                lib: {
                    src: [
                        'lib/**/*.js',
                        'Gruntfile.js',
                        'package.json'
                    ],
                    options: jshintOptions
                }
            },
            // Configure a mochaTest task
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
            instrument: {
                files: [
                    'lib/**/*.js'
                ],
                options: {
                    lazy: false,
                    basePath: '.coverage/instrument/'
                }
            },
            storeCoverage: {
                options: {
                    dir: '.coverage/json/'
                }
            },
            makeReport: {
                src: '.coverage/json/*.json',
                options: {
                    type: 'lcov',
                    dir: '.coverage/reports/',
                    print: 'detail'
                }
            },
            env: {
                coverage: {
                    APP_DIR_FOR_CODE_COVERAGE: '.coverage/instrument/'
                }
            },
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
            coveralls: {
                lcov: {
                    // LCOV coverage file relevant to every target
                    src: '.coverage/reports/lcov.info'
                }
            },
            browserify: {
                main: {
                    src: 'index.js',
                    dest: 'dist/browser/ally-auditor.js',
                    options: {
                        browserifyOptions: {
                            standalone: "index"
                        }
                    }
                }
            },
            watch: {
                files: [
                    'lib/**/*.js',
                    'index.js'
                ],
                tasks: ['default']
            }
        }
    );
    grunt.registerTask('test', [
        'jshint',
        'mochaTest'
    ]);
    grunt.registerTask('coverage', [
        'instrument',
        'env:coverage',
        'mochaTest',
        'storeCoverage',
        'makeReport',
        'coveralls:lcov'
    ]);
    grunt.registerTask('document', [
        'docco-plus'
    ]);
    //register the grunt tasks that need to be executed
    grunt.registerTask('default', [
        /*'jshint', */
        'browserify',
        'watch'
    ]);
};
