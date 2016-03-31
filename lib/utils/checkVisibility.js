//> function that checks if an element is visible on page and returns false if
//> element has width = 0; height =0;
//> opacity set to 0;
//> element is offscreen
//> another element is absolutely positioned over it
//> element is part of scrollable div and is not in visible AREA
//> element is not in viewport now
module.exports = function() {

    //> function that checks if an element is visible on page
    //> Hook this to every element's prototype
    Element.prototype.isVisible = function() {

        //> this is the current element for which .isVisible() is invoked on
        var _this = this;

        //> get the amount by which the page is scrolled
        var x = window.pageXOffset ? window.pageXOffset + window.innerWidth - 1 : 0,
        y = window.pageYOffset ? window.pageYOffset + window.innerHeight - 1 : 0,

        relative = !!((!x && !y) || !document.elementFromPoint(x, y));

        function inside(child, parent) {
            //> if a child exists and is not NULL
            while (child) {
                //> check if child is same as parent, return TRUE
                if (child === parent) {
                    return true;
                }
                //> else get the parentNode of the child, loop back and see if its same as the child
                child = child.parentNode;
            }
            return false;
        };

        //> check if the document is hidden or if the visibility:hidden, display:none, opacity=0, height=0, width=0
        //> if anyone of the above checks is true, the element is not visible and not worth checking further
        if (
        document.hidden ||
        _this.offsetWidth == 0 ||
        _this.offsetHeight == 0 ||
        _this.style.visibility == 'hidden' ||
        _this.style.display == 'none' ||
        _this.style.opacity === 0
      ) {
            return false;
        }

        //> get the bounding Rectangle for the current element, relative to the viewport
        var rect = _this.getBoundingClientRect();

        if (relative) {
            //> At x = leftDistance of elem from window + (width of elem / 2) and
            //> y = topDistance of elem from window + (height of elem / 2) - get the
            //> corresponding element at this position - if there is an absolute positioned elem at this point
            //> or if there is a div set to scroll with elem within it, then the parent div / absolute positioned
            //> elem gets returned. We need this to know if the elem is visible on the view port
            if (!inside(document.elementFromPoint(rect.left + _this.offsetWidth / 2, rect.top + _this.offsetHeight / 2), _this)) return false;
        } else if (
        !inside(document.elementFromPoint(rect.left + _this.offsetWidth / 2 + window.pageXOffset, rect.top + _this.offsetHeight / 2 + window.pageYOffset), _this) ||
        (
        rect.top + _this.offsetHeight / 2 < 0 ||
        rect.left + _this.offsetWidth / 2 < 0 ||
        rect.bottom - _this.offsetHeight / 2 > (window.innerHeight || document.documentElement.clientHeight) ||
        rect.right - _this.offsetWidth / 2 > (window.innerWidth || document.documentElement.clientWidth)
        )
      ) {
            return false;
        }
        if (window.getComputedStyle || _this.currentStyle) {
            var el = _this,
            comp = null;
            //> loop as long as the current element in the loop has a parent
            while (el) {
                //> if its the documentElement, break away
                if (el === document) {
                    break;
                }
                //> if there are no more parents, break away
                else if (!el.parentNode) {
                    return false;
                }
                //> get the computed style object of the current element in the loop
                comp = window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle;
                //> check for display:none, visibility:hidden, opacity = 0
                if (comp && (comp.visibility == 'hidden' || comp.display == 'none' || (typeof comp.opacity !== 'undefined' && comp.opacity != 1))) {
                    return false;
                }
                //> set the next element for the loop as the current elements parentNode
                el = el.parentNode;
            }
        }
        return true;
    };
};
