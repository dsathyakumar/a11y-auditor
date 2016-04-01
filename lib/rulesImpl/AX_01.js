'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Images should have an alt attribute, unless they have an ARIA role of "presentation"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector(elem) {

    var _severityEnum = enums.severityEnum;

    //> even input type image needs an alt attribute to be present
    if ((elem.tagName === 'IMG') || (elem.tagName === 'INPUT' && $(elem).attr('type') === 'image')) {
        //first check if it has an ALT attribute, else check if it has a ROLE attribute
        if (elem.hasAttribute('alt')) {
            if (_.isEmpty(elem.getAttribute('alt'))) {
                return {
                    TYPE: _severityEnum.WARN,
                    RESULT: true,
                    MSG: 'WARNING! This image has an empty alt attribute.'
                };
            }
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: 'Passed!'
            };
        } else if (elem.hasAttribute('role') && (!_.isEmpty(elem.getAttribute('role'))) &&
            elem.getAttribute('role') === 'presentation') {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: 'Passed! This image is used for presentation purposes!'
            };
        } else {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: 'Failed! This element is not a11y compliant as it neither has a valid alt / role attribute'
            };
        }
    } else {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: 'Passed!'
        };
    }
}

module.exports = {
    name: 'imageWithoutAltText',
    description: 'Images should have an alt attribute, unless they have an ARIA role of presentation',
    ruleID: 'AX_01',
    tagName: [
        'IMG',
        'INPUT'
    ],
    handler: _ruleExector,
    compliance: 'A',
    isGlobal: false
};
