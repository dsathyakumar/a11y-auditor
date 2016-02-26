'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check if there is atleast one header section / element for the page content that defines its purpose &
 * context"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector() {
    var _severityEnum = enums.severityEnum,
        _innerHTML, _innerTags, _prevAll;

    //a proper mark up defines one heading / purpose for the page & multiple sub-headings / sections / paragraphs
    if ($('h1').length === 1 && !_.isEmpty($('h1').html())) {
        _innerHTML = $('h1').html();
        _innerTags = $('h1').find('p, span, div, b, i, u, a, section, article, aside, ul, li, ol, h2, h3, h4, h5, h6');
        _prevAll = $('h1').prevAll().filter('h2, h3, h4, h5, h6');

        //check if the text length of > 15 but < 100
        if ((_innerHTML.length > 15) && (_innerHTML.length < 100)) {
            //check if there are no other tags defined in it and no other header tags defined out of order
            if ((_innerTags.length === 0) && (_prevAll.length === 0)) {
                return {
                    TYPE: _severityEnum.WARN,
                    RESULT: false,
                    MSG: 'Passed! Please check if the header tag is valid with the content being : ' + _innerHTML
                };
            } else {
                return {
                    TYPE: _severityEnum.ERROR,
                    RESULT: false,
                    MSG: 'Failed! Header tag is present but either has other HTML tag markup within it or has other header tags defined out of order before it'
                };
            }
        } else {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: 'Failed! Header tag is present but the text length is either too short (lt 15) or too long(gt 100)'
            };
        }
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'Failed! There is either more than one / empty / no header element defining the context & purpose of the page'
        };
    }
}

module.exports = {
    name: 'hasHeaderElementDefined',
    description: 'Check if there is atleast one header section / element for the page content that defines its purpose & context',
    ruleID: 'AX_24',
    tagName: [],
    handler: _ruleExector,
    isGlobal: true
};
