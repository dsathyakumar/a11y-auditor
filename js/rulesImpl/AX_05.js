
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : An element's ID must not be present in more that one aria-owns attribute at any time
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_05", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _id, _objArr;

         // get the element ID - need to check if this ID is used within any aria-owns more than once
         _id = $(elem).attr("id");
         _id = $.trim(_id);

         //check $("[aria-owns='_id']") results in more than one element
         if(!JSUtils.isEmpty(_id) && _id !== ""){
           _objArr = $("[aria-owns="+ _id +"]").get();
           if(_objArr.length <= 1){
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed!"
             };
           }else{
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! The Id "+ _id + " is a part of the aria-owns attribute of more than one element"
             };
           }
         }
         // if the ID doesnt exists
         return {
           TYPE : _severityEnum.WARN,
           RESULT : false,
           MSG : "Passed! But No ID is set for this element"
         };
       }

       return {
           name: "isIdInAria_OwnsUnique",
           description: "An element's ID must not be present in more that one aria-owns attribute at any time",
           ruleID: "AX_05",
           tagName: ["IMG", "A", "DIV", "SPAN", "INPUT", "SELECT", "BUTTON"],
           handler: _ruleExector
       }

     })());

 }));
