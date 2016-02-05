
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "The web page should have the content's human language indicated in the markup. Identify the primary natural language of the document"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_12", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _html = $("html");

         //> lang attribute check
         if(typeof _html.attr("lang") === undefined || JSUtils.isEmpty(_html.attr("lang"))){
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The document has no LANG attribute / EMPTY LANG attribute"
           };
         }else{
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "Passed! The document has a LANG attribute. Please check if its valid"
           };
         }
       }

       return {
           name: "hasLangAttribute",
           description: "The web page should have the content's human language indicated in the markup. Identify the primary natural language of the document",
           ruleID: "AX_12",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));
