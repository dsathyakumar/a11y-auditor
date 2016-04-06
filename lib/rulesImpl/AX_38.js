/**
 ** Created by gopj on 3/29/2016.
 */
/**
 * Rule : If there is a submit button, check if its included inside a form
 * The eBay guidelines of submit elements enforce that it should be inside a form
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
**/

'use strict';
var $ = require('jquery');
var enums = require('../enums/enums');

//> Beginning of implementation
function _ruleExector(elem) {

    var _severityEnum = enums.severityEnum;
    if ((elem.tagName === 'INPUT' || elem.tagName === 'BUTTON' && $(elem).attr('type') === 'submit') || (elem.tagName === 'BUTTON' && $(elem).attr('type') === undefined)) {
        //first check if it has an TARGET attribute
        if ($(elem).closest('form').length > 0) {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: 'Passed!'
            };

        } else {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: 'Passed! This submit element is not inside the form'
            };
        }

    }else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: false,
            MSG: 'Passed! This input element is not a having type as submit"'
        };
    }
} //> end of implementation

//> exports
module.exports = {
    name: 'submitWithinaForm',
    description: 'If there is a submit button, check if its included inside a form',
    ruleID: 'AX_38',
    tagName: [
        'INPUT',
        'BUTTON'
    ],
    handler: _ruleExector,
    compliance: 'AA',
    isGlobal: false
};
