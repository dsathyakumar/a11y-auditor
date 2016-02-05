/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Provide a caption via the CAPTION element. A table CAPTION describes the table in one to three sentences"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_10", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _caption;
         //get the caption
         _caption = $(elem).find("caption");

         //> if there is no summary attribute or if the summary attribute is empty
         if(_caption.length === 1){
           if(JSUtils.isEmpty(_caption[0].innerHTML)){
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! The CAPTION tag is empty for the table"
             };
           }else{
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! The table has a CAPTION"
             };
           }
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The CAPTION tag doesn't exist for the table or there is more than one"
           };
         }
       }

       return {
           name: "hasCaption",
           description: "Provide a caption via the CAPTION element. A table CAPTION describes the table in one to three sentences",
           ruleID: "AX_10",
           tagName: ["TABLE"],
           handler: _ruleExector
       }

     })());

 }));
