/* globals document */
'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check for presence of a DOCTYPE"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector() {
    var _severityEnum = enums.severityEnum,
        _node, _htmlDocType;

    //some browsers return this as as DocumentType Object
    _node = document.doctype;
    if (!_.isUndefined(_node) && !_.isNull(_node)) {
        _htmlDocType = '<!DOCTYPE ' + _node.name + (_node.publicId ? ' PUBLIC "' + _node.publicId + '"' : '') +
            (!_node.publicId && _node.systemId ? ' SYSTEM' : '') + (_node.systemId ? ' "' + _node.systemId + '"' : '') +
            '>';
    }

    if (!_.isEmpty(_htmlDocType) && _.isNull(_node.previousSibling)) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: true,
            MSG: 'WARNING! A Doctype is present as :' + _htmlDocType
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'FAILED! No valid DocType is present (or) the Doctype is not the first element of the page'
        };
    }

} //> end of impl

module.exports = {
    name: 'hasDoctype',
    description: 'Check for presence of a DOCTYPE',
    ruleID: 'AX_34',
    tagName: [],
    handler: _ruleExector,
    compliance: 'A',
    isGlobal: true
};
