/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : An element's ID must not be present in more that one aria-owns attribute at any time
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

 var $ = require("jquery");
 var _ = require("lodash");
 var enums = rootRequire("lib/enums/enums");
 var axsUtils = rootRequire("lib/axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _id, _objArr;

    // get the element ID - need to check if this ID is used within any aria-owns more than once
    _id = $(elem).attr("id");
    _id = $.trim(_id);

    //check $("[aria-owns='_id']") results in more than one element
    if (!_.isEmpty(_id) && _id !== "") {
        _objArr = $("[aria-owns=" + _id + "]").get();
        if (_objArr.length <= 1) {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: "Passed!"
            };
        } else {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: "Failed! The Id " + _id + " is a part of the aria-owns attribute of more than one element"
            };
        }
    }
    // if the ID doesnt exists
    return {
        TYPE: _severityEnum.WARN,
        RESULT: false,
        MSG: "Passed! But No ID is set for this element"
    };
}

module.exports = {
    name: "isIdInAria_OwnsUnique",
    description: "An element's ID must not be present in more that one aria-owns attribute at any time",
    ruleID: "AX_05",
    tagName: ["IMG", "A", "DIV", "SPAN", "INPUT", "SELECT", "BUTTON"],
    handler: _ruleExector
}
