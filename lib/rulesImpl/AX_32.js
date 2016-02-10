/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Use FIELDSET to group form controls into semantic units and describe the group with the LEGEND element."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

 var $ = require("jquery");
 var _ = require("lodash");
 var enums = rootRequire("lib/enums/enums");
 var axsUtils = rootRequire("lib/axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _fieldset, elem = $(elem);
    _fieldset = $(elem).closest("fieldset").first();
    if (_fieldset.has(elem).length) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: false,
            MSG: "WARNING! Fieldset is present around this form element to group it semantically. Validate it manually."
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "FAILED! There is no FIELDSET used to group form controls into semantic units"
        };
    }

} //> end of impl

module.exports = {
    name: "isFormElementInsideFieldSet",
    description: "Use FIELDSET to group form controls into semantic units and describe the group with the LEGEND element.",
    ruleID: "AX_32",
    tagName: ["BUTTON", "SELECT", "INPUT", "TEXTAREA", "KEYGEN", "DATALIST", "OUTPUT"],
    handler: _ruleExector
}
