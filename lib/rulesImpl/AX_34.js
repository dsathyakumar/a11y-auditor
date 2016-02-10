/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check for presence of a DOCTYPE"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require("jQuery");
var _ = require("lodash");
var enums = require("enums");
var axsUtils = require("axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _node, _htmlDocType;

    //some browsers return this as as DocumentType Object
    _node = document.doctype;
    if (!JSUtils.isUndefined(_node) && !JSUtils.isNull(_node)) {
        _htmlDocType = "<!DOCTYPE " + _node.name + (_node.publicId ? ' PUBLIC "' + _node.publicId + '"' : '') + (!_node.publicId && _node.systemId ? ' SYSTEM' : '') + (_node.systemId ? ' "' + _node.systemId + '"' : '') + '>';
    }

    if (!JSUtils.isEmpty(_htmlDocType) && JSUtils.isNull(_node.previousSibling)) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: false,
            MSG: "WARNING! A Doctype is present as :" + _htmlDocType
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "FAILED! No valid DocType is present (or) the Doctype is not the first element of the page"
        };
    }

} //> end of impl

module.exports = {
    name: "hasDoctype",
    description: "Check for presence of a DOCTYPE",
    ruleID: "AX_34",
    tagName: [],
    handler: _ruleExector,
    isGlobal: true
}
