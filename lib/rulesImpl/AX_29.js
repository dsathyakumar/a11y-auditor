'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Don't use the <B> and <I> tags. They are used to create a visual presentation effect"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var enums = require('../enums/enums');

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum;

    if (elem.tagName === 'B') {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: false,
            MSG: 'WARNING! A B tag is used. They are used to create a visual presentation effect and cannot indicate structure emphasis or speech inflection. Use the STRONG tag instead'
        };
    } else if (elem.tagName === 'I') {
        return {
            TYPE: _severityEnum.WARN,
            RESULT: false,
            MSG: 'WARNING! An I tag is present. They are used to create a visual presentation effect. Render it via CSS'
        };
    }
}

module.exports = {
    name: 'isBorIElementUsed',
    description: "Don't use the <B> and <I> tags. They are used to create a visual presentation effect",
    ruleID: 'AX_29',
    tagName: [
        'B',
        'I'
    ],
    handler: _ruleExector,
    isGlobal: false
};
