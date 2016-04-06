/* globals window */
'use strict';

//> require jquery
var $ = require('jquery');

//> This file contains numerous utils functionalities that are often required by the rules to check for
module.exports = {

    //> get parent node type from the given Node
    getParentNodeType: function(elem) {
      //> if the given Node is NULL, return
      if (!elem) {
          return null;
      }
      //> Else, continue & check if currentNode is a DOCUMENT_FRAGMENT_NODE
      //> a minimal document object that has no parent
      if (elem.nodeType === window.Node.DOCUMENT_FRAGMENT_NODE) {
          /*jshint -W030 */
          return 'host' in elem ? elem.host : null; //> could be a shadowHost
      }
      //> Else, get the parentNode of the current elem
      var _par = elem.parentNode;
      //> If the parentNode is NULL, return
      if (!_par) {
          return null;
      }
      //> check if parentNode is a DOCUMENT_FRAGMENT_NODE - could be a Shadow DOM
      if (_par.nodeType === window.Node.DOCUMENT_FRAGMENT_NODE) {
          /*jshint -W030 */
          return 'host' in _par ? _par.host : null; //> could be a shadowHost
      }
      //> if its a shadowRoot
      if (!_par.shadowRoot) {
          return _par; //> return the parent
      }
      //> get the insertion points from it
      elem = elem.getDestinationInsertionPoints();
      //> process again
      /*jshint -W030 */
      return (elem.length > 0) ? this.getParentNodeType(elem[elem.length - 1]) : null;
  },

    //> get the parent element of the current element that is audited
    getParentElement: function(elem) {
      //> if current element is NULL, return
      if (!elem) {
          return null;
      }
      //> check for current Node's parent type
      elem = this.getParentNodeType(elem);
      //> if parent Node of current is NULL
      if (!elem) {
          return null;
      }
      //> return either the parent Node, or get its parent if its not an ELEMENT_NODE
      switch (elem.nodeType) {
          //> If the node is an element node, the nodeType property will return 1. This is what we want.
          case window.Node.ELEMENT_NODE:
              return elem;
          //> We don't want attribute or document or DOCTYPE or Text or Comment Node. So go on further and get its parents
          default:
              return this.getParentElement(elem);
      }
  },

    //> check if an element is hidden or not
    isAHiddenElem: function(elem) {

        //> check if the element is part of the current document and not in some iframe etc.,
        if (!(elem instanceof elem.ownerDocument.defaultView.HTMLElement)) {
            return true; //> No! it is not part of the current document and is hidden.
        }

        //> get the style property of the current object
        var style = window.getComputedStyle(elem, null);

        //> if style is visibility:hidden or display:none or aria-hidden is true, then its Hidden
        /*jshint -W030 */
        return (style.display === 'none' || style.visibility === 'hidden') ? true : (elem.hasAttribute('aria-hidden') && elem.getAttribute('aria-hidden').toLowerCase() === 'true') ? true : false;
    },

    //> compute visibility for current element and its container parent recursively
    isVisibilityChainHidden: function(elem) {
        //> check if current element is visibility hidden or display none
        if (this.isAHiddenElem(elem)) {
            return true; //> Yes! the element is hidden!
        }
        //> check if the current element is visible on the view port and is not offset etc.,
        else if (!this.isOnScreenNotHWZeroNotOpaque(elem)) {
            return true; //> Yes! the element is offscreen
        }else if (this.getParentElement(elem)) { //> Else if its visible, check if it has a parent
            return this.isVisibilityChainHidden(this.getParentElement(elem)); //> check if parent is visible
        }else { //> if there is no parent and if its not hidden
            return false; //> NO! the element is not hidden!
        }
    },

    //> get jquery data of events - events wired through jquery is only available here
    getjQueryDataEvents: function(elem) {
        var _eventList = $._data($(elem)[0], 'events');
        var _hasAnyClicks = false;
        /*jshint -W030 */
        if (typeof _eventList !== 'undefined') { //> possible that events attached through addEventListener, .eventType will not be recognized by jquery
            (_eventList.click.length > 0 || _eventList.dblclick.length > 0) ? _hasAnyClicks = true : _hasAnyClicks = false;
        }
        return _hasAnyClicks;
    },

    //> check if clicks or double clicks exists on the current element - they can be wired by jquery or addEventListener or elem.eventType
    //> window.getEventListeners may not always work in all browsers and we need to have a fallback.
    hasClickEvents: function(elem) {
        var _hasClicks = false; //> boolean to hold if any event of type click or double click exists
        /*jshint -W030 */
        if (window.getEventListeners) {
            //> if window.getEventListeners exists. In most browsers it wont
            ('click' in window.getEventListeners(elem) || 'dblclick' in window.getEventListeners(elem)) ? _hasClicks = true : _hasClicks = false;
        }else {
            //> fall back alternative to get the event data, these are natively attached. But, check for jquery bound data as well
            if (typeof elem.onclick === 'function' || typeof elem.click === 'function' || typeof elem.ondblclick === 'function' || typeof elem.dblclick === 'function' || this.getjQueryDataEvents(elem) || elem.getEventListener('click') || elem.getEventListener('dblclick')) {
                _hasClicks = true;
            }
        }
        return _hasClicks; //> return the boolean
    },

    //> check if an element is visible on screen
    isOnScreenNotHWZeroNotOpaque: function(elem) {
        return elem.isVisible();
    },

    //> checks if a visible element is focusable
    //> this checks if element is NOT disabled as well -> disabled elements will be visible but will NOT receive focus
    //> element is not visible if its tabindex attribute is FALSE as well
    //> element should be capable of receiving focus
    isFocusable: function(elem) {
        return elem.hasAttribute('tabindex') && this.canElementReceiveFocus(elem) && elem.disabled;
    },

    //> form elements alone can receive focus
    canElementReceiveFocus: function(elem) {
        //> get the current elements ownerDocument
        var doc = elem.ownerDocument.defaultView;

        //> if the current elements either an <a> or <area> element, it has to have 'href' to receive focus
        if (elem instanceof doc.HTMLAnchorElement || elem instanceof doc.HTMLAreaElement) {
            return elem.hasAttribute('href');
        }

        //> if the current elements either a <input>, <select>, <textarea>, <button>, <iframe>, <option>, <optgroup>
        else if (this.isFormElement(elem)) {
            return elem.disabled;
        }

        //> for other elements - there may be elements which are not form elements
        else {
            if (elem.getAttribute('tabindex').toLowerCase() !== null) {
                //> elements can receive focus programatically for which tabindex of -1 is valid
                //> +ve values of tabindex is a strict NO
                //> although for fresh page loads, one element can have a tabindex of 0 to be the 1st focusable element on page
                /*jshint -W030 */
                elem.getAttribute('tabindex').toLowerCase() === '-1' ? true : (elem.getAttribute('tabindex').toLowerCase() > 0) ? false : true;
            }else {
                return true; //> no value of tabindex is okay!
            }

        }
    },

    //> returns if elem is an instance of any known form elements
    //> label and legend is left out from this list intentionally as they are not focusable
    isFormElement: function(elem) {
        //> get the current elements ownerDocument
        var doc = elem.ownerDocument.defaultView;
        return (
          elem instanceof doc.HTMLInputElement ||
          elem instanceof doc.HTMLSelectElement ||
          elem instanceof doc.HTMLTextAreaElement ||
          elem instanceof doc.HTMLButtonElement ||
          elem instanceof doc.HTMLIFrameElement ||
          elem instanceof doc.HTMLOptionElement ||
          elem instanceof doc.HTMLOptGroupElement ||
          elem instanceof doc.HTMLFieldSetElement
        );
    },
};
