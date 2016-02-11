var glob = require("glob");
var _rulesArr = [];

//> get all the paths to the files that contain the rule implementations
var _ruleList = glob.sync("lib/rulesImpl/*.js", {});

//> function to require all the rules
function _fetchRules(element,index,array){
  _rulesArr.push(require(__base + element));
}

//> for every path to a file in this array, require the corresponding module
_ruleList.forEach(_fetchRules);

//> export the array of rules implementations
module.exports = _rulesArr;
