'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Provide keyboard shortcuts to important links (including those in client-side image maps), form controls,
 * and groups of form controls"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    if (elem.hasAttribute('accesskey') && !_.isEmpty('accesskey')) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: false,
            MSG: 'Passed! Keyboard shortcut via accesskey is provided for this form control. Ensure that the accesskey is not repeated for multiple controls'
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'Failed! To ensure accessibility, provide shortcut via accesskey to this form control'
        };
    }
}

module.exports = {
    name: 'hasAccessKeyEnabled',
    description: 'Provide keyboard shortcuts to important links (including those in client-side image maps), form controls, and groups of form controls',
    ruleID: 'AX_23',
    tagName: [
        'A',
        'AREA',
        'BUTTON',
        'INPUT',
        'TEXTAREA',
        'LABEL',
        'LEGEND',
        'SELECT'
    ],
    handler: _ruleExector,
    isGlobal: false
};
