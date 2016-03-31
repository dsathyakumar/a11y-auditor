/**
 ** Created by gopj on 3/29/2016.
 */
/**
 * Rule : Target attribute "_blank" should have the label as "opens in a new window or tab"
* @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
**/

'use strict';
var $ = require('jquery');
var enums = require('../enums/enums'), lbe;

function _ruleExector(elem) {

    var _severityEnum = enums.severityEnum;
    //> even input type image needs an alt attribute to be present
    if (elem.tagName === 'A' && ($(elem).attr('target') === 'blank' || $(elem).attr('target') === '_blank')) {
        //first check if it has an TARGET attribute
        lbe = $(elem).text().trim();
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
    } else { //> no target attribute or it opens in the same tab or window
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: 'Passed!'
        };
    }
}

module.exports = {
    name: 'anchorWithTargetblank',
    description: 'Anchor element with target _blank should have an hidden label "opens in a new window ot tab"',
    ruleID: 'AX_37',
    tagName: [
        'A'
    ],
    handler: _ruleExector,
    isGlobal: false
};
