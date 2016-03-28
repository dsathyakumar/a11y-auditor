'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Table TD tags are associated to corresponding TH header tags of the table via the headers attribute"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/
var $ = require('jquery');
var _ = require('lodash/core');
var enums = require('../enums/enums');

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _th;

    if (elem.hasAttribute('headers') && !_.isEmpty(elem.getAttribute('headers'))) {
        _th = $('#' + elem.getAttribute('headers'));
        if (_th.length > 0 && _th.prop('tagName') === 'TH') {
            return {
                TYPE: _severityEnum.WARN,
                RESULT: true,
                MSG: 'WARNING! There is a TH corresponding to this. But validate if the content makes sense'
            };
        } else {
            return {
                TYPE: _severityEnum.ERROR,
                RESULT: false,
                MSG: "FAILED! There is no corresponding header TH associated with this element's headers attribute"
            };
        }
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'FAILED! The TD element is not associated with a corresponding table header defined by TH. If this table is used for layout, structure or presentation purposes other than tablulating data. Avoid it.'
        };
    }

} //> end of impl

module.exports = {
    name: 'hasHeadersAttribute',
    description: 'Table TD tags are to be associated to corresponding TH header tags of the table via the headers attribute',
    ruleID: 'AX_35',
    tagName: ['TD'],
    handler: _ruleExector,
    isGlobal: false
};
