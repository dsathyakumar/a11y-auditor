/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check if there is a link that helps skip irrelevant information and land the user at the main content"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_27", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum,
             _mainElem = $("main"),
             _mainRole = $("[role='main']"),
             _mainID = _mainElem.attr("id") ||  _mainRole.attr("id"),
             _skipToMainContentLink;

         //check if there is an element corresponding to the main id
         if(!JSUtils.isEmpty(_mainID) && !JSUtils.isEmpty($('#'+_mainID).html())){
           _skipToMainContentLink = $("a[href='#" + _mainID + "']");
           if(!JSUtils.isEmpty(_skipToMainContentLink) && !JSUtils.isEmpty(_skipToMainContentLink.html())){
               return {
                 TYPE : _severityEnum.INFO,
                 RESULT : true,
                 MSG : "PASSED! Valid Link to skip to the main content section exists"
               };
           }else{
               return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "FAILED! Link to skip to main content doesn't exist or is empty"
               };
           }
         }else {
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! A proper main section defined either by the MAIN tag or role=main doesn't exist or is empty"
           };
         }
       }

       return {
           name: "hasLinkToSkipToMainContent",
           description: "Check if there is a link that helps skip irrelevant information and land the user at the main content",
           ruleID: "AX_27",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));
