/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Don't use the <B> and <I> tags. They are used to create a visual presentation effect"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_29", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if(elem.tagName==="B"){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! A B tag is used. They are used to create a visual presentation effect and cannot indicate structure emphasis or speech inflection. Use the STRONG tag instead"
           };
         }else if(elem.tagName==="I"){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! An I tag is present. They are used to create a visual presentation effect. Render it via CSS"
           };
         }

       }

       return {
           name: "isBorIElementUsed",
           description: "Don't use the <B> and <I> tags. They are used to create a visual presentation effect",
           ruleID: "AX_29",
           tagName: ["B", "I"],
           handler: _ruleExector
       }

     })());

 }));
