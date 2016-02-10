/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid using the style attribute and defining styles inline and move them to stylesheets instead"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/
var $ = require("jQuery");
var _ = require("lodash");
var enums = require("enums");
var axsUtils = require("axsUtils");

function _ruleExector(elem) {
    var _severityEnum = enums.severityEnum,
        _description = $("meta[name='description']"),
        _author = $("meta[name='author']"),
        _keywords = $("meta[name='keywords']"),
        _copyright = $("meta[name='copyright']"),
        _hasCharset = $("meta[charset]");


    if (_author.length === 1 && !_checkIfIsEmpty(_author.attr("content")) && _description.length === 1 && !_checkIfIsEmpty(_description.attr("content")) && _keywords.length === 1 && !_checkIfIsEmpty(_keywords.attr("content")) && _copyright.length === 1 && !_checkIfIsEmpty(_copyright.attr("content")) && _hasCharset.length === 1 && !_checkIfIsEmpty(_hasCharset.attr("charset"))) {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: "PASSED! Required META tags exists"
        };
    } else {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: "FAILED! Some or all of Required META tags such as 'keywords', 'description', 'copyright', 'author', 'charset' are missing for this page"
        };
    }
}

//> check if the input param object is empty
function _checkIfIsEmpty(obj) {
    return JSUtils.isEmpty(obj);
}

module.exports = {
    name: "hasRequiredMetaAttributes",
    description: "Check if there is a meta tag with charset, keywords, description, author, copyright attributes defined",
    ruleID: "AX_26",
    tagName: [],
    handler: _ruleExector,
    isGlobal: true
}
