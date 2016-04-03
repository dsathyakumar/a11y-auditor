/* globals window */
'use strict';

//> libraries - core modules jQuery and lodash
var $ = require('jquery');
var _ = require('lodash/core');

//> modules required from within the app
var rulesExecutor = require('../rulesProcessor/rulesExecutor');
var auditRulesCreator = require('../rulesProcessor/auditRulesCreator');
var auditRunner = require('./auditRunner');
var auditRunnerHelper = require('./auditRunnerHelper');
var hasEventListener = require('../utils/hasEvent')();
var visibilityChecker = require('../utils/elemVisibilityChecker');

//> if the default getEventListeners API of browser is undefined, use the custom built one
if (typeof window !== 'undefined' && typeof window.getEventListeners === 'undefined') {
    //> initialize our custom event Watcher to all [Nodes]
    hasEventListener();
}

//> hook the element visibility checker to all Nodes of type [Element]
if (typeof window !== 'undefined') {
    visibilityChecker.call(window);
}

//> declaring the variables beforehand - jshint ;)
var _auditRunnerInitializer, _configValidatorAndProcessor, _preProcessRulesConfig;

//> rulesExecutor has the array of rules implementations and the auditRulesCreator is also available
(function(auditRulesCreator, rulesExecutor) {
    //> so push all the rules into the auditRulesCreator
    rulesExecutor.forEach(function(element) {
        auditRulesCreator.addAuditRule(element);
    });
})(auditRulesCreator, rulesExecutor);

//> variables used accross the auditRunner
var _resultObj = {}, // returns the results of the audit run
    _selectorObjs = {}, // maps an ID to the object extracted from the selectors in the rulesConfig
    _selectorRules = {}, // a map that maps the same ID to the array of rules to be skipped
    _hasCompliance = false, // Boolean to indicate whether or not a compliance exists
    _mustRunGlobalRules = false, // Boolean to indicate whether global rules need to be run or not
    _rulesConfig = {}, // Rules Config object contains rules to be ignored for some selectors
    _auditConfig = {}; // Audit Config object contains audit specific configurations

//> This helps the user to run specific rules only, on a particular element
//> function which takes in a selector and an array of rules to execute
//> Array of rules can be comma separated rule ID's or comma separated rule Names
//> selectorObj can be a valid DOM object or a HTML selector
function auditOnSpecificRules(/*selectorObj, ruleToExecute*/) {

    //> sanity checker
    //var _validatorResult = auditRunnerHelper.validator(selectorObj);

    //> check the result of the validation
    //if (_validatorResult.isValid) {
    //_configValidatorAndProcessor($(_validatorResult.selector));
    //} else {
    //throw new Error(_validatorResult.errMsg);
    //}
}

//> This runs the accessibility audit on a valid HTML Selector string (or) DOM object
//> function which takes in a selector rulesConfig and auditConfig object
//> 'selector' is a valid DOM [object] or a valid HTML Selector
//> 'rulesConfig' : object containing valid selector and array of rules to ignored
//> For eg: {‘img’ : [‘AX_01’, 'AX_04']}
//> 'auditConfig' object contains a11y-auditor specific config options like 'executeGlobalRules' and 'compliance'
//> These tell the a11y-auditor whether or not to run global rules and what compliance must be tested
//> global rules are ignored by default. To execute them auditConfig.executeGlobalRules must be 'true'
//> if no compliance is passed, all valid rules are run for the element
function auditSelectorOrDomObject(selector, rulesConfig, auditConfig) {

    //> performs initializations for every audit start
    _auditRunnerInitializer(rulesConfig, auditConfig);

    //> sanity checker
    var _validatorResult = auditRunnerHelper.validator(selector);

    //> check the result of the validation
    if (_validatorResult.isValid) {
        _configValidatorAndProcessor($(_validatorResult.selector));
    } else {
        throw new Error(_validatorResult.errMsg);
    }

    //> run the audit on the current selector that was passed
    _resultObj = auditRunner({
        selector: $(_validatorResult.selector),
        _hasCompliance: _hasCompliance,
        _mustRunGlobalRules: _mustRunGlobalRules,
        _rulesConfig: _rulesConfig,
        _auditConfig: _auditConfig,
        _selectorObjs: _selectorObjs,
        _selectorRules: _selectorRules,
    });

    //> return the results object
    return _resultObj;
}

