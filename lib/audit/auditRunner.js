'use strict';

//>libraries - core modules jQuery and lodash
var $ = require('jquery');
var _ = require('lodash/core');

//> modules required from within the app
var auditRunnerHelper = require('./auditRunnerHelper');
var auditRulesCreator = require('../rulesProcessor/auditRulesCreator');
var ruleTagNameMapper = require('../mapper/ruleTagNameMapper');
var ruleHandlerMapper = require('../mapper/ruleHandlerMapper');
var injector = require('../utils/injectDeps');

//> variables used accross the auditRunner
var _resultObj = {}, // returns the results of the audit run
    _selectorObjs = {}, // a map that maps an ID to the object extracted from the selectors in the rulesConfig
    _selectorRules = {}, // a map that maps the same ID to the array of rules to be skipped
    _hasCompliance = false, // Boolean to indicate whether or not a compliance exists
    _mustRunGlobalRules = false, // Boolean to indicate whether global rules need to be run or not
    _rulesConfig = {}, // Rules Config object that contains some rules to be ignored or skipped for some selectors
    _auditConfig = {}, // Audit Config object contains audit specific configurations like compliance, global rules
    _mode = '';

//> defining variables before using - jshint ;)
var _executeGlobalRuleAudits, _conductAudit, _processHTMLObj, _isSkipRule, _populateErrors;

//> exported function which is consumed by the auditInitializer
module.exports = function(auditObj) {

    //> extract needed values from the auditObj
    _selectorObjs = auditObj._selectorObjs;
    _selectorRules = auditObj._selectorRules;
    _hasCompliance = auditObj._hasCompliance;
    _mustRunGlobalRules = auditObj._mustRunGlobalRules;
    _rulesConfig = auditObj._rulesConfig;
    _auditConfig = auditObj._auditConfig;
    _mode = auditObj._mode;
    _resultObj = {};

    //> execute global rules if the boolean is TRUE
    if (_mustRunGlobalRules) {
        _executeGlobalRuleAudits();
    }

    //> conduct the audit
    _conductAudit(auditObj.selector);

    //> return the results object
    return _resultObj;

};

//> function to run global rules
_executeGlobalRuleAudits = function _executeGlobalRuleAudits() {
    var _globalRules, _handler, _result;

    //> either execute all Global rules or execute only those Global rules falling under the compliance
    /*jshint -W030 */
    _hasCompliance ? (_globalRules = auditRulesCreator.getGlobalRulesByCompliance(_auditConfig.compliance)) : (_globalRules = auditRulesCreator.getAllGlobalRules());

    if (!_.isEmpty(_globalRules)) {
        injector.register('elem', undefined);
        _.forEach(_globalRules, function(value, key) {
            _handler = value.handler;
            _result = injector.process(_handler);
            //invoke the handler function which returns a truthy or a falsy.
            if (!_result.RESULT) {
                // there is an error in the execution of current rule. So process Error
                _populateErrors(auditRulesCreator.getRuleObj(key), null, _result);
            }
        });
    }
};

//> recursively conducts the audit over the array of selectors and children
_conductAudit = auditRunnerHelper.tailCallOptimizer(function _conductAudit(selectorArr) {
    var _count = 0;
    //iterate over the selectorArr and process every selector and its child
    while (_count < selectorArr.length) {
        //> auditEngine will process the current Selector from the selectorArr
        _processHTMLObj(selectorArr[_count]);
        //if current the current Selector from the selectorArr has children, process them as well
        // not using childNodes here as it may bring about Text Node & Comment Node etc.,
        if (selectorArr[_count].children.length > 0) {
            //re-run the auditRunner over the array of children
            //fixed the effect of recursion of deeply nested DOM nodes over call stack
            _conductAudit(selectorArr[_count].children);
        }
        _count++;
    }
});

//> process every individual selector from the selector Array
//> elem here is a simple DOM object only
_processHTMLObj = function _processHTMLObj(elem) {
    var _rulesArr, _fn, _result, _ruleObj;
    //> get the array of ruleID's corresponding to the tagName to execute (tagName <->['Rule1', 'Rule2'])
    _rulesArr = ruleTagNameMapper.getTagHandlers(elem.tagName);

    //check if the _rulesArr is empty before iterating
    if (!_.isEmpty(_rulesArr) && !_.isUndefined(_rulesArr)) {
        //> inject the element as one of the dependencies into the injector
        injector.register('elem', elem);
        //> iterate over the rules array index being index of the array and value being the ruleID
        $.each(_rulesArr, function(index, value) {
            //> for every ruleID in the rulesArray for the given tag, get the corresponding ruleObject
            _ruleObj = auditRulesCreator.getRuleObj(value);
            //> check if the current rule has to be skipped or is part of the compliance requested
            if (!_isSkipRule(_ruleObj, elem) && auditRunnerHelper.isCompliant(_hasCompliance, _ruleObj, _auditConfig)) {
                //> get the handler for the corresponding rule handler function (ruleID <-> handler)
                _fn = ruleHandlerMapper.getHandler(value);
                //> call the handler with arguments injected from the dependency injector manager
                _result = injector.process(_fn);
                //> invoke the handler function which returns a truthy or a falsy.
                if (!_result.RESULT) {
                    //> there is an error in the execution of current rule. So process Error
                    _populateErrors(_ruleObj, elem, _result);
                }
            }
        });
    }
};

//> check if the rule execution must be skipped based on presence of rules against selector in config object
//> @param rule is the _ruleObj
//> The ruleObj actually pertains to one of the valid rules for the given tag in the loop
//> So, if the input in the rulesConfig contains some rule that is not meant for a particular selector,
//> They will automatically not be invoked at all.
_isSkipRule = function _isSkipRule(rule, elem) {
    var _ruleList, _ct, _isSkip = false;
    //> iterate over the list of objects in the _selectorObjs which was populated from the rules config
    //> the rulesConfig originally contained 'selector' -> ['array of rules to be skipped']
    //> selectorObjs contain all valid DOM elements matching this selector in rulesConfig
    for (var _obj in _selectorObjs) {
        //> if the object in selectorObjs is same as the current Element, proceed
        if ($(elem).is(_selectorObjs[_obj])) {
            //> get the array of rules list to exclude for the current object
            //> _selectorRules was again populated from the rulesConfig
            _ruleList = _selectorRules[_obj];
            //> check if the current rule exists in the list of rules to be skipped or if * means skip all
            for (_ct = 0; _ct < _ruleList.length; _ct++) {
                if (_ruleList[_ct] === rule.name || _ruleList[_ct] === '*' || _ruleList[_ct] === rule.ruleID) {
                    _isSkip = true;
                    break; //> since the rule is found, break this loop
                }
            }
            break; //> since the object is found break this loop
        }
    }
    if (_mode === 'runOnly')
        _isSkip = !_isSkip;
    return _isSkip;
};

//> This one console.logs the error info for the rule and the element for which it failed
_populateErrors = function _populateErrors(ruleInfoObj, element, errorObj) {
    var _key = (!_.isEmpty(element)) ? (_.isEmpty(element.id) ? element.tagName : element.id) : ruleInfoObj.ruleID;
    _resultObj[_key] = _resultObj[_key] || [];
    _resultObj[_key].push({
        result: errorObj.RESULT,
        severityEnum: errorObj.TYPE,
        description: ruleInfoObj.description,
        errMsg: errorObj.MSG,
        ruleID: ruleInfoObj.ruleID,
        isGlobal: ruleInfoObj.isGlobal,
        compliance: ruleInfoObj.compliance,
        attr: (!_.isEmpty(element)) ? element.attributes : null
    });
};
