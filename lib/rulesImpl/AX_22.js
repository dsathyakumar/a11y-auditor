'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Ensure that pages are usable when scripts, applets, or other programmatic objects are turned off or not
 * supported. If this is not possible, provide equivalent information on an alternative accessible page"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var enums = require('../enums/enums');

function _ruleExector() {
    var _severityEnum = enums.severityEnum;

    //> checks for presence of NOSCRIPT tags
    if ($('NOSCRIPT').length > 0) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: true,
            MSG: 'WARNING! Ensure that pages are usable when scripts, applets, or other programmatic objects are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page'
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'Failed! NOSCRIPT tag is not present. Page would not be usable when scripts are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page'
        };
    }
}

module.exports = {
    name: 'hasNoScriptTag',
    description: 'Ensure that pages are usable when scripts, applets, or other programmatic objects are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page',
    ruleID: 'AX_22',
    tagName: [],
    handler: _ruleExector,
    compliance: 'A',
    isGlobal: true
};
