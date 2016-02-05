/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Use FIELDSET to group form controls into semantic units and describe the group with the LEGEND element."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_32", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _fieldset, elem = $(elem);
         _fieldset = $(elem).closest("fieldset").first();
         if(_fieldset.has(elem).length){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! Fieldset is present around this form element to group it semantically. Validate it manually."
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! There is no FIELDSET used to group form controls into semantic units"
           };
         }

       } //> end of impl

       return {
           name: "isFormElementInsideFieldSet",
           description: "Use FIELDSET to group form controls into semantic units and describe the group with the LEGEND element.",
           ruleID: "AX_32",
           tagName: ["BUTTON", "SELECT", "INPUT", "TEXTAREA", "KEYGEN", "DATALIST", "OUTPUT"],
           handler: _ruleExector
       }

     })());

 }));
