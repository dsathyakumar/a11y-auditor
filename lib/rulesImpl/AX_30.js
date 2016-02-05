/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Provide text equivalent for every non-text element like OBJECT"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_30", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if($.trim(elem.innerHTML) !== ""){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! An OBJECT tag is used. Inner Text equivalent content is provided. Please check its validity"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "ERROR! Provide a text equivalent for this non-text element OBJECT"
           };
         }

       }

       return {
           name: "hasTextEquivalent",
           description: "Provide text equivalent for every non-text element like OBJECT",
           ruleID: "AX_30",
           tagName: ["OBJECT"],
           handler: _ruleExector
       }

     })());

 }));
