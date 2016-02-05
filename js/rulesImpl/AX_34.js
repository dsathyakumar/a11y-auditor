/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check for presence of a DOCTYPE"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_34", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _node, _htmlDocType;

         //some browsers return this as as DocumentType Object
         _node = document.doctype;
         if(!JSUtils.isUndefined(_node) && !JSUtils.isNull(_node)){
           _htmlDocType = "<!DOCTYPE "
              + _node.name
              + (_node.publicId ? ' PUBLIC "' + _node.publicId + '"' : '')
              + (!_node.publicId && _node.systemId ? ' SYSTEM' : '')
              + (_node.systemId ? ' "' + _node.systemId + '"' : '')
              + '>';
         }

         if(!JSUtils.isEmpty(_htmlDocType) && JSUtils.isNull(_node.previousSibling)){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! A Doctype is present as :" + _htmlDocType
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! No valid DocType is present (or) the Doctype is not the first element of the page"
           };
         }

       } //> end of impl

       return {
           name: "hasDoctype",
           description: "Check for presence of a DOCTYPE",
           ruleID: "AX_34",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));
