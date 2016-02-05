/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid using the style attribute and defining styles inline and move them to stylesheets instead"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/



 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_17", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if(elem.hasAttribute("style")){
           return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! There are inline styles defined for this element"
             };
           }else {
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! No inline styles defined"
             };
           }
       }

       return {
           name: "hasInlineStyles",
           description: "Avoid using the style attribute and defining styles inline and move them to stylesheets instead",
           ruleID: "AX_17",
           tagName: ["*"],
           handler: _ruleExector
       }

     })());

 }));
