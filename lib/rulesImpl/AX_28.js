/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check if PRE elements are used. Ensure that there are no TABLE based layouts in it"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jQuery");
var _ = require("lodash");
var enums = require("enums");
var axsUtils = require("axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    if (!JSUtils.isEmpty($(elem).html())) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: false,
            MSG: "WARNING! A PRE tag is present. Check the contents to ensure it doesn't have pre-formatted TABLE based layouts"
        };
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "PASSED!"
        };
    }
}

module.exports = {
    name: "isPreElementUsed",
    description: "Check if PRE elements are used. Ensure that there are no TABLE based layouts in it",
    ruleID: "AX_28",
    tagName: ["PRE"],
    handler: _ruleExector
}
