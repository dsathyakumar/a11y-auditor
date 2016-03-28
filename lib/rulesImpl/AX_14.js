'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Prsence of Title attribute for ABBR, ACRONYM and A. Specify the expansion of each abbreviation or acronym in
 * a document where it first occurs"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    //if a title attribute is present and if its not empty
    if (elem.hasAttribute('title') && !_.isEmpty('title')) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: true,
            MSG: 'WARNING! Title attribute present. Please check if its Meaningful'
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "Failed! The element doesn't have a title attribute to indicate expansion of abbreviation or acronym or a tooltip"
        };
    }

}

module.exports = {
    name: 'hasTitleAttribute',
    description: 'Presence of Title attribute for ABBR, ACRONYM, IFRAME and A. Specify the expansion of each abbreviation or acronym in a document where it first occurs',
    ruleID: 'AX_14',
    tagName: [
        'ABBR',
        'A',
        'ACRONYM',
        'IFRAME',
        'OBJECT',
        'MAP',
        'APPLET'
    ],
    handler: _ruleExector,
    isGlobal: false
};
