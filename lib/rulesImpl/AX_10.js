/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Provide a caption via the CAPTION element. A table CAPTION describes the table in one to three sentences"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jquery");
var _ = require("lodash");
var enums = require("../enums/enums");
var axsUtils = require("../axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _caption;
    //get the caption
    _caption = $(elem).find("caption");

    //> if there is no summary attribute or if the summary attribute is empty
    if (_caption.length === 1) {
        if (_.isEmpty(_caption[0].innerHTML)) {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: "Failed! The CAPTION tag is empty for the table"
            };
        } else {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: "Passed! The table has a CAPTION"
            };
        }
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! The CAPTION tag doesn't exist for the table or there is more than one"
        };
    }
}

module.exports = {
    name: "hasCaption",
    description: "Provide a caption via the CAPTION element. A table CAPTION describes the table in one to three sentences",
    ruleID: "AX_10",
    tagName: ["TABLE"],
    handler: _ruleExector
}
