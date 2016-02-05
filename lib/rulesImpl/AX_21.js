/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Until user agents allow users to turn off spawned windows, do not cause pop-ups or other windows to appear and do not change the current window without informing the user."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_21", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _attr = $(elem).attr("target");

         //if there is a proper placeholder attribute and text
         if(elem.hasAttribute("target") && !JSUtils.isEmpty(_attr) && _attr === "_blank"){
           return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! This element can potentially open pop ups that opens in a new window or tab"
             };
         }else{
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! No potential external pop up windows detected"
           };
         }
       }

       return {
           name: "isOpeningInNewTabOrPopUp",
           description: "Until user agents allow users to turn off spawned windows, do not cause pop-ups or other windows to appear and do not change the current window without informing the user.",
           ruleID: "AX_21",
           tagName: ["A", "IFRAME"],
           handler: _ruleExector
       }

     })());

 }));
