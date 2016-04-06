'use strict';

/***************************************************************************************
 * build the auditRules util that exposes method to add rules. This is a ruleID <-> handler mapper
 * @param
 * @return an object with 3 exposed functions
 **/

var _ruleHandlersList = {}; //> is an Object containing auditRules & handlers

//> This function provides an interface to create the rule
function _addHandlerForRule(_ruleID, _handlerFn) {
    _ruleHandlersList[_ruleID] = _handlerFn;
}

//> provide an interface to get the auditRules
function _getRuleHandlersList() {
    return _ruleHandlersList;
}

function _getHandler(_ruleID) {
    return _ruleHandlersList[_ruleID];
}

//> return using the revealing module pattern
module.exports = {
    addRuleHandler: _addHandlerForRule,
    getRuleHandlersList: _getRuleHandlersList,
    getHandler: _getHandler
};
