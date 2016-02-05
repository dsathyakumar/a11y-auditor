/***************************************************************************************
 * build the auditRules util that exposes method to add rules. This is a ruleID <-> RuleInfoObj mapper
 * @param
 * @return an object with 3 exposed functions
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

 }("auditRulesCreator", "axs.utils", {
   "ruleTagNameMapper" : "axs.ruleUtils.ruleTagNameMapper",
   "ruleHandlerMapper" : "axs.ruleUtils.ruleHandlerMapper",
   "JSUtils" : "axs.JSUtils"
 }, function(ruleTagNameMapper, ruleHandlerMapper, JSUtils) {

   var _auditRules = {}; //> is an Object containing auditRules info (RuleID <-> rulesInfoObj)

   //> This function provides an interface to create the rule
   function _createRule(_obj) {
       var _tagNamesArr;
       _auditRules[_obj.ruleID] = _obj;
       _tagNamesArr = _obj.tagName;
       //todo add a default * to make a rule appear for all TAGS
       if(_tagNamesArr.length == 1 && _tagNamesArr[0] === "*"){
         _tagNamesArr = ["A", "ABBR", "ACRONYM", "ADDRESS", "APPLET", "AREA", "B", "BASEFONT", "BDO", "BGSOUND",
                         "BIG", "BLOCKQUOTE", "BLINK", "BODY", "BR", "BUTTON", "CAPTION", "CENTER", "CITE", "CODE", "COL",
                         "COLGROUP", "DD", "DFN", "DEL", "DIR", "DIV", "DL", "DT", "EMBED", "EM", "FIELDSET", "FONT", "FORM",
                         "FRAME", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEAD", "HR", "HTML", "IMG", "IFRAME", "INPUT",
                         "INS", "ISINDEX", "I", "KBD", "LABEL", "LEGEND", "LI", "LINK", "MARQUEE", "MENU", "META", "NOFRAME",
                       "NOSCRIPT", "OPTGROUP", "OPTION", "OL", "P", "Q", "PRE", "S", "SAMP", "SCRIPT", "SELECT", "SMALL", "SPAN",
                       "STRIKE", "STRONG", "STYLE", "SUB", "SUP", "TABLE", "TD", "TR", "THEAD", "TH", "TBODY", "TFOOT", "TEXTAREA",
                       "TITLE", "TT", "UL", "U", "VAR"];
       }
       _tagNamesArr.forEach(function(element, index, array) {
           ruleTagNameMapper.addRuleToTag(element, _obj.ruleID);
       });
       ruleHandlerMapper.addRuleHandler(_obj.ruleID, _obj.handler);
   }

   //> provide an interface to get the auditRules
   function _getAuditRules() {
       return _auditRules;
   }

   //> get global rules that needs to be executed once
   function _getGlobalRules(){
     var _globalRules = {}
     JSUtils.each(_auditRules, function(value, key){
       if(value.isGlobal){
           _globalRules[key] = value;
       }
     });
     return _globalRules;
   }

   //> return an individual rule info obj
   function _getRule(_key) {
       return _auditRules[_key];
   }

   //> return using the revealing module pattern
   return {
       addAuditRule: _createRule,
       getAuditRulesList: _getAuditRules,
       getRuleObj: _getRule,
       getGlobalRules : _getGlobalRules
   }

 }));
