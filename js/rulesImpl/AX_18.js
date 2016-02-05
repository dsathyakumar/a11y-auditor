/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Until user agents handle empty controls correctly, include default placeholding characters in edit boxes and text areas"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/



 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_18", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //if there is a proper placeholder attribute and text
         if(elem.hasAttribute("placeholder") && !JSUtils.isEmpty($(elem).attr("placeholder"))){
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! Placeholder attributes are properly defined"
           };
         }else if(!JSUtils.isEmpty(elem.value) || !JSUtils.isEmpty(elem.textContent)) {
           return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "Passed! Default values are properly defined, but mention it in placeholders"
           };
         }else{
           return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! Neither DEFAULT value nor a placeholder is specified for this form control " + elem.tagName
           };
         }
       }

       return {
           name: "hasDefaultPlaceholderTexts",
           description: "Until user agents handle empty controls correctly, include default placeholding characters in edit boxes and text areas",
           ruleID: "AX_18",
           tagName: ["INPUT", "SELECT", "TEXTAREA"],
           handler: _ruleExector
       }

     })());

 }));
