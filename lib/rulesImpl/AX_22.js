/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Ensure that pages are usable when scripts, applets, or other programmatic objects are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_22", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //> checks for presence of NOSCRIPT tags
         if($("NOSCRIPT").length > 0){
           return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "Passed! Ensure that pages are usable when scripts, applets, or other programmatic objects are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page"
           };
         }else{
           return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! NOSCRIPT tag is not present. Page would not be usable when scripts are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page"
           };
         }
       }

       return {
           name: "hasNoScriptTag",
           description: "Ensure that pages are usable when scripts, applets, or other programmatic objects are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page",
           ruleID: "AX_22",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));
