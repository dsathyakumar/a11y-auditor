
 (function(moduleName, factory){

    //for both AMD and non-AMD plain scripts cases [window] exists
    if(typeof window!== "undefined"){
      window[moduleName] = window[moduleName] || {};
      window[moduleName] = factory;
    }else { //Node / common JS style
      __allyRoot[moduleName] = __allyRoot[moduleName] || {};
      __allyRoot[moduleName] = factory;
    }

 }("umdLoader", function(moduleName, ctxToAdd, dependenciesObj, factory) {

   //> utils to resolve deps based on an object graph
   var dependencyResolver = function(_c, _p) {
       for (var i = 0, _p = _p.split('.'), len = _p.length; i < len; i++) {
           if (!_c || typeof _c !== 'object') return null;
           if(_c[_p[i]]){
              _c = _c[_p[i]];
           }else{
             _c[_p[i]] = {};
             _c = _c[_p[i]];
           }
       }
       if (_c === 'undefined') return null;
       return _c;
   };

   if(typeof define === 'function' && define.amd){
       if (moduleName != null || moduleName != "") {
           var dependencies = [];
           for (var key in dependenciesObj) {
               dependencies.push(key);
           }
           define(moduleName, dependencies, factory);
       } else {
           throw new Error("Module ID is missing! Cannot create a module");
       }
   } else if (typeof exports === 'object' && typeof module === 'object'){
       if (moduleName != null || moduleName != "") {
           var dependencies = [], pathsConfig;
           for (var key in dependenciesObj) {
               var depObjPath = __allyRoot.pathsConfig[key];
               dependencies.push(__allyRoot.dirname + depObjPath);
           }
           //common js style require of each dependency in the array
           dependencies = dependencies.map(require);
           return factory.apply(global, dependencies);
       }
   } else{
       var dependencies = [],
           _tmpObjGraph, ctx = window;

        //build the dependencies from the object graph of dependencies
       for (var key in dependenciesObj) {
           _tmpObjGraph = dependenciesObj[key];
           dependencies.push(dependencyResolver(ctx, _tmpObjGraph));
       }

       //when self-loading the umdLoader itself
       if(ctxToAdd!==null && ctxToAdd!==""){
         //build the context to add to for the case of browser [window]
         ctxToAdd = dependencyResolver(ctx,ctxToAdd);
         ctxToAdd[moduleName] = factory.apply(ctx, dependencies);
       }else{
           factory.apply(ctx, dependencies);
       }
   }

 }));
