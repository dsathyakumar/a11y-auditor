/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Check for if the current Element has an invalid ARIA attribute
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jquery");
var _ = require("lodash");
var enums = require("../enums/enums");
var axsUtils = require("../axs/axsUtils");
var ariaAttributesArray = require("../constants/ariaAttributesArray");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _data = [], //holds the aria-* extracted from element
        _ct, _flag, //variables for loop count
        _isValid = false, //flag to detect if the extracted aria-* is valid or not
        _invalidAriaAttrArr = [], //array that holds any invalid aria-* attribute
        _ariaArr = ariaAttributesArray;

    //> iterate over the attributes array of the element and check if any aria-* exists
    [].forEach.call(elem.attributes, function(attr) {
        if (/^aria-/.test(attr.name)) {
            _data.push("".toLowerCase(attr.name));
        }
    });

    //> for the length of the aria atributes extracted from the element
    for (_ct = 0; _ct < _data.length; _ct++) {
        _flag = _ariaArr.length; //length of the ariaArr with correct aria-* attributes
        _isValid = false;
        //check the current aria-* attribute from elem with the list of correct aria-* in the stock array
        while (_flag--) {
            //check each individual aria-* attribute with the list of correct aria-* in the stock array
            if (_ariaArr[_flag] === _data[_ct]) {
                _isValid = true;
                break; //break if true
            } else {
                continue; //continue to iterate otherwise
            }
        } //> end of while loop

        //> if the current aria-* doesn't exist then push it into the _invalidAriaAttrArr
        if (!_isValid) {
            _invalidAriaAttrArr.push(_data[_ct]);
        }
    } //> end of for loop

    //> returning the result based on if invalid elements are present in the _invalidAriaAttrArr
    if (_invalidAriaAttrArr.length > 0) {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! Invalid ARIA-* attributes exists on this element"
        };
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "Passed!"
        };
    }
}

module.exports = {
    name: "invalidAriaAttribute",
    description: "The element has an invalid ARIA attribute",
    ruleID: "AX_03",
    tagName: ["*"],
    handler: _ruleExector
}
