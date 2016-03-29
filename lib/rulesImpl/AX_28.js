'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check if PRE elements are used. Ensure that there are no TABLE based layouts in it"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    if (!_.isEmpty($(elem).html())) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: true,
            MSG: "WARNING! A PRE tag is present. Check the contents to ensure it doesn't have pre-formatted TABLE based layouts"
        };
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: 'PASSED!'
        };
    }
}

module.exports = {
    name: 'isPreElementUsed',
    description: 'Check if PRE elements are used. Ensure that there are no TABLE based layouts in it',
    ruleID: 'AX_28',
    tagName: ['PRE'],
    handler: _ruleExector,
    isGlobal: false
};
