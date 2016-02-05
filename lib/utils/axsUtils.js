/***************************************************************************************
 * dependency injection for rules creation
 * @param
 * @return an object with exposed functions
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

 }("axsUtils", "axs.utils", {"enums":"axs.enums"}, function(enums) {

   function _addAllParentRolesToSet (a, b) {
       if (a.parent) {
           for (var c = a.parent, d = 0; d < c.length; d++) {
               var e = c[d];
               b[e] = !0;
               _addAllParentRolesToSet(enums.ariaRolesEnum[e], b);
           }
       }
   }

   function _addAllPropertiesToSet(a, b, c) {
       var d = a[b];
       if (d) {
           for (var e = 0; e < d.length; e++) {
               c[d[e]] = !0;
           }
       }
       if (a.parent) {
           for (a = a.parent, d = 0; d < a.length; d++) {
               _addAllPropertiesToSet(enums.ariaRolesEnum[a[d]], b, c);
           }
       }
   }

   for (var roleName in enums.ariaRolesEnum) {
       var role = enums.ariaRolesEnum[roleName],
           propertiesSet = {},
           requiredPropertiesSet = {},
           parentRolesSet = {};

       _addAllPropertiesToSet(role, "properties", propertiesSet);
       role.propertiesSet = propertiesSet;

       _addAllPropertiesToSet(role, "requiredProperties", requiredPropertiesSet);
       role.requiredPropertiesSet = requiredPropertiesSet;

       _addAllParentRolesToSet(role, parentRolesSet);
       role.allParentRolesSet = parentRolesSet;

       "widget" in parentRolesSet && (enums.widgetRolesEnum[roleName] = role);
   }

   for (var a in enums.ariaPropertiesEnum) {
     var b = enums.ariaPropertiesEnum[a];
     if (b.values) {
         for (var c = {}, d = 0; d < b.values.length; d++) {
             c[b.values[d]] = !0;
         }
         b.valuesSet = c;
     }
   }

   enums.globalPropertiesEnum = enums.ariaRolesEnum.roletype.propertiesSet;

 return {

     getTextFromHostLanguageAttributes : function(a, b, c, d) {
         if (this.matchSelector(a, "img") && a.hasAttribute("alt")) {
             var e = {
                 type: "string",
                 valid: !0
             };
             e.text = a.getAttribute("alt");
             c ? e.unused = !0 : c = e.text;
             b.alt = e;
         }
         if (this.matchSelector(a, 'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), video:not([disabled])') && !d) {
             if (a.hasAttribute("id")) {
                 d = document.querySelectorAll('label[for="' + a.id + '"]');
                 for (var e = {}, f = [], g = [], h = 0; h < d.length; h++) {
                     var k = {
                             type: "element"
                         },
                         m = d[h],
                         l = this.findTextAlternatives(m, {}, !0);
                     l && 0 < l.trim().length && (k.text = l.trim(), g.push(l.trim()));
                     k.element = m;
                     f.push(k);
                 }
                 0 < f.length && (f[f.length - 1].last = !0, e.values = f, e.text = g.join(" "), e.lastWord = this.getLastWord(e.text), c ? e.unused = !0 : c = e.text, b.labelFor = e);
             }
             d = this.parentElement(a);
             for (e = {}; d;) {
                 if ("label" == d.tagName.toLowerCase() && (f = d, f.control == a)) {
                     e.type = "element";
                     e.text = this.findTextAlternatives(f, {}, !0);
                     e.lastWord = this.getLastWord(e.text);
                     e.element = f;
                     break;
                 }
                 d = this.parentElement(d);
             }
             e.text && (c ? e.unused = !0 : c = e.text, b.labelWrapped = e);
             this.matchSelector(a, 'input[type="image"]') && a.hasAttribute("alt") && (e = {
                 type: "string",
                 valid: !0
             }, e.text = a.getAttribute("alt"), c ? e.unused = !0 : c = e.text, b.alt = e);
             Object.keys(b).length || (b.noLabel = !0);
         }
         return c;
     },

     asElement : function(a) {
         switch (a.nodeType) {
             case Node.COMMENT_NODE:
                 break;
             case Node.ELEMENT_NODE:
                 if ("script" == a.localName || "template" == a.localName) {
                     break;
                 }
                 return a;
             case Node.DOCUMENT_FRAGMENT_NODE:
                 return a.host;
             case Node.TEXT_NODE:
                 return this.parentElement(a);
             default:
                 console.warn("Unhandled node type: ", a.nodeType);
         }
         return null;
     },

     shadowHost : function(a) {
         return "host" in a ? a.host : null;
     },

     composedParentNode : function(a) {
         if (!a) {
             return null;
         }
         if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
             return this.shadowHost(a);
         }
         var b = a.parentNode;
         if (!b) {
             return null;
         }
         if (b.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
             return this.shadowHost(b);
         }
         if (!b.shadowRoot) {
             return b;
         }
         a = a.getDestinationInsertionPoints();
         return 0 < a.length ? this.composedParentNode(a[a.length - 1]) : null;
     },

     parentElement : function(a) {
         if (!a) {
             return null;
         }
         a = this.composedParentNode(a);
         if (!a) {
             return null;
         }
         switch (a.nodeType) {
             case Node.ELEMENT_NODE:
                 return a;
             default:
                 return this.parentElement(a);
         }
     },

     isElementHidden : function(a) {
         if (!(a instanceof a.ownerDocument.defaultView.HTMLElement)) {
             return !1;
         }
         if (a.hasAttribute("chromevoxignoreariahidden")) {
             var b = !0
         }
         var c = window.getComputedStyle(a, null);
         return "none" == c.display || "hidden" == c.visibility ? !0 : a.hasAttribute("aria-hidden") && "true" == a.getAttribute("aria-hidden").toLowerCase() ? !b : !1;
     },

     isElementOrAncestorHidden : function(a) {
         return this.isElementHidden(a) ? !0 : this.parentElement(a) ? this.isElementOrAncestorHidden(this.parentElement(a)) : !1;
     },

     getLastWord : function(a) {
         if (!a) {
             return null;
         }
         var b = a.lastIndexOf(" ") + 1,
             c = a.length - 10;
         return a.substring(b > c ? b : c);
     },

     elementIsHtmlControl : function(a) {
         var b = a.ownerDocument.defaultView;
         return a instanceof b.HTMLButtonElement || a instanceof b.HTMLInputElement || a instanceof b.HTMLSelectElement || a instanceof b.HTMLTextAreaElement ? !0 : !1;
     },

     getTextFromAriaLabelledby : function(a, b) {
         var c = null;
         if (!a.hasAttribute("aria-labelledby")) {
             return c;
         }
         for (var d = a.getAttribute("aria-labelledby").split(/\s+/), e = {
                 valid: !0
             }, f = [], g = [], h = 0; h < d.length; h++) {
             var k = {
                     type: "element"
                 },
                 m = d[h];
             k.value = m;
             var l = document.getElementById(m);
             l ? (k.valid = !0, k.text = this.findTextAlternatives(l, {}, !0, !0), k.lastWord = this.getLastWord(k.text), f.push(k.text), k.element = l) : (k.valid = !1, e.valid = !1, k.errorMessage = {
                 messageKey: "noElementWithId",
                 args: [m]
             });
             g.push(k);
         }
         0 < g.length && (g[g.length - 1].last = !0, e.values = g, e.text = f.join(" "), e.lastWord = this.getLastWord(e.text), c = e.text, b.ariaLabelledby = e);
         return c;
     },

     elementIsAriaWidget : function(a) {
         return a.hasAttribute("role") && (a = a.getAttribute("role")) && (a = enums.ariaRolesEnum[a]) && "widget" in a.allParentRolesSet ? !0 : !1;
     },

     findTextAlternatives : function(a, b, c, d) {
         var e = c || !1;
         c = this.asElement(a);
         if (!c || !d && this.isElementOrAncestorHidden(c)) {
             return null;
         }
         if (a.nodeType == Node.TEXT_NODE) {
             return c = {
                 type: "text"
             }, c.text = a.textContent, c.lastWord = this.getLastWord(c.text), b.content = c, a.textContent;
         }
         a = null;
         e || (a = this.getTextFromAriaLabelledby(c, b));
         if (c.hasAttribute("aria-label")) {
             var f = {
                 type: "text"
             };
             f.text = c.getAttribute("aria-label");
             f.lastWord = this.getLastWord(f.text);
             a ? f.unused = !0 : e && this.elementIsHtmlControl(c) || (a = f.text);
             b.ariaLabel = f;
         }
         c.hasAttribute("role") && "presentation" == c.getAttribute("role") || (a = this.getTextFromHostLanguageAttributes(c, b, a, e));
         if (e && this.elementIsHtmlControl(c)) {
             f = c.ownerDocument.defaultView;
             if (c instanceof f.HTMLInputElement) {
                 var g = c;
                 "text" == g.type && g.value && 0 < g.value.length && (b.controlValue = {
                     text: g.value
                 });
                 "range" == g.type && (b.controlValue = {
                     text: g.value
                 });
             }
             c instanceof f.HTMLSelectElement && (b.controlValue = {
                 text: c.value
             });
             b.controlValue && (f = b.controlValue, a ? f.unused = !0 : a = f.text);
         }
         if (e && this.elementIsAriaWidget(c)) {
             e = c.getAttribute("role");
             "textbox" == e && c.textContent && 0 < c.textContent.length && (b.controlValue = {
                 text: c.textContent
             });
             if ("slider" == e || "spinbutton" == e) {
                 c.hasAttribute("aria-valuetext") ? b.controlValue = {
                     text: c.getAttribute("aria-valuetext")
                 } : c.hasAttribute("aria-valuenow") && (b.controlValue = {
                     value: c.getAttribute("aria-valuenow"),
                     text: "" + c.getAttribute("aria-valuenow")
                 });
             }
             if ("menu" == e) {
                 for (var h = c.querySelectorAll("[role=menuitemcheckbox], [role=menuitemradio]"), f = [], g = 0; g < h.length; g++) {
                     "true" == h[g].getAttribute("aria-checked") && f.push(h[g]);
                 }
                 if (0 < f.length) {
                     h = "";
                     for (g = 0; g < f.length; g++) {
                         h += this.findTextAlternatives(f[g], {}, !0), g < f.length - 1 && (h += ", ");
                     }
                     b.controlValue = {
                         text: h
                     };
                 }
             }
             if ("combobox" == e || "select" == e) {
                 b.controlValue = {
                     text: "TODO"
                 };
             }
             b.controlValue && (f = b.controlValue, a ? f.unused = !0 : a = f.text);
         }
         f = !0;
         c.hasAttribute("role") && (e = c.getAttribute("role"), (e = enums.ariaRolesEnum[e]) && (!e.namefrom || 0 > e.namefrom.indexOf("contents")) && (f = !1));
         (d = this.getTextFromDescendantContent(c, d)) && f && (e = {
             type: "text"
         }, e.text = d, e.lastWord = this.getLastWord(e.text), a ? e.unused = !0 : a = d, b.content = e);
         c.hasAttribute("title") && (d = {
             type: "string",
             valid: !0
         }, d.text = c.getAttribute("title"), d.lastWord = this.getLastWord(d.lastWord), a ? d.unused = !0 : a = d.text, b.title = d);
         return 0 == Object.keys(b).length && null == a ? null : a;
     },

     getTextFromDescendantContent : function(a, b) {
         for (var c = a.childNodes, d = [], e = 0; e < c.length; e++) {
             var f = this.findTextAlternatives(c[e], {}, !0, b);
             f && d.push(f.trim());
         }
         if (d.length) {
             c = "";
             for (e = 0; e < d.length; e++) {
                 c = [c, d[e]].join(" ").trim();
             }
             return c;
         }
         return null;
     },

     isValidIDRefValue : function(a, b) {
         return 0 == a.length ? {
             valid: !0,
             idref: a
         } : b.ownerDocument.getElementById(a) ? {
             valid: !0,
             idref: a
         } : {
             valid: !1,
             idref: a,
             reason: 'No element with ID "' + a + '"'
         };
     },

     //checks if an element can take ARIA attributes
     checkForAria : function (el) {
         if (!el) {
             return null;
         }
         var tagName = el.tagName;
         if (!tagName) {
             return null;
         }
         tagName = tagName.toUpperCase();
         tagName = enums.TagAndSemanticInfoEnum[tagName];
         if (!tagName || !tagName.length) {
             return null;
         }
         for (var _res = null, _count = 0; _count < tagName.length; _count++) {
             var _obj = tagName[_count];
             if (_obj.selector) {
                 if (this.matchSelector(el, _obj.selector)) {
                     return _obj;
                 }
             } else {
                 _res = _obj;
             }
         }
         return _res;
     },

     getAriaPropertyValue : function(a, b, c) {
         var d = a.replace(/^aria-/, ""),
             e = enums.ariaPropertiesEnum[d],
             d = {
                 name: a,
                 rawValue: b
             };
         if (!e) {
             return d.valid = !1, d.reason = '"' + a + '" is not a valid ARIA property', d;
         }
         e = e.valueType;
         if (!e) {
             return d.valid = !1, d.reason = '"' + a + '" is not a valid ARIA property', d;
         }
         switch (e) {
             case "idref":
                 a = this.isValidIDRefValue(b, c), d.valid = a.valid, d.reason = a.reason, d.idref = a.idref;
             case "idref_list":
                 a = b.split(/\s+/);
                 d.valid = !0;
                 for (b = 0; b < a.length; b++) {
                     e = this.isValidIDRefValue(a[b], c), e.valid || (d.valid = !1), d.values ? d.values.push(e) : d.values = [e];
                 }
                 return d;
             case "integer":
                 c = this.isValidNumber(b);
                 if (!c.valid) {
                     return d.valid = !1, d.reason = c.reason, d;
                 }
                 Math.floor(c.value) !== c.value ? (d.valid = !1, d.reason = "" + b + " is not a whole integer") : (d.valid = !0, d.value = c.value);
                 return d;
             case "decimal":
                 ;
             case "number":
                 c = this.isValidNumber(b);
                 d.valid = c.valid;
                 if (!c.valid) {
                     return d.reason = c.reason, d;
                 }
                 d.value = c.value;
                 return d;
             case "string":
                 return d.valid = !0, d.value = b, d;
             case "token":
                 return c = this.isValidTokenValue(a, b.toLowerCase()), c.valid ? (d.valid = !0, d.value = c.value) : (d.valid = !1, d.value = b, d.reason = c.reason), d;
             case "token_list":
                 e = b.split(/\s+/);
                 d.valid = !0;
                 for (b = 0; b < e.length; b++) {
                     c = this.isValidTokenValue(a, e[b].toLowerCase()), c.valid || (d.valid = !1, d.reason ? (d.reason = [d.reason], d.reason.push(c.reason)) : (d.reason = c.reason, d.possibleValues = c.possibleValues)), d.values ? d.values.push(c.value) : d.values = [c.value];
                 }
                 return d;
             case "tristate":
                 return c = this.isPossibleValue(b.toLowerCase(), enums.mixedValuesEnum, a), c.valid ? (d.valid = !0, d.value = c.value) : (d.valid = !1, d.value = b, d.reason = c.reason), d;
             case "boolean":
                 return c = this.isValidBoolean(b), c.valid ? (d.valid = !0, d.value = c.value) : (d.valid = !1, d.value = b, d.reason = c.reason), d;
         }
         d.valid = !1;
         d.reason = "Not a valid ARIA property";
         return d;
     },

     isValidTokenValue : function(a, b) {
         var c = a.replace(/^aria-/, "");
         return this.isPossibleValue(b, enums.ariaPropertiesEnum[c].valuesSet, a);
     },

     isPossibleValue : function(a, b, c) {
         return b[a] ? {
             valid: !0,
             value: a
         } : {
             valid: !1,
             value: a,
             reason: '"' + a + '" is not a valid value for ' + c,
             possibleValues: Object.keys(b)
         };
     },

     isValidBoolean : function(a) {
         try {
             var b = JSON.parse(a);
         } catch (c) {
             b = "";
         }
         return "boolean" != typeof b ? {
             valid: !1,
             value: a,
             reason: '"' + a + '" is not a true/false value'
         } : {
             valid: !0,
             value: b
         };
     },

     getImplicitRole : function(b) {
         return (b = this.checkForAria(b)) ? b.role : "";
     },

     getRoles : function(a, b) {
         if (!a || a.nodeType !== Node.ELEMENT_NODE || !a.hasAttribute("role") && !b) {
             return null;
         }
         var c = a.getAttribute("role");
         !c && b && (c = this.getImplicitRole(a));
         if (!c) {
             return null;
         }
         for (var c = c.split(" "), d = {
                 roles: [],
                 valid: !1
             }, e = 0; e < c.length; e++) {
             var f = c[e],
                 g = enums.ariaRolesEnum[f],
                 f = {
                     name: f
                 };
             g && !g.abstract ? (f.details = g, d.applied || (d.applied = f), f.valid = d.valid = !0) : f.valid = !1;
             d.roles.push(f);
         }
         return d;
     },

     values : function(a) {
         var b = [],
             c;
         for (c in a) {
             a.hasOwnProperty(c) && "function" != typeof a[c] && b.push(a[c]);
         }
         return b;
     },

     getAriaProperties : function(a) {
         var b = {},
             c = this.getGlobalAriaProperties(a),
             d;
         for (d in enums.ariaPropertiesEnum) {
             var e = "aria-" + d;
             if (a.hasAttribute(e)) {
                 var f = a.getAttribute(e);
                 c[e] = this.getAriaPropertyValue(e, f, a);
             }
         }
         0 < Object.keys(c).length && (b.properties = this.values(c));
         f = this.getRoles(a);
         if (!f) {
             return Object.keys(b).length ? b : null;
         }
         b.roles = f;
         if (!f.valid || !f.roles) {
             return b;
         }
         for (var e = f.roles, g = 0; g < e.length; g++) {
             var h = e[g];
             if (h.details && h.details.propertiesSet) {
                 for (d in h.details.propertiesSet) {
                     d in c || (a.hasAttribute(d) ? (f = a.getAttribute(d), c[d] = this.getAriaPropertyValue(d, f, a), "values" in c[d] && (f = c[d].values, f[f.length - 1].isLast = !0)) : h.details.requiredPropertiesSet[d] && (c[d] = {
                         name: d,
                         valid: !1,
                         reason: "Required property not set"
                     }));
                 }
             }
         }
         0 < Object.keys(c).length && (b.properties = this.values(c));
         return 0 < Object.keys(b).length ? b : null;
     },


     getGlobalAriaProperties : function(a) {
         var b = {},
             c;
         for (c in enums.globalPropertiesEnum) {
             if (a.hasAttribute(c)) {
                 var d = a.getAttribute(c);
                 b[c] = this.getAriaPropertyValue(c, d, a);
             }
         }
         return b;
     },

     matchSelector : function(a, b) {
       return a.matches ? a.matches(b) : a.webkitMatchesSelector ? a.webkitMatchesSelector(b) : a.mozMatchesSelector ? a.mozMatchesSelector(b) : a.msMatchesSelector ? a.msMatchesSelector(b) : !true;
     },

     isValidNumber : function(a) {
         var b = {
             valid: !1,
             value: a,
             reason: '"' + a + '" is not a number'
         };
         if (!a) {
             return b;
         }
         if (/^0x/i.test(a)) {
             return b.reason = '"' + a + '" is not a decimal number', b;
         }
         a *= 1;
         return isFinite(a) ? {
             valid: !0,
             value: a
         } : b;
     }

 };


 }));
