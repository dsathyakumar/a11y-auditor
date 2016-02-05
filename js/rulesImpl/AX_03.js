
/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Check for if the current Element has an invalid ARIA attribute
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


  (function(moduleName, ctxToAdd, dependenciesObj, factory){

    if (typeof exports === 'object' && typeof module === 'object'){
      module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
    }else{
       umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
    }

    }("AX_03", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

      //run the auditRulesCreator with result from an IIFE that returns an {}
      auditRulesCreator.addAuditRule((function() {

        //> encapsulated implementation.
        function _ruleExector($,elem,enums,JSUtils,axsUtils){
          var _severityEnum = enums.severityEnum,
              _data = [], //holds the aria-* extracted from element
              _ct, _flag, //variables for loop count
              _isValid = false, //flag to detect if the extracted aria-* is valid or not
              _invalidAriaAttrArr=[], //array that holds any invalid aria-* attribute
              _ariaArr = ["aria-activedescendant", "aria-atomic",
                          "aria-autocomplete", "aria-busy", "aria-checked",
                          "aria-controls", "aria-describedby", "aria-disabled",
                          "aria-dropeffect", "aria-expanded", "aria-flowto", "aria-grabbed",
                          "aria-haspopup", "aria-hidden", "aria-invalid",
                          "aria-label", "aria-labelledby", "aria-level", "aria-live",
                          "aria-multiline", "aria-multiselectable", "aria-orientation",
                          "aria-owns", "aria-posinset", "aria-pressed", "aria-readonly",
                          "aria-relevant", "aria-required", "aria-selected", "aria-setsize",
                          "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow",
                          "aria-valuetext"];

          //> iterate over the attributes array of the element and check if any aria-* exists
          [].forEach.call(elem.attributes, function(attr) {
              if (/^aria-/.test(attr.name)) {
                 _data.push("".toLowerCase(attr.name));
              }
          });

          //> for the length of the aria atributes extracted from the element
          for(_ct = 0; _ct < _data.length; _ct++){
            _flag = _ariaArr.length; //length of the ariaArr with correct aria-* attributes
            _isValid = false;
            //check the current aria-* attribute from elem with the list of correct aria-* in the stock array
            while(_flag--){
              //check each individual aria-* attribute with the list of correct aria-* in the stock array
              if(_ariaArr[_flag]===_data[_ct]){
                _isValid = true;
                break; //break if true
              }else{
                continue; //continue to iterate otherwise
              }
            } //> end of while loop

            //> if the current aria-* doesn't exist then push it into the _invalidAriaAttrArr
            if(!_isValid){
              _invalidAriaAttrArr.push(_data[_ct]);
            }
          }//> end of for loop

          //> returning the result based on if invalid elements are present in the _invalidAriaAttrArr
          if(_invalidAriaAttrArr.length > 0){
            return {
              TYPE : _severityEnum.ERROR,
              RESULT : false,
              MSG : "Failed! Invalid ARIA-* attributes exists on this element"
            };
          }else{
            return {
              TYPE : _severityEnum.INFO,
              RESULT : true,
              MSG : "Passed!"
            };
          }
        }

        return {
            name: "invalidAriaAttribute",
            description: "The element has an invalid ARIA attribute",
            ruleID: "AX_03",
            tagName: ["*"],
            handler: _ruleExector
        }

      })());

  }));
