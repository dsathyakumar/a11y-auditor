'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "There should be only one main element for a web page document"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var enums = require('../enums/enums');

function _ruleExector() {
    var _severityEnum = enums.severityEnum;

    //> There is neither one main element nor one element with role as main
    if ($("[role='main']").length === 1 && $('main').length === 1 && $("[role='main']")[0] === $('main')[0]) {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: 'Passed! The document has a main element'
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'Failed! The document either has NO main element or more than one main element'
        };
    }

}

module.exports = {
    name: 'hasMoreThanOneRoleMain',
    description: 'There should be only one main element for a web page document',
    ruleID: 'AX_13',
    tagName: [],
    handler: _ruleExector,
    isGlobal: true
};
