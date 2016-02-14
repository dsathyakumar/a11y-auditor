/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "This element does not support ARIA roles, states and properties"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jquery");
var _ = require("lodash");
var enums = require("../enums/enums");
var axsUtils = require("../axs/axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    // pass in only the reserved elements and check if there are any aria-* attributes defined in them
    if (!_canTakeAriaAttributes(elem)) {
        if (null !== axsUtils.getAriaProperties(elem)) {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: "FAILED! ARIA-* attribute detected on this reserved element"
            };
        } else { //there are no aria-* properties in this reserved element and its a PASS
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: "PASSED! This is a reserved element but there are no aria-* attributes detected"
            };
        }
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "PASSED! This is not a reserved element"
        };
    }
}

//> check if this can take aria attributes
function _canTakeAriaAttributes(elem) {
    return (elem = axsUtils.checkForAria(elem)) ? !elem.reserved : !false;
}

module.exports = {
    name: "isAriaOnReservedElement",
    description: "This element does not support ARIA roles, states and properties",
    ruleID: "AX_15",
    tagName: ["*"],
    handler: _ruleExector,
    isGlobal: false
}
