'use strict';

/***************************************************************************************
 * This is a mapper function that maps a TAG to an array of Rules that need to be run on it
 * @param globalContext of the environment
 * @return an object with 3 exposed functions
 **/

//> is an Object <Tag> : ['Rule1', 'Rule2']
var _ruleTagHandlers = {};

//> This function provides an interface to create the rule
function _addRuleToTag(_tag, _rule) {
    var _rulesArr;
    //either get the array corresponding to the tag. If its empty,
    _ruleTagHandlers[_tag] = _ruleTagHandlers[_tag] || [];
    _rulesArr = _ruleTagHandlers[_tag];
    _rulesArr.push(_rule); //push the rule into the array of rules
}

//> provide an interface to get the list of Tags and the corresponding array of handlers
function _getRuleTagHandlers() {
    return _ruleTagHandlers;
}

//>returns an array of rules for the corresponding tag
function _getTagHandlers(_tag) {
    return _ruleTagHandlers[_tag];
}

//> return using the revealing module pattern
module.exports = {
    addRuleToTag: _addRuleToTag,
    getRuleTagHandlers: _getRuleTagHandlers,
    getTagHandlers: _getTagHandlers
};
