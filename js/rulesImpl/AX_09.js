
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Provide abbreviations for header labels
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_09", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //either have an ABBR tag or a non-empty abbr attribute
         if((elem.hasAttribute("abbr") && !JSUtils.isEmpty($(elem).attr("abbr"))) || $(elem).find("abbr").length > 0){
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "Passed! The table header has an abbr attribute / ABBR tag"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The abbr attribute is empty or doesn't exist for the table header. Alternatively, No ABBR tag also is present"
           };
         }

       }

       return {
           name: "hasAbbr",
           description: "Provide abbreviations for header labels",
           ruleID: "AX_09",
           tagName: ["TH"],
           handler: _ruleExector
       }

     })());

 }));
