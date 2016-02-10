/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid using the style attribute and defining styles inline and move them to stylesheets instead"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

 var $ = require("jquery");
 var _ = require("lodash");
 var enums = rootRequire("lib/enums/enums");
 var axsUtils = rootRequire("lib/axs/axsUtils");


function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    if (elem.hasAttribute("style")) {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! There are inline styles defined for this element"
        };
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "Passed! No inline styles defined"
        };
    }
}

module.exports = {
    name: "hasInlineStyles",
    description: "Avoid using the style attribute and defining styles inline and move them to stylesheets instead",
    ruleID: "AX_17",
    tagName: ["*"],
    handler: _ruleExector
}
