/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "The web page should have the content's human language indicated in the markup. Identify the primary natural language of the document"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 var $ = require("jquery");
 var _ = require("lodash");
 var enums = rootRequire("lib/enums/enums");
 var axsUtils = rootRequire("lib/axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _html = $("html");

    //> lang attribute check
    if (typeof _html.attr("lang") === undefined || JSUtils.isEmpty(_html.attr("lang"))) {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! The document has no LANG attribute / EMPTY LANG attribute"
        };
    } else {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: false,
            MSG: "Passed! The document has a LANG attribute. Please check if its valid"
        };
    }
}

module.exports = {
    name: "hasLangAttribute",
    description: "The web page should have the content's human language indicated in the markup. Identify the primary natural language of the document",
    ruleID: "AX_12",
    tagName: [],
    handler: _ruleExector,
    isGlobal: true
}
