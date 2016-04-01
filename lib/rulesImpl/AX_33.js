'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Use FIELDSET to group form controls into semantic units and describe the group with the LEGEND element."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var enums = require('../enums/enums');

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        $elem = $(elem);

    if ($elem.has('legend').length) {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: true,
            MSG: 'WARNING! LEGEND is present inside this FIELDSET to describe it. Check its description'
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'FAILED! There is no LEGEND used to Describe this FIELDSET group'
        };
    }

} //> end of impl

module.exports = {
    name: 'isFieldsetContainsLegend',
    description: 'Describe the FIELDSET group with the LEGEND element.',
    ruleID: 'AX_33',
    tagName: ['FIELDSET'],
    handler: _ruleExector,
    compliance: 'A',
    isGlobal: false
};
