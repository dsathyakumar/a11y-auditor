//libraries - core modules jQuery and lodash
var $ = require('jQuery'),
    _ = require('lodash'),

    //modules required from within the app
    axsUtils = require('axsUtils'),
    enums = require('enums'),
    rulesExecutor = require("rulesExecutor"),
    auditRulesCreator = require('auditRulesCreator'),
    ruleTagNameMapper = require('ruleTagNameMapper'),
    ruleHandlerMapper = require('ruleHandlerMapper'),
    injector = require('injectDeps');


var _resultObj = {}, // returns the results of the audit run
    _selectorObjs = {}, // a map that maps an ID to the object extracted from the selectors in the config
    _selectorRules = {}; // a map that maps the same ID to the array of rules to be skipped


/***
* Export this function which takes in a selctor and configObject
*
**/
module.exports = function validator(selector, ignoreSpecific) {

    //if selector is empty or if its not a valid string or if its undefined
    if (_.isEmpty(selector) && !_.isString(selector) && _.isUndefined(selector)) {
        selector = "html"; // do the audit for the whole document
    }
    if ($(selector).length === 0) { //check if the selector gets some DOM element
        throw new Error("Not a valid selector. Or no matching DOM Elements!")
    } else {
        //if ignoreSpecific is not empty & not undefined
        if (!_.isEmpty(ignoreSpecific) && !_.isUndefined(ignoreSpecific)) {
            // check if its a valid object
            if (!_.isObject(ignoreSpecific)) {
                throw new Error("Configuration options passed is not a valid object");
                return;
            }
            //> pre-process - do tasks on the config options object that is passed
            _preProcess(ignoreSpecific);
        }
        //execute global executors
        _globalExecutors();
        //> run the audit on the current selector that was passed
        _auditRunner($(selector));
        //> return the results object
        return _resultObj;
    }
}



//> This creates two maps ->
//> 1) a list of objects extracted from the selectors mentioned in the config object.
//> 2) A second map that contains the list of rules
//> The keys for both the maps are the same -> object.toString() + Random Alphanumeric
function _preProcess(config) {
    var _obj, _ct, _rand;
    //> the config is a "selector" -> ["array of rules to be skipped"]
    for (var currentSelector in config) {
        //> get the array of corresponding objects
        _obj = $(currentSelector).get();
        //> go ahead only when there is an object corresponding to the selector
        if (_obj.length > 0) {
            //> non-breaking for loop as it needs to process all the objects
            for (_ct = 0; _ct < _obj.length; _ct++) {
                //> generate a UID
                _rand = _randomString(10, '0123456789abcdefghijkLMNOPQRSTUVWXYZ');
                //> map the array of objects
                _selectorObjs[_obj[_ct].toString() + _rand] = _obj[_ct];
                //> map the array of rules
                _selectorRules[_obj[_ct].toString() + _rand] = config[currentSelector];
            }
        }
    }
}

//> generates a random alpha numeric
function _randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

//> initiates the audit over an array of selectors
function _auditRunner(selectorArr) {
    var _count = 0;
    //iterate over the selectorArr and process every selector and its child
    while (_count < selectorArr.length) {
        //> auditEngine will process the current Selector from the selectorArr
        _process(selectorArr[_count]);
        //if current the current Selector from the selectorArr has children, process them as well
        if (selectorArr[_count].children.length > 0) {
            //re-run the auditRunner over the array of children
            //TODO: check if recursion has any effect.
            _auditRunner(selectorArr[_count].children);
        }
        _count++;
    }
}

//> function to run global rules
function _globalExecutors() {
    var _globalRules = auditRulesCreator.getGlobalRules(),
        _handler, _result;
    if (!_.isEmpty(_globalRules)) {
        injectDeps.register("elem", undefined);
        _.forEach(_globalRules, function(value, key) {
            _handler = value.handler;
            _result = injectDeps.process(_handler);
            //invoke the handler function which returns a truthy or a falsy.
            if (!_result.RESULT) {
                // there is an error in the execution of current rule. So process Error
                _populateErrors(auditRulesCreator.getRuleObj(key), null, _result);
            }
        });
    }
}

//> process every individual selector from the selector Array
function _process(elem) {
    var _rulesArr, _fn, _result;
    //get the array of rules corresponding to the tagName to execute (tagName <->['Rule1', 'Rule2'])
    _rulesArr = ruleTagNameMapper.getTagHandlers(elem.tagName);

    //check if the _rulesArr is empty before iterating
    if (!_.isEmpty(_rulesArr) && !_.isUndefined(_rulesArr)) {
        //inject the element as one of the dependencies into the injector
        injectDeps.register("elem", elem);
        //iterate over the rules array index being index of the array and value being the rule
        $.each(_rulesArr, function(index, value) {
            //for every rule in the rulesArray for the given tag, get the corresponding handler function (ruleID <-> handler)
            if (!_isSkipRule(value, elem)) {
                _fn = ruleHandlerMapper.getHandler(value);
                _result = injectDeps.process(_fn);
                //invoke the handler function which returns a truthy or a falsy.
                if (!_result.RESULT) {
                    // there is an error in the execution of current rule. So process Error
                    _populateErrors(auditRulesCreator.getRuleObj(value), elem, _result);
                }
            }
        });
    }
}

//> check if the rule execution must be skipped based on presence of rules against selector in config object
function _isSkipRule(rule, elem) {
    var _ruleList, _ct, _isSkip = false;
    //> iterate over the list of objects in the _selectorObjs which was populated from the config
    for (var _obj in _selectorObjs) {
        //> if the object is the same, proceed
        if ($(elem).is(_selectorObjs[_obj])) {
            //> get the rules list to exclude for the current object
            _ruleList = _selectorRules[_obj];
            //> check if the current rule exists in the list of rules to be skipped or if * means skip all
            for (_ct = 0; _ct < _ruleList.length; _ct++) {
                if (_ruleList[_ct] === rule || _ruleList[_ct] === "*") {
                    _isSkip = true;
                    break; //> since the rule is found, break this loop
                }
            }
            break; //> since the object is found break this loop
        }
    }
    return _isSkip;
}

//> This one console.logs the error info for the rule and the element for which it failed
function _populateErrors(ruleInfoObj, element, errorObj) {
    var _key = (!_.isEmpty(element)) ? (_.isEmpty(element.id) ? element.tagName : element.id) : ruleInfoObj.ruleID;
    _resultObj[_key] = _resultObj[_key] || [];
    _resultObj[_key].push({
        severityEnum: errorObj.TYPE,
        description: ruleInfoObj.description,
        errMsg: errorObj.MSG,
        ruleID: ruleInfoObj.ruleID,
        attr: (!_.isEmpty(element)) ? element.attributes : null
    });
}
