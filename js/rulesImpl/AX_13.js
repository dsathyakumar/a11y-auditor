/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "There should be only one main element for a web page document"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_13", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //> There is neither one main element nor one element with role as main
         if($("[role='main']").length ==1 && $("main").length == 1 && $("[role='main']")[0] === $("main")[0]){
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "Passed! The document has a main element"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The document either has NO main element or more than one main element"
           };
         }

       }

       return {
           name: "hasMoreThanOneRoleMain",
           description: "There should be only one main element for a web page document",
           ruleID: "AX_13",
           tagName: ["DIV", "H1", "H2", "H3", "H4", "H5", "H6"],
           handler: _ruleExector
       }

     })());

 }));
