/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Provide keyboard shortcuts to important links (including those in client-side image maps), form controls, and groups of form controls"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_23", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if(elem.hasAttribute("accesskey") && !JSUtils.isEmpty("accesskey")){
           return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "Passed! Keyboard shortcut via accesskey is provided for this form control. Ensure that the accesskey is not repeated for multiple controls"
           };
         }else{
           return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! To ensure accessibility, provide shortcut via accesskey to this form control"
           };
         }
       }

       return {
           name: "hasAccessKeyEnabled",
           description: "Provide keyboard shortcuts to important links (including those in client-side image maps), form controls, and groups of form controls",
           ruleID: "AX_23",
           tagName: ["A", "AREA", "BUTTON", "INPUT", "TEXTAREA", "LABEL", "LEGEND", "SELECT"],
           handler: _ruleExector
       }

     })());

 }));
