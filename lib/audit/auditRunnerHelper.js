/* globals Node, HTMLElement */
'use strict';

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
    }
};
