/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid Deprecated features of W3C technologies"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/



 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_16", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! There are Deprecated elements being used which are not part of W3C technologies"
         };
       }

       return {
           name: "isDeprecatedElement",
           description: "Avoid Deprecated features of W3C technologies",
           ruleID: "AX_16",
           tagName: ["FONT", "BASEFONT", "APPLET", "CENTER", "DIR", "ISINDEX", "MENU", "S", "STRIKE", "U"],
           handler: _ruleExector
       }

     })());

 }));
