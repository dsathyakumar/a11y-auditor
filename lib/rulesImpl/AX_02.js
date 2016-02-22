/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Positive values for TABINDEX must be avoided
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jquery");
var _ = require('lodash/core');
var enums = require("../enums/enums");
var axsUtils = require("../axs/axsUtils");

function _ruleExector(elem) {

    var _severityEnum = enums.severityEnum;
    if (elem.hasAttribute("tabindex")) {
        if (parseInt($(elem).attr("tabindex")) > 0) {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: "Failed! Detected positive values for tabindex"
            };
        } else {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: "Passed!"
            };
        }
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "Passed!"
        };
    }
}

module.exports = {
    name: "avoidPositiveTabIndex",
    description: "Avoid positive values for Tab index",
    ruleID: "AX_02",
    tagName: [
        "IMG",
        "A",
        "DIV",
        "SPAN",
        "INPUT",
        "SELECT",
        "BUTTON"
    ],
    handler: _ruleExector,
    isGlobal: false
}
