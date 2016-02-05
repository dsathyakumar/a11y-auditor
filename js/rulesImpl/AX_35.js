/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Table TD tags are associated to corresponding TH header tags of the table via the headers attribute"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_35", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _th;

         if(elem.hasAttribute("headers") && !JSUtils.isEmpty(elem.getAttribute("headers"))){
           _th = $("#"+elem.getAttribute("headers"));
           if(_th.length > 0 && _th.prop("tagName") === "TH"){
             return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "PASSED! There is a TH corresponding to this. But validate if the content makes sense"
             };
           }else{
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "FAILED! There is no corresponding header TH associated with this element's headers attribute"
             };
           }
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! The TD element is not associated with a corresponding table header defined by TH. If this table is used for layout, structure or presentation purposes other than tablulating data. Avoid it."
           };
         }

       } //> end of impl

       return {
           name: "hasHeadersAttribute",
           description: "Table TD tags are to be associated to corresponding TH header tags of the table via the headers attribute",
           ruleID: "AX_35",
           tagName: ["TD"],
           handler: _ruleExector
       }

     })());

 }));
