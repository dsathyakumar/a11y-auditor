'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Check if element ID is unique
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector(elem) {

    var _severityEnum = enums.severityEnum,
        _id;

    // get the element ID
    _id = $(elem).attr('id'); //need to check if there is more than one element with the same id
    _id = $.trim(_id);

    //check if its unique
    if (!_.isEmpty(_id) && _id !== '') {
        var ids = $('[id="' + _id + '"]');
        if (ids.length > 1 && ids[0] === elem) {
            return {
              TYPE: _severityEnum.ERROR,
              RESULT: false,
              MSG: 'Failed! The Id ' + _id + ' is used in more than one element'
          };
        } else {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: 'Passed!'
            };
        }
    }
    return {
        TYPE: _severityEnum.WARN,
        RESULT: false,
        MSG: 'Passed! But No ID is set for this element'
    };
}

module.exports = {
    name: 'isIdUnique',
    description: 'Check if element ID is unique',
    ruleID: 'AX_04',
    tagName: ['*'],
    handler: _ruleExector,
    isGlobal: false
};
