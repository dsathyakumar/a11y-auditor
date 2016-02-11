/****************************************************************
 * Grunt File for a11y-auditor APP
 * Tasks performed :
 * 1. Run JSHint to lint the files.
 * 2. Run grunt-browserify task to convert the files to be front end compatible
 * 3. Have watchify to watch over the files changing under lib/*.js
 */

module.exports = function(grunt) {

    //load the grunt-contrib-clean
    grunt.loadNpmTasks('grunt-contrib-clean');

    //load the grunt watcher
    grunt.loadNpmTasks('grunt-contrib-watch');

    //load the grunt browserify plugin
    grunt.loadNpmTasks('grunt-browserify');

    //load the js hint plugin
    grunt.loadNpmTasks('grunt-contrib-jshint');


    // configure tasks in grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //jshint: {
          //files: ['Gruntfile.js', 'lib/**/*.js']
        //},
        clean : ['dist/'],
        browserify: {
            main: {
                src: 'index.js',
                dest: 'dist/browser/ally-auditor.js',
                options : {
                  browserifyOptions : {
                    standalone : "index"
                  }
                }
            }
        },
        watch: {
            files: ['lib/**/*.js', 'index.js'],
            tasks: ['default']
        }
    });

    //register the grunt tasks that need to be executed
    grunt.registerTask('default', [/*'jshint', */'clean', 'browserify', 'watch']);

};
