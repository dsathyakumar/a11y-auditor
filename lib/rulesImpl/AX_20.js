/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Until user agents provide the ability to stop the refresh, do not create periodically auto-refreshing / auto
 * re-direct pages"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jquery");
var _ = require("lodash");
var enums = require("../enums/enums");
var axsUtils = require("../axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _attr = $(elem).attr("http-equiv");

    //if there is a proper placeholder attribute and text
    if (elem.hasAttribute("http-equiv") && !_.isEmpty(_attr) && _attr === "refresh") {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! This page has auto-refresh capabilities enabled"
        };
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "Passed! No auto-refresh detected"
        };
    }
}

module.exports = {
    name: "hasAutoRefresh",
    description: "Until user agents provide the ability to stop the refresh, do not create periodically auto-refreshing / auto re-direct pages",
    ruleID: "AX_20",
    tagName: ["META"],
    handler: _ruleExector
}
