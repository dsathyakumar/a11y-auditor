/****************************************************************
 * This file is the official Grunt File for Gandalf Application
 * Tasks performed :
 * 1. Run r.js optimizer to generate the optimized files.
 */
module.exports = function( grunt ){

   // reads the grunt configuration file of properties.
   var gruntSettings = grunt.file.readJSON('gruntConfig.json');

   // tell grunt to load the r.js optimizer for require - Task name : requirejs
   grunt.loadNpmTasks('grunt-contrib-requirejs');

   // this is needed to concatenate all the JS files for the browser version of a11y
   grunt.loadNpmTasks('grunt-contrib-concat');

  //obj that holds the req JS config tasks
   var requirejsOptions = {};

   /*********************************************************************************************
    * This self-invoking function loads all the main JS files and builds the same using r.js optimizer
    * It uses the grunt plugin - grunt-contrib-requireJs to generate the optimized files
    * The buildConfig is built dynamically here itself, for every file. There are no separate build Files.
    * Each iteration is a file under - js/requireJs
    * For each file 2 versions are generated - DEV and PROD versions
    */
   (function generateOptimizedFiles(){
	   //get all the main JS files used by require JS from the following path
	   var reqJsMainScriptsPath = gruntSettings.reqJsMainScriptsPath,

         //array of main JS files
	       reqJsMainScripts = grunt.file.expand(reqJsMainScriptsPath),

	       //output path to place the optimized generated files
	       optFilesBasePath = gruntSettings.optFilesBasePath_amd;

	   if (reqJsMainScripts.length > 0) {
		    for (var count = 0; count < reqJsMainScripts.length; count++) {

          //current file name extracted from the absolute path excluding the .js extension
		    	var fileName = reqJsMainScripts[count].slice(18, (reqJsMainScripts[count].length - 3));

		    	//for every file generate two versions -> Dev and Prod
		    	for(var flag = 0; flag < 1; flag++){

		    		requirejsOptions['task' + count] = {
		    				"options": {
		    					      "paths":  {
				                            requireLib: '../require/require'
				                          },
				                "name": fileName,
				                "mainConfigFile": reqJsMainScripts[count],
				                "out": optFilesBasePath + fileName + ".js",
				                "include": [],
				                "stubModules": [],
				                "findNestedDependencies": true,
				                "optimizeAllPluginResources": true,
				                "preserveLicenseComments": false,
				                "optimize": "none"
		    				}
		    		};
		    	}
		    }
		}
   })();


   // configure tasks in grunt
   grunt.initConfig({
      requirejs : requirejsOptions,
      concat: {
        options: {
            separator: ';'
        },
        dist: {
            src: ['js/utils/umdLoader.js','js/utils/enumCreator.js','js/enums/enums.js','js/mapper/ruleTagNameMapper.js',
                  'js/mapper/ruleHandlerMapper.js','js/utils/axsUtils.js','js/jsutils/JSUtils.js',
                  'js/utils/auditRulesCreator.js','js/utils/injectDeps.js','js/rulesImpl/*.js',
                  'js/audit/run.js'],
            dest: gruntSettings.optFilesBasePath_browser
        }
      }
   });

   //register the grunt tasks that need to be executed
   grunt.registerTask('default',['requirejs','concat']);

};
