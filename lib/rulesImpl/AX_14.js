/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Prsence of Title attribute for ABBR, ACRONYM and A. Specify the expansion of each abbreviation or acronym in a document where it first occurs"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_14", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //if a title attribute is present and if its not empty
         if(elem.hasAttribute("title") && !JSUtils.isEmpty("title")){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : true,
             MSG : "Passed! Title attribute present. Please check if its Meaningful"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The element doesn't have a title attribute to indicate expansion of abbreviation or acronym or a tooltip"
           };
         }

       }

       return {
           name: "hasTitleAttribute",
           description: "Prsence of Title attribute for ABBR, ACRONYM, IFRAME and A. Specify the expansion of each abbreviation or acronym in a document where it first occurs",
           ruleID: "AX_14",
           tagName: ["ABBR", "A", "ACRONYM", "IFRAME", "OBJECT", "MAP", "APPLET"],
           handler: _ruleExector
       }

     })());

 }));
