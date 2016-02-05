/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "role=main must be present on significant elements only"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_25", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _tagName, _txt;

         if(elem.hasAttribute("role") && elem.getAttribute("role")==="main"){
           _tagName = elem.tagName.toUpperCase();

           if (enums.InlineElementsEnum[_tagName]) {
             return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "FAILED! Main role is defined for an insignificant element"
             };
           }
           _txt = axsUtils.getTextFromDescendantContent(elem);

           if(!_txt || 50 > _txt.length){
             return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "FAILED! Role=main is on an invalid element"
             };
           }else{
             return {
                 TYPE : _severityEnum.INFO,
                 RESULT : true,
                 MSG : "PASSED! Role=main is on a valid element"
             };
           }
         }else{
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "PASSED! Role=main doesnt exists"
           };
         }
       }

       return {
           name: "isRoleMainOnSignificantElement",
           description: "role=main must be present on significant elements only",
           ruleID: "AX_25",
           tagName: ["*"],
           handler: _ruleExector
       }

     })());

 }));
