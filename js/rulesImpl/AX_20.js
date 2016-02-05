/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Until user agents provide the ability to stop the refresh, do not create periodically auto-refreshing / auto re-direct pages"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_20", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _attr = $(elem).attr("http-equiv");

         //if there is a proper placeholder attribute and text
         if(elem.hasAttribute("http-equiv") && !JSUtils.isEmpty(_attr) && _attr === "refresh"){
           return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! This page has auto-refresh capabilities enabled"
             };
         }else{
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! No auto-refresh detected"
           };
         }
       }

       return {
           name: "hasAutoRefresh",
           description: "Until user agents provide the ability to stop the refresh, do not create periodically auto-refreshing / auto re-direct pages",
           ruleID: "AX_20",
           tagName: ["META"],
           handler: _ruleExector
       }

     })());

 }));
