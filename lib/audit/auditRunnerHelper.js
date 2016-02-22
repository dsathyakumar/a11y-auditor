module.exports = {

  //> check if the current rule that is being processed is compliant
  isCompliant : function(_hasCompliance, ruleObj, _auditConfig){
    var _isCompliant = false;
    _hasCompliance ? _isCompliant = (ruleObj.compliance === _auditConfig.compliance) : _isCompliant = true;
    return _isCompliant;
  },

  //> Returns true if it is a DOM node
  isNode: function(o) {
      return (
          typeof Node === "object" ? o instanceof Node :
          o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
      );
  },

  //> Returns true if it is a DOM element
  isElement: function(o) {
      return (
          typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
          o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
      );
  },

  //> generates a random alpha numeric
  UIDGenerator : function (length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) {
          result += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      return result;
  }
}
