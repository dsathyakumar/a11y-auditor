/* globals window, document, Element */
'use strict';
//> function that checks if an element is visible on page and returns false if
//> element has width = 0; height =0;
//> opacity set to 0;
//> element is offscreen
//> another element is absolutely positioned over it
//> element is part of scrollable div and is not in visible AREA
//> element is not in viewport now
module.exports = function() {

    //> function that checks if an element is visible on page
    //> Hook it to the Element.prototype so that its available for any object of type [Element]
    Element.prototype.isVisible = function() {

        //> this is the current element for which the
        var _this = this; var rect;

        function inside(child, parent) {
            //> child if outside the view port will be NULL when checked with document.elementFromPoint
            //> hence it needs to be checked if NULL
            while (child) {
                //> if the current element and the element accessed from the current elements coordinates are the same
                //> then there are no overshadowed elements like overlays / overflows
                if (child === parent) {
                    return true; //> the element is therefore visible and not obscured by other elements
                }
                child = child.parentNode;
            }
            return false;
        }

        //> check if element is in viewport. ALways atleast a half of element must be visible to show as visible.
        //> if the element is above the viewport, the rect.top will be < 0. Add half the height and if (rect.top+height/2) < 0
        //> then, element is above the viewport & is not visible.
        //> If the element is to left of the viewport, then rect.left will be < 0. Add half the width and if (rect.left + width/2) < 0
        //> then, element is left of the viewport & is not visible.
        //> If, rect.bottom - elem.offsetHeight/2 > (window.innerHeight), then it means top half is below the viewport and element is not visible
        //> If, rect.right - elem.offsetWidth/2 > (window.innerWidth), then it means the front half beyond the right of the viewport and element is not visible
        function isOutsideViewPort() {
            //> all the above conditions need to be satsified to confirm the element is outside the viewport
            //> element not visible if even one of the condition is satisified.
            return (
            rect.top + _this.offsetHeight / 2 < 0 ||
            rect.left + _this.offsetWidth / 2 < 0 ||
            rect.bottom - _this.offsetHeight / 2 > (window.innerHeight || document.documentElement.clientHeight) ||
            rect.right - _this.offsetWidth / 2 > (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        //> check if the document object itself is hidden (or)
        //> check if elements width = 0, height = 0;
        //> check if elements opacity = 0;
        //> check if element has visibility : hidden or display : none;
        //> This will not check for inherited styles
        //> It just checks if element has explicity any of these styles
        if (
        document.hidden ||
        _this.offsetWidth === 0 ||
        _this.offsetHeight === 0 ||
        _this.style.visibility === 'hidden' ||
        _this.style.display === 'none' ||
        _this.style.opacity === 0
        ) {
            return false; //> element not visible
        }

        //> get the current elements bounding rectangle coordinates -> top, bottom, left, right, relative to the view port
        //> By viewport we mean that portion of the browser window object that is visible on screen.
        //> Top and Bottom are computed with respect to top edge of browser window.
        //> Left and Right are computed with respoect to left edge of browser window.
        //> This is not relative to the document. Its always with (0,0) set to be window.
        //> So if the document has scrolled a bit, then this value will anyways change and be w.r.t to the latest position according to the browser visible viewport window
        //> But it will return a value for an element on the page and it will always be relative to the window object.
        //> It will also return a value, if the element is not currently in the view port.
        rect = _this.getBoundingClientRect();

        //> At the current elements center (i.e) (left + elementWidth/2, top + elementHeight/2) coordinates, check what element exists
        //> Its always possible that the element exists, but is overshadowed by an absolute positioned element at that point
        //> (or) the current element is part of the scroll of a parent that is overflowed.
        //> If such an element exists, then, only that gets returned.
        //> document.elementFromPoint will return NULL, if the coordinates passed are outside the view port
        //> Then check if element is outside the viewport
        if (!inside(document.elementFromPoint(rect.left + _this.offsetWidth / 2, rect.top + _this.offsetHeight / 2), _this) || isOutsideViewPort()) {
            return false; //> element not visible
        }

        //> check if .getComputedStyle() exists on either the window or the element itself
        //> We need this to check for the current element and all its parents
        //> Its always possible that the given element is visible but its parent has display : none
        //> .getComputedStyle() will check for inherited styles as well.
        if (window.getComputedStyle || _this.currentStyle) {
            var el = _this,
            comp = null;

            //> loop as long as el is an Element and NOT NULL
            while (el) {

                //> if its the documentElement, break away - No point checking it
                if (el === document) {
                    break;
                }

                //> if there are no more parents, break away
                else if (!el.parentNode) {
                    return false;
                }

                //> get the computed style object of the current element in the loop
                comp = window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle;

                //> check for display:none, visibility:hidden, opacity = 0. This checks for inherited style
                if (comp && (comp.visibility === 'hidden' || comp.display === 'none' || (typeof comp.opacity !== 'undefined' && comp.opacity !== 1))) {
                    return false;
                }

                //> if current element is Visible, check its parent
                el = el.parentNode;
            }
        }
        return true; //> element is visible and so return TRUE
    };
};
