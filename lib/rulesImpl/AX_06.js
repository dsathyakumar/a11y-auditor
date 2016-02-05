
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Any ID referred to via an IDREF must be unique in the DOM
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_06", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _id, _objArr;

         // get the element ID present within this element's idref attribute
         _id = $(elem).attr("idref");
         _id = $.trim(_id);

         //check $("[id='_id']") results in more than one element
         if(!JSUtils.isEmpty(_id) && _id !== ""){
           _objArr = $("[id="+ _id +"]").get();
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
               MSG : "Failed! The Id "+ _id + " referred in this elements IDREF attribute is not unique"
             };
           }
         }
         // if the ID doesnt exists
         return {
           TYPE : _severityEnum.INFO,
           RESULT : true,
           MSG : "Passed! But No IDREF is set for this element"
         };
       }

       return {
           name: "isIdInIdRefUnique",
           description: "Any ID referred to via an IDREF must be unique in the DOM",
           ruleID: "AX_06",
           tagName: ["*"],
           handler: _ruleExector
       }

     })());

 }));