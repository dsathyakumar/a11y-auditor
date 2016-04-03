/* globals Node, HTMLElement */
'use strict';

//> libraries - core modules jQuery and lodash
var $ = require('jquery');
var _ = require('lodash/core');
var enums = require('../enums/enums');

//> export the set of utils required for the auditRunner engine
module.exports = {

    //> check if the current rule that is being processed is compliant
    //> if compliance is defined as a requirement, go ahead to check if current rule is compliant
    //> if no compliance is defined, then, the rule is implicitly compliant.
    isCompliant: function(_hasCompliance, ruleObj, _auditConfig) {
        var _isCompliant = false;
        /*jshint -W030 */
        _hasCompliance ? _isCompliant = this.complianceChecker(ruleObj.compliance, _auditConfig.compliance) : _isCompliant = true;
        return _isCompliant;
    },

    //> auditConfigCompliance is an [] that can take any of the values 'A', 'AA', 'AAA'
    //> ruleComplianceValue is just one rule. So once if this rule has a compliance anywhere, just break away
    complianceChecker: function(ruleComplianceValue, auditConfigCompliance) {
        var _result = false;
        /*jshint -W030 */
        (typeof auditConfigCompliance === 'string') ? (_result = (ruleComplianceValue === auditConfigCompliance)) : ((auditConfigCompliance instanceof Array) ? ((auditConfigCompliance.length > 0) ? _result = this.complianceLooper(ruleComplianceValue, auditConfigCompliance) : _result = true) : _result = true);
        return _result;
    },

    //> auditConfigCompliance is an [] that can take any of the values 'A', 'AA', 'AAA'
    //> ruleComplianceValue is just one rule. So once if this rule has a compliance anywhere, just break away
    complianceLooper: function (ruleComplianceValue, auditConfigCompliance) {
        var _result = false;
        //> loop over the auditConfigCompliance []
        for (var count = 0; count < auditConfigCompliance.length; count++) {
            //> if the type is a string, proceed to compare
            if (typeof auditConfigCompliance[count] === 'string' && (auditConfigCompliance[count] === ruleComplianceValue)) {
                _result = true;
                break; //> they are equal, so break away
            }
            //> else just continue over to the next value
            else {
                continue;
            }
        }
        return _result;
    },

    //> Returns true if it is a DOM node
    isNode: function(o) {
      return (
          typeof Node === 'object' ? o instanceof Node :
          o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
      );
  },

    //> Returns true if it is a DOM element
    isElement: function(o) {
      return (
          typeof HTMLElement === 'object' ? o instanceof HTMLElement : //DOM2
          o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
      );
  },

    //> generates a random alpha numeric
    UIDGenerator: function (length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) {
          result += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      return result;
  },
    //> tail call optimizer to reduce the risk of recursion on the dom - for deep nodes
    tailCallOptimizer: function (func) {
        var result;
        var active = false;
        var accumulated = [];
        return function accumulator() {
            accumulated.push(arguments);
            if (!active) {
                active = true;
                while (accumulated.length) {
                    result = func.apply(this, accumulated.shift());
                }
                active = false;
                return result;
            }
        };
    },

    //> function that validates the input parameters
    validator: function (selector) {

        var _validationObj = {isValid: false, selector: selector, errMsg: ''};

        //if selector is null / empty or if its undefined
        if (_.isEmpty(selector) && _.isUndefined(selector)) {
            _validationObj.selector = 'html'; // do the audit for the whole document
        }

        //some plugins that consume this, pass a DOM object as well,
        // so adding support to accept DOM objects
        if (_.isObject(selector)) {
            //now check if its a DOM object else throw an Error
            if (this.isNode(selector) && this.isElement(selector)) {
                _validationObj.isValid = true;
            }else {
                _validationObj.errMsg = 'Not a valid DOM Object - Node or Element or HTMLElement';
            }
        }

        //if the selector is a string, then wrap it around with jQuery and send it
        if (_.isString(selector)) {
            //now check if there is a DOM object that corresponds to the selector, else throw an error
            if ($(selector).length === 0) {
                _validationObj.errMsg = 'Not a valid selector. Or no matching DOM Elements!';
            } else {
                _validationObj.isValid = true;
            }
        }

        return _validationObj; //> return the validation object
    },

    //> checks for validity of the _rulesConfig object
    hasValidElements: function(_rulesConfig) {

        //> setting a default flag to hold the result of the operation
        var _hasValidElements = false;

        //> as long as the object has a length value, iterate
        if (_.size(_rulesConfig) > 0) {

            //> for every selector in the rulesConfig
            for (var selector in _rulesConfig) {
                if (_rulesConfig.hasOwnProperty(selector)) {
                    //> if the element.key is not a valid string type (or)
                    //> if the corresponding object is not an Array. Its an Error
                    if (typeof selector === 'string' && _rulesConfig[selector] instanceof Array && _rulesConfig[selector].length > 0) {
                        _hasValidElements = true; //> continue
                    }else {
                        _hasValidElements = false;
                        break; //> if any element is found invalid in the array - break
                    }
                }
            }
        } else {
            _hasValidElements = false; //> _rulesConfig is empty
        }
        return _hasValidElements; //> return the final result
    },

    //> get the value for the displayEnum
    getDisplayEnum: function (displayValue) {
        var _displayEnum;
        switch (displayValue) {
            case 'error':
                _displayEnum = enums.displayEnum.ERR;
                break;
            case 'warning':
                _displayEnum = enums.displayEnum.WARN;
                break;
            case 'errAndWarn':
                _displayEnum = enums.displayEnum.ERRWARN;
                break;
            default:
                _displayEnum = enums.displayEnum.ERR;
        }
        return _displayEnum;
    }
};
