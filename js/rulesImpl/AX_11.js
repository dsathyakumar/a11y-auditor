
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Elements with ARIA roles must use a valid, non-abstract ARIA role."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_11", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum,
             _validRoleArr = [], _role, _flag, _isValid = false;

         _validRoleArr = ["alert", "alertdialog", "application", "article", "banner", "button", "checkbox", "columnheader", "combobox",
                         "command", "complementary", "composite", "contentinfo", "definition", "dialog", "directory", "document", "form",
                         "grid", "gridcell", "group", "heading", "img", "input", "landmark", "link", "list", "listbox", "listitem",
                         "log", "main", "marquee", "math", "menu", "menubar", "menuitem", "menuitemcheckbox", "menuitemradio", "navigation",
                         "note", "option", "presentation", "progressbar", "radio", "radiogroup", "range", "region", "roletype", "row", "rowgroup",
                         "rowheader", "search", "section", "sectionhead", "select", "separator", "scrollbar", "slider", "spinbutton", "status",
                         "structure", "tab", "tablist", "tabpanel", "textbox", "timer", "toolbar", "tooltip", "tree", "treegrid", "treeitem",
                         "widget", "window"];

         //check if the role attribute exists
         if(elem.hasAttribute("role")){

           //get the role attribute
           _role = $(elem).attr("role");

           //check if the role attribute is empty
           if(!JSUtils.isEmpty(_role)){

             // procced to check if the role attribute is valid
             _flag = _validRoleArr.length; //decrementing loop initialization

             //iterate over the valid roles array
             while(_flag--){
               if(_validRoleArr[_flag]===_role){
                 //valid role
                 _isValid = true;
                 break;
               }else{
                 //invalid role, continue iterating till the flag count is 0
                 continue;
               }
             }

             // populate the result object
              if(_isValid){
                return {
                              TYPE : _severityEnum.INFO,
                              RESULT : true,
                              MSG : "Passed! ROLE is valid"
                       };
              }else{
                return {
                              TYPE : _severityEnum.ERROR,
                              RESULT : false,
                              MSG : "Failed! ROLE is invalid"
                       };
              }

           }else{

             // role attribute is empty
             return {
                       TYPE : _severityEnum.INFO,
                       RESULT : true,
                       MSG : "Passed! Empty ROLE atribute detected"
                    };
           }

         }
         // role doesnt exist
         return {
                   TYPE : _severityEnum.INFO,
                   RESULT : true,
                   MSG : "Passed! No ROLE attribute detected"
                };
       }

       return {
           name: "hasValidAriaRole",
           description: "Elements with ARIA roles must use a valid, non-abstract ARIA role.",
           ruleID: "AX_11",
           tagName: ["*"],
           handler: _ruleExector
       }

     })());

 }));
