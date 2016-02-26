'use strict';

//> libraries - core modules jQuery and lodash
var $ = require('jquery');
var _ = require('lodash/core');


//> modules required from within the app
var rulesExecutor = require('../rulesProcessor/rulesExecutor');
var auditRulesCreator = require('../rulesProcessor/auditRulesCreator');
var auditRunner = require('./auditRunner');
var auditRunnerHelper = require('./auditRunnerHelper');

//> declaring the variables beforehand - jshint ;)
var _initializer, _delegatedValidator, _initiateAudit, _preProcessRulesConfig;


//> at this point the rulesExecutor has the array of rules implementations and the auditRulesCreator is also available
(function(auditRulesCreator, rulesExecutor) {
    //> so push all the rules into the auditRulesCreator
    rulesExecutor.forEach(function(element) {
        auditRulesCreator.addAuditRule(element);
    });
})(auditRulesCreator, rulesExecutor);


//> variables used accross the auditRunner
var _resultObj = {}, // returns the results of the audit run
    _selectorObjs = {}, // a map that maps an ID to the object extracted from the selectors in the rulesConfig
    _selectorRules = {}, // a map that maps the same ID to the array of rules to be skipped
    _hasCompliance = false, // Boolean to indicate whether or not a compliance exists
    _mustRunGlobalRules = false, // Boolean to indicate whether global rules need to be run or not
    _rulesConfig = {}, // Rules Config object that contains some rules to be ignored or skipped for some selectors
    _auditConfig = {}; // Audit Config object contains audit specific configurations like compliance, global rules


//> Export this function which takes in a selector and configObject
module.exports = function auditRunner(selector, rulesConfig, auditConfig) {

  //> performs initializations for every audit start
  _initializer(rulesConfig, auditConfig);

  //> delegates to a validator which validates the input parameters
  _delegatedValidator(selector);

  //> return the results object
  return _resultObj;
};



//> function that is run at the call of every invocation of the auditRunner
_initializer = function _initializer(rulesConfig, auditConfig){
  //> for every invocation of the auditor, the result object has to be unique. No aggregation of results
  _resultObj = {}, _selectorObjs = {}, _selectorRules = {},
  _hasCompliance = false, _rulesConfig = rulesConfig,
  _auditConfig = auditConfig,
  /*jshint -W030 */
  _mustRunGlobalRules = false;
};



//> function that validates the input parameters
_delegatedValidator = function _delegatedValidator(selector){

  //if selector is null / empty or if its undefined
  if (_.isEmpty(selector) && _.isUndefined(selector)) {
    selector = 'html'; // do the audit for the whole document
  }

  //some plugins that consume this, pass a DOM object as well, so adding support to accept DOM objects
  if(_.isObject(selector)){
    //now check if its a DOM object else throw an Error
    if(auditRunnerHelper.isNode(selector) && auditRunnerHelper.isElement(selector)){
      _initiateAudit($(selector));
    }else{
        throw new Error('Not a valid DOM Object - Node or Element or HTMLElement');
    }
  }

  //if the selector is a string, then wrap it around with jQuery and send it
  if(_.isString(selector)){
    //now check if there is a DOM object that corresponds to the selector, else throw an error
    if ($(selector).length === 0) {
      throw new Error('Not a valid selector. Or no matching DOM Elements!');
    } else {
      _initiateAudit($(selector));
    }
  }
};





//> This function actually begins the process of conducting the audit
_initiateAudit = function _initiateAudit(selector){

  //> if _rulesConfig is not null / empty & not undefined
  if (!_.isEmpty(_rulesConfig) && !_.isUndefined(_rulesConfig)) {

      // check if its a valid object
      if (_.isObject(_rulesConfig)) {
          //> pre-process rules that need to be ignored - do tasks on the config options object that is passed
          _preProcessRulesConfig();
      }else{
          throw new Error('Configuration options passed is not a valid object');
      }
  }

  //> execute global Rules only when the auditConfig.executeGlobalRules is TRUE & Not Undefined
  if (!_.isUndefined(_auditConfig) && _.isObject(_auditConfig)) {

      //> check if a compliance exists and if its a proper string
      if(_.has(_auditConfig, 'compliance') && _.isString(_auditConfig.compliance)){
        _hasCompliance = true;
      }

      //> check if the key to execute global rules exists & if its a proper boolean
      if(_.has(_auditConfig, 'executeGlobalRules') && _.isBoolean(_auditConfig.executeGlobalRules)){
        _mustRunGlobalRules = _auditConfig.executeGlobalRules;
      }
  }

  //> run the audit on the current selector that was passed
  _resultObj = auditRunner({
    'selector' : selector,
    '_hasCompliance' : _hasCompliance,
    '_mustRunGlobalRules' : _mustRunGlobalRules,
    '_rulesConfig' : _rulesConfig,
    '_auditConfig' : _auditConfig,
    '_selectorObjs' : _selectorObjs,
    '_selectorRules' : _selectorRules,
  });

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
        if(_rulesConfig.hasOwnProperty(currentSelector)){
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
