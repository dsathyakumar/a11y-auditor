/***************************************************************************************
 * some basic JS checkers built in here as part of this module
 * @param
 * @return an object with exposed functions
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

 }("JSUtils", "axs", {}, function() {

   var x = Array.isArray,
       r = {},
       u = Object.prototype,
       l = u.toString,
       f = u.hasOwnProperty,
       w = Object.keys,
       e = Array.prototype,
       s = e.forEach;

   return {
       isArray: x || function(n) {
           return "[object Array]" == l.call(n);
       },
       isObject: function(n) {
           return n === Object(n);
       },
       isString: function(n) {
           return n === String(n);
       },
       isEmpty: function(n) {
           if (null == n) return !0;
           if (this.isArray(n) || this.isString(n)) return 0 === n.length;
           for (var t in n)
               if (this.has(n, t)) return !1;
           return !0;
       },
       has: function(n, t) {
           return f.call(n, t)
       },
       isNull: function(n) {
           return null === n
       },
       isUndefined: function(n) {
           return n === void 0
       },
       isNaN: function(n) {
           return this.isNumber(n) && n != +n
       },
       isNumber: function(t) {
           return l.call(t) == "[object " + "Number" + "]"
       },
       isBoolean: function(n) {
           return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
       },
       getKeys: w || function(n) {
           if (n !== Object(n)) throw new TypeError("Invalid object");
           var t = [];
           for (var r in n) this.has(n, r) && t.push(r);
           return t
       },
       each: function(n, t, e) {
           if (null != n)
               if (s && n.forEach === s) n.forEach(t, e);
               else if (n.length === +n.length) {
               for (var u = 0, i = n.length; i > u; u++)
                   if (t.call(e, n[u], u, n) === r) return
           } else
               for (var a = this.getKeys(n), u = 0, i = a.length; i > u; u++)
                   if (t.call(e, n[a[u]], a[u], n) === r) return
       }
   }
 }));
