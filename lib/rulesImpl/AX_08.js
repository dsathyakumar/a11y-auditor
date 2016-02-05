
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Provide summaries for tables
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_08", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //> if there is no summary attribute or if the summary attribute is empty
         if(!elem.hasAttribute("summary") || JSUtils.isEmpty($(elem).attr("summary"))){
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The summary attribute is empty or doesn't exist"
           };
         }else{
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "Passed! The table has a summary attribute"
           };
         }

       }

       return {
           name: "hasSummary",
           description: "Provide summaries for tables",
           ruleID: "AX_08",
           tagName: ["TABLE"],
           handler: _ruleExector
       }

     })());

 }));