function auditHTMLResponse() {

}

//> function that is run at the call of every invocation of the auditRunner
_auditRunnerInitializer = function _auditRunnerInitializer(rulesConfig, auditConfig) {
    //> for every invocation of the auditor, the result object has to be unique.
    //> No aggregation of results
    _resultObj = {}, _selectorObjs = {}, _selectorRules = {},
    _hasCompliance = false, _rulesConfig = rulesConfig,
    _auditConfig = auditConfig,
    /*jshint -W030 */
    _mustRunGlobalRules = false;
};

//> This function actually begins the process of conducting the audit
_configValidatorAndProcessor = function _configValidatorAndProcessor() {

    //> if _rulesConfig is not null / empty & not undefined
    if (!_.isEmpty(_rulesConfig) && !_.isUndefined(_rulesConfig)) {

        // check if its a valid object & if the contents of the object are valid 'String':Array[] maps
        if (_.isObject(_rulesConfig) && auditRunnerHelper.hasValidElements(_rulesConfig)) {
            //> pre-process rules that need to be ignored - do tasks
            //> on the config options object that is passed
            _preProcessRulesConfig();
        }else {
            throw new Error('Either Configuration options passed is not a valid object (or) its contents wasnt having valid String type as keys (or) the list of rules to skip were not of type Array.');
        }
    }

    //> execute global Rules only when the auditConfig.executeGlobalRules is TRUE & Not Undefined
    if (!_.isUndefined(_auditConfig) && _.isObject(_auditConfig)) {

        //> check if a compliance exists and if its a proper string
        if (_.has(_auditConfig, 'compliance') && _.isString(_auditConfig.compliance)) {
            _hasCompliance = true;
        }

        //> check if the key to execute global rules exists &
        //> if its a proper boolean
        if (_.has(_auditConfig, 'executeGlobalRules') && _.isBoolean(_auditConfig.executeGlobalRules)) {
            _mustRunGlobalRules = _auditConfig.executeGlobalRules;
        }
    }
};

//> This performs some tasks on the rulesConfig
//> This creates two maps ->
//> 1) a list of objects extracted from the selectors mentioned in the config object.
//> 2) A second map that contains the list of rules
//> The keys for both the maps are the same -> object.toString() + Random Alphanumeric
_preProcessRulesConfig = function _preProcessRulesConfig() {
    var _obj, _ct, _rand;
    //> the config is a 'selector' -> ['array of rules to be skipped']
    for (var currentSelector in _rulesConfig) {
        if (_rulesConfig.hasOwnProperty(currentSelector)) {
            //> get the array of corresponding objects
            _obj = $(currentSelector).get();
            //> go ahead only when there is an object corresponding to the selector
            if (_obj.length > 0) {
                //> non-breaking for loop as it needs to process all the objects
                for (_ct = 0; _ct < _obj.length; _ct++) {
                    //> generate a UID
                    _rand = auditRunnerHelper.UIDGenerator(10, '0123456789abcdefghijkLMNOPQRSTUVWXYZ');
                    //> map the array of objects
                    _selectorObjs[_obj[_ct].toString() + _rand] = _obj[_ct];
                    //> map the array of rules
                    _selectorRules[_obj[_ct].toString() + _rand] = _rulesConfig[currentSelector];
                }
            }
        }
    }
};

//> Export the following two options. More options on the way from here ;)
module.exports = {
    run: auditSelectorOrDomObject,
    runOnly: auditOnSpecificRules,
    auditHTMLResponse: auditHTMLResponse
};
