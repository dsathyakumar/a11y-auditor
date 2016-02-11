/***************************************************************************************
 * build the auditRules util that exposes method to add rules. This is a ruleID <-> RuleInfoObj mapper
 * @param
 * @return an object with 3 exposed functions
 **/

//> @imports
var ruleTagNameMapper = require("../mapper/ruleTagNameMapper"),
    ruleHandlerMapper = require("../mapper/ruleHandlerMapper"),
    lodash = require("lodash"),
    tagNamesArr = require("../constants/tagNamesArray");

//> is an Object containing auditRules info (RuleID <-> rulesInfoObj)
var _auditRules = {};

//> This function provides an interface to create the rule
function _createRule(_obj) {
    var _tagNamesArr;
    _auditRules[_obj.ruleID] = _obj;
    _tagNamesArr = _obj.tagName;
    //todo add a default * to make a rule appear for all TAGS
    if (_tagNamesArr.length == 1 && _tagNamesArr[0] === "*") {
        _tagNamesArr = tagNamesArr;
    }
    _tagNamesArr.forEach(function(element, index, array) {
        ruleTagNameMapper.addRuleToTag(element, _obj.ruleID);
    });
    ruleHandlerMapper.addRuleHandler(_obj.ruleID, _obj.handler);
}

//> provide an interface to get the auditRules
function _getAuditRules() {
    return _auditRules;
}

//> get global rules that needs to be executed once
function _getGlobalRules() {
    var _globalRules = {}
    _.forEach(_auditRules, function(value, key) {
        if (value.isGlobal) {
            _globalRules[key] = value;
        }
    });
    return _globalRules;
}

//> return an individual rule info obj
function _getRule(_key) {
    return _auditRules[_key];
}

//> return using the revealing module pattern
module.exports = {
    addAuditRule: _createRule,
    getAuditRulesList: _getAuditRules,
    getRuleObj: _getRule,
    getGlobalRules: _getGlobalRules
}
