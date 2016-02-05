/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Associate labels explicitly with their controls"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/



 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_19", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _id = $(elem).attr("id"), _labelObj;

         //if there is a proper placeholder attribute and text
         if(elem.hasAttribute("id") && !JSUtils.isEmpty(_id)){
           _labelObj = $("label[for="+ _id +"]");

           //if label text is non-empty and there is only one label element defined
           if(_labelObj.length == 1 && !JSUtils.isEmpty(_labelObj.html())){
             return {
                 TYPE : _severityEnum.INFO,
                 RESULT : true,
                 MSG : "PASSED!"
             };
           }else{ //if there is no label element or more than one defined
             return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! No Label or more than one label element defined for element of id =" + _id
             };
           }
         }else{
           return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! No ID attribute is defined & therefore cannot be associated explicitly with label controlds"
           };
         }
       }

       return {
           name: "hasLabels",
           description: "Associate labels explicitly with their controls",
           ruleID: "AX_19",
           tagName: ["INPUT", "SELECT", "TEXTAREA", "DATALIST", "METER", "KEYGEN", "OUTPUT"],
           handler: _ruleExector
       }

     })());

 }));