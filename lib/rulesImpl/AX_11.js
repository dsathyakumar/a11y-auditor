'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Elements with ARIA roles must use a valid, non-abstract ARIA role."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var $ = require('jquery');
var _ = require('lodash/core');
var enums = require('../enums/enums');
var validRoleArr = require('../constants/validAriaRolesArr');

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _validRoleArr = [],
        _role, _flag, _isValid = false;

    _validRoleArr = validRoleArr;

    //check if the role attribute exists
    if (elem.hasAttribute('role')) {

        //get the role attribute
        _role = $(elem).attr('role');

        //check if the role attribute is empty
        if (!_.isEmpty(_role)) {

            // procced to check if the role attribute is valid
            _flag = _validRoleArr.length; //decrementing loop initialization

            //iterate over the valid roles array
            while (_flag--) {
                if (_validRoleArr[_flag] === _role) {
                    //valid role
                    _isValid = true;
                    break;
                } else {
                    //invalid role, continue iterating till the flag count is 0
                    continue;
                }
            }

            // populate the result object
            if (_isValid) {
                return {
                    TYPE: _severityEnum.INFO,
                    RESULT: true,
                    MSG: 'Passed! ROLE is valid'
                };
            } else {
                return {
                    TYPE: _severityEnum.ERROR,
                    RESULT: false,
                    MSG: 'Failed! ROLE is invalid'
                };
            }

        } else {

            // role attribute is empty
            return {
                TYPE: _severityEnum.WARN,
                RESULT: true,
                MSG: 'WARNING! Empty ROLE atribute detected'
            };
        }

    }
    // role doesnt exist
    return {
        TYPE: _severityEnum.WARN,
        RESULT: true,
        MSG: 'WARNING! No ROLE attribute detected'
    };
}

module.exports = {
    name: 'hasValidAriaRole',
    description: 'Elements with ARIA roles must use a valid, non-abstract ARIA role.',
    ruleID: 'AX_11',
    tagName: ['*'],
    handler: _ruleExector,
    compliance: 'AA',
    isGlobal: false
};
