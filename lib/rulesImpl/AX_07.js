
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : The webpage should have a title that describes topic or purpose which should not be empty
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

 }("AX_07", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _objArr, _title = $("title");

         if(_title.length === 1 && !JSUtils.isEmpty(_title.html())){
           if(_title.html().length > 15 && _title.html().length < 55){
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! Title exists for this element"
             };
           }else{
             return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "Passed! But the length of the title is either too short or very long"
             };
           }
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The page doesn't have a title tag that describes the topic or purpose, or it is empty"
           };
         }
       }

       return {
           name: "hasTitle",
           description: "The webpage should have a title that describes topic or purpose",
           ruleID: "AX_07",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));
