/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Check if element ID is unique
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

 var $ = require("jquery");
 var _ = require("lodash");
 var enums = rootRequire("lib/enums/enums");
 var axsUtils = rootRequire("lib/axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _id;

    // get the element ID
    _id = $(elem).attr("id"); //need to check if there is more than one element with the same id
    _id = $.trim(_id);

    //check if its unique
    if (!_.isEmpty(_id) && _id !== "") {
        if ($('*#' + _id).get().length === 1) {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: "Passed!"
            };
        } else {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: "Failed! The Id " + _id + " is used in more than one element"
            };
        }
    }
    return {
        TYPE: _severityEnum.WARN,
        RESULT: false,
        MSG: "Passed! But No ID is set for this element"
    };
}

module.exports = {
    name: "isIdUnique",
    description: "Check if element ID is unique",
    ruleID: "AX_04",
    tagName: ["*"],
    handler: _ruleExector
}
