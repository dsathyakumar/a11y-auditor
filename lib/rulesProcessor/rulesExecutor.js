/* globals __base */
'use strict';

// array that holds all the rules
var _rulesArr = [];

// initializing vars
var _objHashMap, _prop, glob, _ruleList;

//> function to require all the rules - other args index, array
function _fetchRules(element) {
    _rulesArr.push(require(__base + element));
}

(function() {
    //this is used for browserify to transform and bundle
    try {
        //> use require-globify to cheat the static analyser require of browserify to read dynamic dependencies & globs
        _objHashMap = require('../rulesImpl/*.js', {mode: 'hash'});

        //> _objHashMap has key as file names and value as require call.
        for (_prop in _objHashMap) {
            if (_objHashMap.hasOwnProperty(_prop)) {
                //> Push the require call as before into array
                _rulesArr.push(_objHashMap[_prop]);
            }
        }

    }catch (e) {
        //this is used when the a11y-auditor module is required and used
        glob = require('glob') || {};
        //> get all the paths to the files that contain the rule implementations
        _ruleList = glob.sync('lib/rulesImpl/*.js', {});

        //> for every path to a file in this array, require the corresponding module
        _ruleList.forEach(_fetchRules);
    }
})();

//> exports the rulesImpl
module.exports = _rulesArr || [];
