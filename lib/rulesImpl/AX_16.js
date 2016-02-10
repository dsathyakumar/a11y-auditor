/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid Deprecated features of W3C technologies"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/
 
var $ = require("jQuery");
var _ = require("lodash");
var enums = require("enums");
var axsUtils = require("axsUtils");


function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    return {
        TYPE: _severityEnum.ERROR,
        RESULT: false,
        MSG: "Failed! There are Deprecated elements being used which are not part of W3C technologies"
    };
}

module.exports = {
    name: "isDeprecatedElement",
    description: "Avoid Deprecated features of W3C technologies",
    ruleID: "AX_16",
    tagName: ["FONT", "BASEFONT", "APPLET", "CENTER", "DIR", "ISINDEX", "MENU", "S", "STRIKE", "U"],
    handler: _ruleExector
}
