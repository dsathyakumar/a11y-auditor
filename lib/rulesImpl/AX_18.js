/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Until user agents handle empty controls correctly, include default placeholding characters in edit boxes and
 * text areas"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jquery");
var _ = require("lodash");
var enums = require("../enums/enums");
var axsUtils = require("../axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    //if there is a proper placeholder attribute and text
    if (elem.hasAttribute("placeholder") && !_.isEmpty($(elem).attr("placeholder"))) {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "Passed! Placeholder attributes are properly defined"
        };
    } else if (!_.isEmpty(elem.value) || !_.isEmpty(elem.textContent)) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: false,
            MSG: "Passed! Default values are properly defined, but mention it in placeholders"
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! Neither DEFAULT value nor a placeholder is specified for this form control " + elem.tagName
        };
    }
}

module.exports = {
    name: "hasDefaultPlaceholderTexts",
    description: "Until user agents handle empty controls correctly, include default placeholding characters in edit boxes and text areas",
    ruleID: "AX_18",
    tagName: [
        "INPUT",
        "SELECT",
        "TEXTAREA"
    ],
    handler: _ruleExector,
    isGlobal: false
}
