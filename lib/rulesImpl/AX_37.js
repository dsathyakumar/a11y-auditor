/**
 ** Created by gopj on 3/29/2016.
 */
/**
 * Rule : Target attribute "_blank" should have the label as "opens in a new window or tab"
 * The eBay guidelines of pop-ups enforce that the user must be indicated by the screen reader
 * that any anchor with target blank will have to be informed to the user via the above text
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
**/

'use strict';
var $ = require('jquery');
var enums = require('../enums/enums'), lbe;

//> Beginning of implementation
function _ruleExector(elem) {

    var _severityEnum = enums.severityEnum;
    if (elem.tagName === 'A' && ($(elem).attr('target') === 'blank' || $(elem).attr('target') === '_blank')) {
        //first check if it has an TARGET attribute
        lbe = $(elem).text().toLowerCase().trim();
        if (lbe.indexOf('opens in a new window') >= 0) {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: 'Passed!'
            };

        } else {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: 'Passed! This anchor element is not having the hidden label as "opens in a new window ot tab"'
            };
        }

    }else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: false,
            MSG: 'Passed! This anchor element is not having target attribute"'
        };
    }
} //> end of implementation

//> exports
module.exports = {
    name: 'anchorWithTargetblank',
    description: 'Anchor element with target _blank should have an hidden label "opens in a new window ot tab"',
    ruleID: 'AX_37',
    tagName: [
        'A'
    ],
    handler: _ruleExector,
    compliance: 'AA',
    isGlobal: false
};
