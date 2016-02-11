/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Provide text equivalent for every non-text element like OBJECT"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jquery");
var _ = require("lodash");
var enums = require("../enums/enums");
var axsUtils = require("../axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    if ($.trim(elem.innerHTML) !== "") {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: false,
            MSG: "WARNING! An OBJECT tag is used. Inner Text equivalent content is provided. Please check its validity"
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "ERROR! Provide a text equivalent for this non-text element OBJECT"
        };
    }
}

module.exports = {
    name: "hasTextEquivalent",
    description: "Provide text equivalent for every non-text element like OBJECT",
    ruleID: "AX_30",
    tagName: ["OBJECT"],
    handler: _ruleExector
}
