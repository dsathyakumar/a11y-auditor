
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Positive values for TABINDEX must be avoided
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_02", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){

         var _severityEnum = enums.severityEnum;
         if(elem.hasAttribute("tabindex")){
           if(parseInt($(elem).attr("tabindex")) > 0){
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! Detected positive values for tabindex"
             };
           }else{
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed!"
             };
           }
         }else{
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "Passed!"
           };
         }
       }

       return {
           name: "avoidPositiveTabIndex",
           description: "Avoid positive values for Tab index",
           ruleID: "AX_02",
           tagName: ["IMG", "A", "DIV", "SPAN", "INPUT", "SELECT", "BUTTON"],
           handler: _ruleExector
       }

     })());

 }));
