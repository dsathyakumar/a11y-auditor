'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "The web page should have the content's human language indicated in the markup. Identify the primary natural
 * language of the document"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector() {
    var _severityEnum = enums.severityEnum,
        _html = $('html');

    //> lang attribute check
    if (typeof _html.attr('lang') === undefined || _.isEmpty(_html.attr('lang'))) {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'Failed! The document has no LANG attribute / EMPTY LANG attribute'
        };
    } else {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: true,
            MSG: 'WARNING! The document has a LANG attribute. Please check if its valid'
        };
    }
}

module.exports = {
    name: 'hasLangAttribute',
    description: "The web page should have the content's human language indicated in the markup. Identify the primary natural language of the document",
    ruleID: 'AX_12',
    tagName: [],
    handler: _ruleExector,
    isGlobal: true
};
