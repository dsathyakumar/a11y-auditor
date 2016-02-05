/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check if PRE elements are used. Ensure that there are no TABLE based layouts in it"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_28", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if(!JSUtils.isEmpty($(elem).html())){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! A PRE tag is present. Check the contents to ensure it doesn't have pre-formatted TABLE based layouts"
           };
         }else{
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "PASSED!"
           };
         }

       }

       return {
           name: "isPreElementUsed",
           description: "Check if PRE elements are used. Ensure that there are no TABLE based layouts in it",
           ruleID: "AX_28",
           tagName: ["PRE"],
           handler: _ruleExector
       }

     })());

 }));
