/***************************************************************************************
 * dependency injection for rules creation
 * @param
 * @return an object with exposed functions
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

 }("injectDeps", "axs.utils", {}, function() {

   return {
       dependencies: {},

       process: function(target) {
           var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
           var FN_ARG_SPLIT = /,/;
           var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
           var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
           var text = target.toString();
           var args = text.match(FN_ARGS)[1].split(',');

           return target.apply(target, this.getDependencies(args));
       },

       getDependencies: function(arr) {
           var self = this;
           return arr.map(function(value) {
               return self.dependencies[value];
           });
       },

       register: function(name, dependency) {
           this.dependencies[name] = dependency;
       }
   };

 }));
