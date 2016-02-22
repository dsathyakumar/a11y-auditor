/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Until user agents allow users to turn off spawned windows, do not cause pop-ups or other windows to appear
 * and do not change the current window without informing the user."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jquery");
var _ = require('lodash/core');
var enums = require("../enums/enums");
var axsUtils = require("../axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _attr = $(elem).attr("target");

    //if there is a proper placeholder attribute and text
    if (elem.hasAttribute("target") && !_.isEmpty(_attr) && _attr === "_blank") {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! This element can potentially open pop ups that opens in a new window or tab"
        };
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "Passed! No potential external pop up windows detected"
        };
    }
}

module.exports = {
    name: "isOpeningInNewTabOrPopUp",
    description: "Until user agents allow users to turn off spawned windows, do not cause pop-ups or other windows to appear and do not change the current window without informing the user.",
    ruleID: "AX_21",
    tagName: [
        "A",
        "IFRAME"
    ],
    handler: _ruleExector,
    isGlobal: false
}
