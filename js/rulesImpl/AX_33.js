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

   }("AX_33", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, elem = $(elem);

         if(elem.has("legend").length){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! LEGEND is present inside this FIELDSET to describe it. Check its description"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! There is no LEGEND used to Describe this FIELDSET group"
           };
         }

       } //> end of impl

       return {
           name: "isFieldsetContainsLegend",
           description: "Describe the FIELDSET group with the LEGEND element.",
           ruleID: "AX_33",
           tagName: ["FIELDSET"],
           handler: _ruleExector
       }

     })());

 }));
