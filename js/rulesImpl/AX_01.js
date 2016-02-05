/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Images should have an alt attribute, unless they have an ARIA role of "presentation"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


(function(moduleName, ctxToAdd, dependenciesObj, factory){

  if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }else{
     umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }

  }("AX_01", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

    //run the auditRulesCreator with result from an IIFE that returns an {}
    auditRulesCreator.addAuditRule((function() {

        //> encapsulated implementation.
        function _ruleExector($,elem,enums,JSUtils,axsUtils){

          var _severityEnum = enums.severityEnum;

          //> even input type image needs an alt attribute to be present

          if((elem.tagName == "IMG")||(elem.tagName==="INPUT" && $(elem).attr("type")==="image")){
            //first check if it has an ALT attribute, else check if it has a ROLE attribute
            if(elem.hasAttribute("alt")){
              if(JSUtils.isEmpty(elem.getAttribute("alt"))){
                return {
                  TYPE : _severityEnum.WARN,
                  RESULT : false,
                  MSG : "Passed! This image has an empty alt attribute."
                };
              }
              return {
                TYPE : _severityEnum.INFO,
                RESULT : true,
                MSG : "Passed!"
              };
            }else if(elem.hasAttribute("role")
                    && (!JSUtils.isEmpty(elem.getAttribute("role")))
                    && elem.getAttribute("role")==="presentation"){
                return {
                  TYPE : _severityEnum.INFO,
                  RESULT : true,
                  MSG : "Passed! This image is used for presentation purposes!"
                };
            }else{
                return {
                  TYPE : _severityEnum.ERROR,
                  RESULT : false,
                  MSG : "Failed! This element is not a11y compliant as it neither has a valid alt / role attribute"
                };
            }
          }else{
            return {
              TYPE : _severityEnum.INFO,
              RESULT : true,
              MSG : "Passed!"
            };
          }
        }

        return {
            name: "imageWithoutAltText",
            description: "Images should have an alt attribute, unless they have an ARIA role of presentation",
            ruleID: "AX_01",
            tagName: ["IMG", "INPUT"],
            handler: _ruleExector
        } // this gets added to the audit rules

    })());


}));
