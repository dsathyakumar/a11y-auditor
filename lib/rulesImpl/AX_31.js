/* globals document */
'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Ensure that equivalents for dynamic content are updated when the dynamic content changes. As the contents of
 * a frame changes, so must change any description. This is not possible if an IMG is inserted directly into a frame.
 * Thus, content developers should always make the source ('src') of a frame an HTML file"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector(elem) {

    var _severityEnum = enums.severityEnum,
        _url, _hasImg = false;

    if (!_.isEmpty(elem.getAttribute('src'))) {
        _url = document.createElement('a');
        _url.href = elem.getAttribute('src');

        ['pathname'].forEach(function(k) {
            if (_url[k].indexOf('jpg') !== -1 || _url[k].indexOf('jpeg') !== -1 || _url[k].indexOf('gif') !== -1 ||
                _url[k].indexOf('png') !== -1) {
                _hasImg = true;
            } else {
                _hasImg = false;
            }
        });

        if (_hasImg) {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: 'ERROR! Do not provide an image URL as the SRC attribute of the iFrame'
            };
        } else {
            return {
                TYPE: _severityEnum.WARN,
                RESULT: true,
                MSG: "WARNING! There are no images used as URL's for this iFrame"
            };
        }
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'ERROR! The SRC attribute of the iFrame is Empty. Remove unused frames'
        };
    }
} //> end of impl

module.exports = {
    name: 'hasImgInSrcOfUrl',
    description: "Ensure that equivalents for dynamic content are updated when the dynamic content changes. As the contents of a frame changes, so must change any description. This is not possible if an IMG is inserted directly into a frame. Thus, content developers should always make the source ('src') of a frame an HTML file",
    ruleID: 'AX_31',
    tagName: ['IFRAME'],
    handler: _ruleExector,
    compliance: 'A',
    isGlobal: false
};
