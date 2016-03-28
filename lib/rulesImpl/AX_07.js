'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : The webpage should have a title that describes topic or purpose which should not be empty
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector() {

    var _severityEnum = enums.severityEnum,
        _title = $('title');

    if (_title.length === 1 && !_.isEmpty(_title.html())) {
        if (_title.html().length > 15 && _title.html().length < 55) {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: 'Passed! Title exists for this element'
            };
        } else {
            return {
                TYPE: _severityEnum.WARN,
                RESULT: true,
                MSG: 'WARNING! But the length of the title is either too short or very long'
            };
        }
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! The page doesn't have a title tag that describes the topic or purpose, or it is empty"
        };
    }
}

module.exports = {
    name: 'hasTitle',
    description: 'The webpage should have a title that describes topic or purpose',
    ruleID: 'AX_07',
    tagName: [],
    handler: _ruleExector,
    isGlobal: true
};
