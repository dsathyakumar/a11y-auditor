/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Provide summaries for tables
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jQuery");
var _ = require("lodash");
var enums = require("enums");
var axsUtils = require("axsUtils");


function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    //> if there is no summary attribute or if the summary attribute is empty
    if (!elem.hasAttribute("summary") || JSUtils.isEmpty($(elem).attr("summary"))) {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! The summary attribute is empty or doesn't exist"
        };
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "Passed! The table has a summary attribute"
        };
    }

}

module.exports = {
    name: "hasSummary",
    description: "Provide summaries for tables",
    ruleID: "AX_08",
    tagName: ["TABLE"],
    handler: _ruleExector
}
