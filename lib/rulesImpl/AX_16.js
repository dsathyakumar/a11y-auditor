/* globals document */
'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid Deprecated features of W3C technologies"
 * Deprecated elements are "FONT", "BASEFONT", "APPLET", "CENTER", "DIR", "ISINDEX", "MENU", "S", "STRIKE", "U"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

var enums = require("../enums/enums");

function _ruleExector() {
    var _severityEnum = enums.severityEnum,
        font = document.getElementsByTagName('FONT').length,
        basefont = document.getElementsByTagName('BASEFONT').length,
        applet = document.getElementsByTagName('APPLET').length,
        center = document.getElementsByTagName('CENTER').length,
        dir = document.getElementsByTagName('DIR').length,
        isindex = document.getElementsByTagName('ISINDEX').length,
        menu = document.getElementsByTagName('MENU').length,
        s = document.getElementsByTagName('S').length,
        strike = document.getElementsByTagName('STRIKE').length,
        underline = document.getElementsByTagName('U').length;

    var hasDeprecatedElems = (font > 0 || basefont > 0 || applet > 0 || center > 0 || dir > 0 || isindex > 0 || menu > 0 || s > 0 || strike > 0 || underline > 0);

    if(hasDeprecatedElems){
      return {
          TYPE: _severityEnum.ERROR,
          RESULT: false,
          MSG: "Failed! There are Deprecated elements being used which are not part of W3C technologies"
      };
    }else{
      return {
          TYPE: _severityEnum.INFO,
          RESULT: true,
          MSG: "Passed! There are NO Deprecated elements being used"
      };
    }

}

module.exports = {
    name: "isDeprecatedElement",
    description: "Avoid Deprecated features of W3C technologies",
    ruleID: "AX_16",
    tagName: [],
    handler: _ruleExector,
    isGlobal: true
};
