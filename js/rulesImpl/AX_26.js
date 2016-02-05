/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid using the style attribute and defining styles inline and move them to stylesheets instead"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_26", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum,
             _description = $("meta[name='description']"),
             _author = $("meta[name='author']"),
             _keywords = $("meta[name='keywords']"),
             _copyright = $("meta[name='copyright']"),
             _hasCharset = $("meta[charset]");


         if(_author.length === 1 && !_checkIfIsEmpty(_author.attr("content"),JSUtils)
           && _description.length === 1 && !_checkIfIsEmpty(_description.attr("content"),JSUtils)
           && _keywords.length === 1 && !_checkIfIsEmpty(_keywords.attr("content"),JSUtils)
           && _copyright.length === 1 && !_checkIfIsEmpty(_copyright.attr("content"),JSUtils)
           && _hasCharset.length === 1 && !_checkIfIsEmpty(_hasCharset.attr("charset"),JSUtils)){
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "PASSED! Required META tags exists"
             };
           }else{
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "FAILED! Some or all of Required META tags such as 'keywords', 'description', 'copyright', 'author', 'charset' are missing for this page"
             };
           }
       }

       //> check if the input param object is empty
       function _checkIfIsEmpty(obj,JSUtils){
         return JSUtils.isEmpty(obj);
       }

       return {
           name: "hasRequiredMetaAttributes",
           description: "Check if there is a meta tag with charset, keywords, description, author, copyright attributes defined",
           ruleID: "AX_26",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));
