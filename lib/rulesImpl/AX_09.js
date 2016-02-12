/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Provide abbreviations for header labels
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


var $ = require("jquery");
var _ = require("lodash");
var enums = require("../enums/enums");
var axsUtils = require("../axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    //either have an ABBR tag or a non-empty abbr attribute
    if ((elem.hasAttribute("abbr") && !_.isEmpty($(elem).attr("abbr"))) || $(elem).find("abbr").length > 0) {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "Passed! The table header has an abbr attribute / ABBR tag"
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! The abbr attribute is empty or doesn't exist for the table header. Alternatively, No ABBR tag also is present"
        };
    }

}

module.exports = {
    name: "hasAbbr",
    description: "Provide abbreviations for header labels",
    ruleID: "AX_09",
    tagName: ["TH"],
    handler: _ruleExector
}
