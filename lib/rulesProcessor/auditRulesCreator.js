'use strict';

/***************************************************************************************
 * build the auditRules util that exposes method to add rules. This is a ruleID <-> RuleInfoObj mapper
 * @param
 * @return an object with 3 exposed functions
 **/

//> @imports
var ruleTagNameMapper = require('../mapper/ruleTagNameMapper'),
    ruleHandlerMapper = require('../mapper/ruleHandlerMapper'),
    _ = require('lodash/core'),
    tagNamesArr = require('../constants/tagNamesArray');

//> is an Object containing auditRules info (RuleID <-> rulesInfoObj)
var _auditRules = {};

//> This function provides an interface to create the rule
function _createRule(_obj) {
    var _tagNamesArr;
    _auditRules[_obj.ruleID] = _obj;
    _tagNamesArr = _obj.tagName;
    //todo add a default * to make a rule appear for all TAGS
    if (_tagNamesArr.length === 1 && _tagNamesArr[0] === '*') {
        _tagNamesArr = tagNamesArr;
    }
    //forEach args includes element,index,array
    _tagNamesArr.forEach(function(element) {
        ruleTagNameMapper.addRuleToTag(element, _obj.ruleID);
    });
    ruleHandlerMapper.addRuleHandler(_obj.ruleID, _obj.handler);
}

//> provide an interface to get the auditRules
function _getAuditRules() {
    return _auditRules;
}

//> get All the global rules that needs to be executed once
function _getAllGlobalRules() {
    var _globalRules = {};
    var _auditRulesList = _getAuditRules();
    _.forEach(_auditRulesList, function(value, key) {
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

//> check compliance for global rules
function checkCompliance(compliance, _rulesMap) {
    //> get the global rules
    var _globalRulesList = _getAllGlobalRules();

    //> for every global rule in the list
    _.forEach(_globalRulesList, function (value, key) {

        //> if the compliance value requested matches the current rule's compliance
        if (value.compliance === compliance) {

            //> push it to the output object
            _rulesMap[key] = value;
        }
    });
}

//> return a map containing Global rules that match a compliance : - A, AA, AAA
function _getGlobalRulesByCompliance(compliance) {
    var _rulesMap = {};

    //> if its a String type
    if (typeof compliance === 'string') {
        checkCompliance(compliance, _rulesMap);
    }

    //> its obviously an Array type (since validity of this object was already checked earlier)
    else {
        //> for the length of the compliance - each value in compliance array forms an iteration of the loop
        for (var ct = 0; ct < compliance.length; ct++) {
            /* jshint loopfunc:true */
            (function(compliance, _rulesMap) {
                checkCompliance(compliance, _rulesMap);
            })(compliance[ct], _rulesMap);
        }
    }
    return _rulesMap; //> return the global rules that match the compliance
}

//> get all rules by compliance that is passed in
function _getRulesByCompliance(compliance) {
    var _rulesMap = {};
    var _auditRulesList = _getAuditRules();
    _.forEach(_auditRulesList, function(value, key) {
        if (value.compliance === compliance) {
            _rulesMap[key] = value;
        }
    });
    return _rulesMap;
}

//> return using the revealing module pattern
module.exports = {
    addAuditRule: _createRule,
    getAuditRulesList: _getAuditRules,
    getRuleObj: _getRule,
    getAllGlobalRules: _getAllGlobalRules,
    getGlobalRulesByCompliance: _getGlobalRulesByCompliance,
    getRulesByCompliance: _getRulesByCompliance,
};
