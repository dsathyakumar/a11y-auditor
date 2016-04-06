/* globals window */
'use strict';

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Any element that has click, double click handlers must be focusable"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

//> require the accessibility utils
var accessibilityUtils = require('../utils/accessibilityUtils');

//> require the result enums
var enums = require('../enums/enums');

//> start of impl- this code is exported
function _ruleExector(elem) {

    //> load the severityEnum to report for issues
    var _severityEnum = enums.severityEnum;

    //> check for element clicks
    var _hasClicks = accessibilityUtils.hasClickEvents(elem);

    //> check for element focus
    var _isFocusable = accessibilityUtils.isFocusable(elem);

    //> check if the element is a BODY element of the current owner Document.
    //> There is no need to check for clicks for it as events anyways bubble up and <body> is not going to be hidden
    if (elem instanceof elem.ownerDocument.defaultView.HTMLBodyElement) {
        return {
            TYPE: _severityEnum.INFO,
            RESULT: true,
            MSG: 'Passed! This element is the ownerDocument <body> element and does not require to be checked!'
        };
    }
    //> Not BODY, so, check for visibility of the current element chain here - meaning scan its parents as well
    else if (accessibilityUtils.isVisibilityChainHidden(elem)) {
        //> the element is hidden here. No need to check if its focusable. Just check its events status,
        //> if it has any events like click & double click, it may not be possible to trigger
        //> So just alert the user via a WARNING
        if (_hasClicks) {
            return {
                TYPE: _severityEnum.WARN,
                RESULT: true,
                MSG: 'Warning! This element has click type events, but, is not visible (or) is a nested inside an invisible parent (or) is obscured and thus may not be focusable!'
            };
        }
        //> There are no events of type click or double click attached to these hidden elements.
        //> No one bothers if this is hidden as there are no events to it anyways
        else {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: 'Passed! The element is NOT visible (or) is being obscured and also has no click type events!'
            };
        }
    }
    //> the element is not <body>, and is visible, ideally clicks should trigger, if there are any.
    //> But its possible that it cannot be focusable since there may be other elements preventing it from receiving focus
    //> So, any element that is visible and has click type events attached to it, but is not focusable must be ERRORS
    else if (_hasClicks && !_isFocusable(elem)) {
        return {
            TYPE: _severityEnum.ERROR,
            RESULT: false,
            MSG: 'Failed! The element is visible, has click events but can not receive focus!'
        };
    }
    //> element is not type <body>, its visible, and doesn't have any click type events. everyone's happy! But is it detached ?
    else {
        //> cases where the ownerDocument does not match - bizarre cases of elements inside an iframe of the parentWindow
        if (elem.ownerDocument.defaultView !== window.document.defaultView) {
            return {
                TYPE: _severityEnum.WARN,
                RESULT: true,
                MSG: 'Warning! This element has an ownerDocument that doesnt match with the window object. This may be part of an iframe or an XML response partial or a detached DOM fragment. The results may not be accurate!'
            };
        }else {
            return {
                TYPE: _severityEnum.INFO,
                RESULT: true,
                MSG: 'Passed! element is visible and focusable'
            };
        }
    }
} //> end of impl

//> this is what is exported by this module
module.exports = {
    name: 'isFocusibleOnClickAndDoubleClick',
    description: 'Any element that has click, double click handlers must be focusable and should not be overshadowed by others. Elements which are visible',
    ruleID: 'AX_36',
    tagName: ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'AREA', 'A', 'DIV', 'SPAN', 'P', 'IMG'],
    handler: _ruleExector,
    isGlobal: false
};
