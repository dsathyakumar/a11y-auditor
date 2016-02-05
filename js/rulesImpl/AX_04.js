
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Check if element ID is unique
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


   (function(moduleName, ctxToAdd, dependenciesObj, factory){

     if (typeof exports === 'object' && typeof module === 'object'){
       module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
     }else{
        umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
     }

     }("AX_04", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

       //run the auditRulesCreator with result from an IIFE that returns an {}
       auditRulesCreator.addAuditRule((function() {

         //> encapsulated implementation.
         function _ruleExector($,elem,enums,JSUtils,axsUtils){
           var _severityEnum = enums.severityEnum, _id;

           // get the element ID
           _id = $(elem).attr("id"); //need to check if there is more than one element with the same id
           _id = $.trim(_id);

           //check if its unique
           if(!JSUtils.isEmpty(_id) && _id !== ""){
             if($('*#'+_id).get().length === 1){
               return {
                 TYPE : _severityEnum.INFO,
                 RESULT : true,
                 MSG : "Passed!"
               };
             }else{
               return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! The Id "+ _id + " is used in more than one element"
               };
             }
           }
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "Passed! But No ID is set for this element"
           };
         }

         return {
             name: "isIdUnique",
             description: "Check if element ID is unique",
             ruleID: "AX_04",
             tagName: ["*"],
             handler: _ruleExector
         }

       })());

   }));
