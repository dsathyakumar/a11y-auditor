
 (function(moduleName, factory){

    //for both AMD and non-AMD plain scripts cases [window] exists
    if(typeof window!== "undefined"){
      window[moduleName] = window[moduleName] || {};
      window[moduleName] = factory;
    }else { //Node / common JS style
      __allyRoot[moduleName] = __allyRoot[moduleName] || {};
      __allyRoot[moduleName] = factory;
    }

 }("umdLoader", function(moduleName, ctxToAdd, dependenciesObj, factory) {

   //> utils to resolve deps based on an object graph
   var dependencyResolver = function(_c, _p) {
       for (var i = 0, _p = _p.split('.'), len = _p.length; i < len; i++) {
           if (!_c || typeof _c !== 'object') return null;
           if(_c[_p[i]]){
              _c = _c[_p[i]];
           }else{
             _c[_p[i]] = {};
             _c = _c[_p[i]];
           }
       }
       if (_c === 'undefined') return null;
       return _c;
   };

   if(typeof define === 'function' && define.amd){
       if (moduleName != null || moduleName != "") {
           var dependencies = [];
           for (var key in dependenciesObj) {
               dependencies.push(key);
           }
           define(moduleName, dependencies, factory);
       } else {
           throw new Error("Module ID is missing! Cannot create a module");
       }
   } else if (typeof exports === 'object' && typeof module === 'object'){
       if (moduleName != null || moduleName != "") {
           var dependencies = [], pathsConfig;
           for (var key in dependenciesObj) {
               var depObjPath = __allyRoot.pathsConfig[key];
               dependencies.push(__allyRoot.dirname + depObjPath);
           }
           //common js style require of each dependency in the array
           dependencies = dependencies.map(require);
           return factory.apply(global, dependencies);
       }
   } else{
       var dependencies = [],
           _tmpObjGraph, ctx = window;

        //build the dependencies from the object graph of dependencies
       for (var key in dependenciesObj) {
           _tmpObjGraph = dependenciesObj[key];
           dependencies.push(dependencyResolver(ctx, _tmpObjGraph));
       }

       //when self-loading the umdLoader itself
       if(ctxToAdd!==null && ctxToAdd!==""){
         //build the context to add to for the case of browser [window]
         ctxToAdd = dependencyResolver(ctx,ctxToAdd);
         ctxToAdd[moduleName] = factory.apply(ctx, dependencies);
       }else{
           factory.apply(ctx, dependencies);
       }
   }

 }));

define("umdLoader", function(){});

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

define("JSUtils", function(){});

/***************************************************************************************
 * build the auditRules util that exposes method to add rules. This is a ruleID <-> handler mapper
 * @param
 * @return an object with 3 exposed functions
 **/

(function(moduleName, ctxToAdd, dependenciesObj, factory){

  if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }else{
     umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }

}("ruleHandlerMapper", "axs.ruleUtils", {}, function() {

    var _ruleHandlersList = {}; //> is an Object containing auditRules & handlers

    //> This function provides an interface to create the rule
    function _addHandlerForRule(_rule, _handlerFn) {
        _ruleHandlersList[_rule] = _handlerFn;
    }

    //> provide an interface to get the auditRules
    function _getRuleHandlersList() {
        return _ruleHandlersList;
    }

    function _getHandler(_rule) {
        return _ruleHandlersList[_rule];
    }

    //> return using the revealing module pattern
    return {
        addRuleHandler: _addHandlerForRule,
        getRuleHandlersList: _getRuleHandlersList,
        getHandler: _getHandler
    }
}));

define("ruleHandlerMapper", function(){});

/***************************************************************************************
 * This is a mapper function that maps a TAG to an array of Rules that need to be run on it
 * @param globalContext of the environment
 * @return an object with 3 exposed functions
 **/

(function(moduleName, ctxToAdd, dependenciesObj, factory){

  if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }else{
     umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }

}("ruleTagNameMapper", "axs.ruleUtils", {}, function() {

  //> is an Object <Tag> : ['Rule1', 'Rule2']
  var _ruleTagHandlers = {};

  //> This function provides an interface to create the rule
  function _addRuleToTag(_tag, _rule) {
      var _rulesArr;
      //either get the array corresponding to the tag. If its empty,
      _ruleTagHandlers[_tag] = _ruleTagHandlers[_tag] || [];
      _rulesArr = _ruleTagHandlers[_tag];
      _rulesArr.push(_rule); //push the rule into the array of rules
  }

  //> provide an interface to get the list of Tags and the corresponding array of handlers
  function _getRuleTagHandlers() {
      return _ruleTagHandlers;
  }

  //>returns an array of rules for the corresponding tag
  function _getTagHandlers(_tag) {
      return _ruleTagHandlers[_tag];
  }

  //> return using the revealing module pattern
  return {
      addRuleToTag: _addRuleToTag,
      getRuleTagHandlers: _getRuleTagHandlers,
      getTagHandlers: _getTagHandlers
  }

}));

define("ruleTagNameMapper", function(){});

/***************************************************************************************
 * This is a simple immutable enumCreator
 * @param obj that needs to be made as an Enum
 * @return an Enum Generator function
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

 }("enumCreator", "axs.utils", {}, function() {

   function EnumGen(obj) {
       var _obj = {};
       if (arguments.length === 1 && obj !== null && typeof obj === "object") {
           Object.keys(obj).forEach(function(name) {
               _obj[name] = obj[name];
           }, _obj);
       } else {
           throw new Error("Mention a proper enum configuration !");
       }
       Object.freeze(_obj);
       return _obj;
   }
   //disabling mutable object prototypes
   EnumGen.prototype = Object.create(null);
   //freezing the prototype
   Object.freeze(EnumGen.prototype);

   return EnumGen; //> return the enum constructor

 }));

define("enumCreator", function(){});

(function(moduleName, ctxToAdd, dependenciesObj, factory){

  if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }else{
     umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }

}("enums", "axs", {"enumCreator" : "axs.utils.enumCreator"}, function(enumCreator) {

  var enums = {};

  enums.widgetRolesEnum = new enumCreator({
  });

  enums.severityEnum = new enumCreator({
      INFO: "info",
      WARN: "warning",
      ERROR: "error"
  });

  enums.mixedValuesEnum = new enumCreator({
        "true": !0,
        "false": !0,
        mixed: !0
  });

  enums.ariaRolesEnum = new enumCreator({
        alert: {
            namefrom: ["author"],
            parent: ["region"]
        },
        alertdialog: {
            namefrom: ["author"],
            namerequired: !0,
            parent: ["alert", "dialog"]
        },
        application: {
            namefrom: ["author"],
            namerequired: !0,
            parent: ["landmark"]
        },
        article: {
            namefrom: ["author"],
            parent: ["document", "region"]
        },
        banner: {
            namefrom: ["author"],
            parent: ["landmark"]
        },
        button: {
            childpresentational: !0,
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["command"],
            properties: ["aria-expanded", "aria-pressed"]
        },
        checkbox: {
            namefrom: ["contents",
                "author"
            ],
            namerequired: !0,
            parent: ["input"],
            requiredProperties: ["aria-checked"],
            properties: ["aria-checked"]
        },
        columnheader: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["gridcell", "sectionhead", "widget"],
            properties: ["aria-sort"],
            scope: ["row"]
        },
        combobox: {
            mustcontain: ["listbox", "textbox"],
            namefrom: ["author"],
            namerequired: !0,
            parent: ["select"],
            requiredProperties: ["aria-expanded"],
            properties: ["aria-expanded", "aria-autocomplete", "aria-required"]
        },
        command: {
            "abstract": !0,
            namefrom: ["author"],
            parent: ["widget"]
        },
        complementary: {
            namefrom: ["author"],
            parent: ["landmark"]
        },
        composite: {
            "abstract": !0,
            childpresentational: !1,
            namefrom: ["author"],
            parent: ["widget"],
            properties: ["aria-activedescendant"]
        },
        contentinfo: {
            namefrom: ["author"],
            parent: ["landmark"]
        },
        definition: {
            namefrom: ["author"],
            parent: ["section"]
        },
        dialog: {
            namefrom: ["author"],
            namerequired: !0,
            parent: ["window"]
        },
        directory: {
            namefrom: ["contents", "author"],
            parent: ["list"]
        },
        document: {
            namefrom: [" author"],
            namerequired: !0,
            parent: ["structure"],
            properties: ["aria-expanded"]
        },
        form: {
            namefrom: ["author"],
            parent: ["landmark"]
        },
        grid: {
            mustcontain: ["row", "rowgroup"],
            namefrom: ["author"],
            namerequired: !0,
            parent: ["composite", "region"],
            properties: ["aria-level", "aria-multiselectable", "aria-readonly"]
        },
        gridcell: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["section", "widget"],
            properties: ["aria-readonly", "aria-required", "aria-selected"],
            scope: ["row"]
        },
        group: {
            namefrom: [" author"],
            parent: ["section"],
            properties: ["aria-activedescendant"]
        },
        heading: {
            namerequired: !0,
            parent: ["sectionhead"],
            properties: ["aria-level"]
        },
        img: {
            childpresentational: !0,
            namefrom: ["author"],
            namerequired: !0,
            parent: ["section"]
        },
        input: {
            "abstract": !0,
            namefrom: ["author"],
            parent: ["widget"]
        },
        landmark: {
            "abstract": !0,
            namefrom: ["contents", "author"],
            namerequired: !1,
            parent: ["region"]
        },
        link: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["command"],
            properties: ["aria-expanded"]
        },
        list: {
            mustcontain: ["group", "listitem"],
            namefrom: ["author"],
            parent: ["region"]
        },
        listbox: {
            mustcontain: ["option"],
            namefrom: ["author"],
            namerequired: !0,
            parent: ["list", "select"],
            properties: ["aria-multiselectable", "aria-required"]
        },
        listitem: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["section"],
            properties: ["aria-level", "aria-posinset", "aria-setsize"],
            scope: ["list"]
        },
        log: {
            namefrom: [" author"],
            namerequired: !0,
            parent: ["region"]
        },
        main: {
            namefrom: ["author"],
            parent: ["landmark"]
        },
        marquee: {
            namerequired: !0,
            parent: ["section"]
        },
        math: {
            childpresentational: !0,
            namefrom: ["author"],
            parent: ["section"]
        },
        menu: {
            mustcontain: ["group", "menuitemradio", "menuitem", "menuitemcheckbox"],
            namefrom: ["author"],
            namerequired: !0,
            parent: ["list", "select"]
        },
        menubar: {
            namefrom: ["author"],
            parent: ["menu"]
        },
        menuitem: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["command"],
            scope: ["menu", "menubar"]
        },
        menuitemcheckbox: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["checkbox", "menuitem"],
            scope: ["menu", "menubar"]
        },
        menuitemradio: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["menuitemcheckbox", "radio"],
            scope: ["menu", "menubar"]
        },
        navigation: {
            namefrom: ["author"],
            parent: ["landmark"]
        },
        note: {
            namefrom: ["author"],
            parent: ["section"]
        },
        option: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["input"],
            properties: ["aria-checked", "aria-posinset", "aria-selected", "aria-setsize"]
        },
        presentation: {
            parent: ["structure"]
        },
        progressbar: {
            childpresentational: !0,
            namefrom: ["author"],
            namerequired: !0,
            parent: ["range"]
        },
        radio: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["checkbox", "option"]
        },
        radiogroup: {
            mustcontain: ["radio"],
            namefrom: ["author"],
            namerequired: !0,
            parent: ["select"],
            properties: ["aria-required"]
        },
        range: {
            "abstract": !0,
            namefrom: ["author"],
            parent: ["widget"],
            properties: ["aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-valuetext"]
        },
        region: {
            namefrom: [" author"],
            parent: ["section"]
        },
        roletype: {
            "abstract": !0,
            properties: "aria-atomic aria-busy aria-controls aria-describedby aria-disabled aria-dropeffect aria-flowto aria-grabbed aria-haspopup aria-hidden aria-invalid aria-label aria-labelledby aria-live aria-owns aria-relevant".split(" ")
        },
        row: {
            mustcontain: ["columnheader", "gridcell", "rowheader"],
            namefrom: ["contents", "author"],
            parent: ["group", "widget"],
            properties: ["aria-level", "aria-selected"],
            scope: ["grid", "rowgroup", "treegrid"]
        },
        rowgroup: {
            mustcontain: ["row"],
            namefrom: ["contents", "author"],
            parent: ["group"],
            scope: ["grid"]
        },
        rowheader: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["gridcell", "sectionhead", "widget"],
            properties: ["aria-sort"],
            scope: ["row"]
        },
        search: {
            namefrom: ["author"],
            parent: ["landmark"]
        },
        section: {
            "abstract": !0,
            namefrom: ["contents", "author"],
            parent: ["structure"],
            properties: ["aria-expanded"]
        },
        sectionhead: {
            "abstract": !0,
            namefrom: ["contents", "author"],
            parent: ["structure"],
            properties: ["aria-expanded"]
        },
        select: {
            "abstract": !0,
            namefrom: ["author"],
            parent: ["composite", "group", "input"]
        },
        separator: {
            childpresentational: !0,
            namefrom: ["author"],
            parent: ["structure"],
            properties: ["aria-expanded", "aria-orientation"]
        },
        scrollbar: {
            childpresentational: !0,
            namefrom: ["author"],
            namerequired: !1,
            parent: ["input", "range"],
            requiredProperties: ["aria-controls", "aria-orientation", "aria-valuemax", "aria-valuemin", "aria-valuenow"],
            properties: ["aria-controls", "aria-orientation", "aria-valuemax", "aria-valuemin", "aria-valuenow"]
        },
        slider: {
            childpresentational: !0,
            namefrom: ["author"],
            namerequired: !0,
            parent: ["input", "range"],
            requiredProperties: ["aria-valuemax", "aria-valuemin", "aria-valuenow"],
            properties: ["aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-orientation"]
        },
        spinbutton: {
            namefrom: ["author"],
            namerequired: !0,
            parent: ["input", "range"],
            requiredProperties: ["aria-valuemax", "aria-valuemin", "aria-valuenow"],
            properties: ["aria-valuemax", "aria-valuemin", "aria-valuenow", "aria-required"]
        },
        status: {
            parent: ["region"]
        },
        structure: {
            "abstract": !0,
            parent: ["roletype"]
        },
        tab: {
            namefrom: ["contents", "author"],
            parent: ["sectionhead", "widget"],
            properties: ["aria-selected"],
            scope: ["tablist"]
        },
        tablist: {
            mustcontain: ["tab"],
            namefrom: ["author"],
            parent: ["composite", "directory"],
            properties: ["aria-level"]
        },
        tabpanel: {
            namefrom: ["author"],
            namerequired: !0,
            parent: ["region"]
        },
        textbox: {
            namefrom: ["author"],
            namerequired: !0,
            parent: ["input"],
            properties: ["aria-activedescendant", "aria-autocomplete", "aria-multiline", "aria-readonly", "aria-required"]
        },
        timer: {
            namefrom: ["author"],
            namerequired: !0,
            parent: ["status"]
        },
        toolbar: {
            namefrom: ["author"],
            parent: ["group"]
        },
        tooltip: {
            namerequired: !0,
            parent: ["section"]
        },
        tree: {
            mustcontain: ["group", "treeitem"],
            namefrom: ["author"],
            namerequired: !0,
            parent: ["select"],
            properties: ["aria-multiselectable", "aria-required"]
        },
        treegrid: {
            mustcontain: ["row"],
            namefrom: ["author"],
            namerequired: !0,
            parent: ["grid", "tree"]
        },
        treeitem: {
            namefrom: ["contents", "author"],
            namerequired: !0,
            parent: ["listitem", "option"],
            scope: ["group", "tree"]
        },
        widget: {
            "abstract": !0,
            parent: ["roletype"]
        },
        window: {
            "abstract": !0,
            namefrom: [" author"],
            parent: ["roletype"],
            properties: ["aria-expanded"]
        }
    });

  enums.ariaPropertiesEnum = new enumCreator({
    activedescendant: {
        type: "property",
        valueType: "idref"
    },
    atomic: {
        defaultValue: "false",
        type: "property",
        valueType: "boolean"
    },
    autocomplete: {
        defaultValue: "none",
        type: "property",
        valueType: "token",
        values: ["inline", "list", "both", "none"]
    },
    busy: {
        defaultValue: "false",
        type: "state",
        valueType: "boolean"
    },
    checked: {
        defaultValue: "undefined",
        type: "state",
        valueType: "token",
        values: ["true", "false", "mixed", "undefined"]
    },
    controls: {
        type: "property",
        valueType: "idref_list"
    },
    describedby: {
        type: "property",
        valueType: "idref_list"
    },
    disabled: {
        defaultValue: "false",
        type: "state",
        valueType: "boolean"
    },
    dropeffect: {
        defaultValue: "none",
        type: "property",
        valueType: "token_list",
        values: "copy move link execute popup none".split(" ")
    },
    expanded: {
        defaultValue: "undefined",
        type: "state",
        valueType: "token",
        values: ["true", "false", "undefined"]
    },
    flowto: {
        type: "property",
        valueType: "idref_list"
    },
    grabbed: {
        defaultValue: "undefined",
        type: "state",
        valueType: "token",
        values: ["true", "false",
            "undefined"
        ]
    },
    haspopup: {
        defaultValue: "false",
        type: "property",
        valueType: "boolean"
    },
    hidden: {
        defaultValue: "false",
        type: "state",
        valueType: "boolean"
    },
    invalid: {
        defaultValue: "false",
        type: "state",
        valueType: "token",
        values: ["grammar", "false", "spelling", "true"]
    },
    label: {
        type: "property",
        valueType: "string"
    },
    labelledby: {
        type: "property",
        valueType: "idref_list"
    },
    level: {
        type: "property",
        valueType: "integer"
    },
    live: {
        defaultValue: "off",
        type: "property",
        valueType: "token",
        values: ["off", "polite", "assertive"]
    },
    multiline: {
        defaultValue: "false",
        type: "property",
        valueType: "boolean"
    },
    multiselectable: {
        defaultValue: "false",
        type: "property",
        valueType: "boolean"
    },
    orientation: {
        defaultValue: "vertical",
        type: "property",
        valueType: "token",
        values: ["horizontal", "vertical"]
    },
    owns: {
        type: "property",
        valueType: "idref_list"
    },
    posinset: {
        type: "property",
        valueType: "integer"
    },
    pressed: {
        defaultValue: "undefined",
        type: "state",
        valueType: "token",
        values: ["true", "false", "mixed", "undefined"]
    },
    readonly: {
        defaultValue: "false",
        type: "property",
        valueType: "boolean"
    },
    relevant: {
        defaultValue: "additions text",
        type: "property",
        valueType: "token_list",
        values: ["additions", "removals", "text", "all"]
    },
    required: {
        defaultValue: "false",
        type: "property",
        valueType: "boolean"
    },
    selected: {
        defaultValue: "undefined",
        type: "state",
        valueType: "token",
        values: ["true", "false", "undefined"]
    },
    setsize: {
        type: "property",
        valueType: "integer"
    },
    sort: {
        defaultValue: "none",
        type: "property",
        valueType: "token",
        values: ["ascending", "descending", "none",
            "other"
        ]
    },
    valuemax: {
        type: "property",
        valueType: "decimal"
    },
    valuemin: {
        type: "property",
        valueType: "decimal"
    },
    valuenow: {
        type: "property",
        valueType: "decimal"
    },
    valuetext: {
        type: "property",
        valueType: "string"
    }
  });

  enums.InlineElementsEnum = new enumCreator({
    TT: !0,
    I: !0,
    B: !0,
    BIG: !0,
    SMALL: !0,
    EM: !0,
    STRONG: !0,
    DFN: !0,
    CODE: !0,
    SAMP: !0,
    KBD: !0,
    VAR: !0,
    CITE: !0,
    ABBR: !0,
    ACRONYM: !0,
    A: !0,
    IMG: !0,
    OBJECT: !0,
    BR: !0,
    SCRIPT: !0,
    MAP: !0,
    Q: !0,
    SUB: !0,
    SUP: !0,
    SPAN: !0,
    BDO: !0,
    INPUT: !0,
    SELECT: !0,
    TEXTAREA: !0,
    LABEL: !0,
    BUTTON: !0
  });

  enums.TagAndSemanticInfoEnum = new enumCreator({
    A: [{
        role: "link",
        allowed: "button checkbox menuitem menuitemcheckbox menuitemradio tab treeitem".split(" "),
        selector: "a[href]"
    }],
    ADDRESS: [{
        role: "",
        allowed: ["contentinfo", "presentation"]
    }],
    AREA: [{
        role: "link",
        selector: "area[href]"
    }],
    ARTICLE: [{
        role: "article",
        allowed: ["presentation", "article", "document", "application", "main"]
    }],
    ASIDE: [{
        role: "complementary",
        allowed: ["note", "complementary", "search", "presentation"]
    }],
    AUDIO: [{
        role: "",
        allowed: ["application",
            "presentation"
        ]
    }],
    BASE: [{
        role: "",
        reserved: !0
    }],
    BODY: [{
        role: "document",
        allowed: ["presentation"]
    }],
    BUTTON: [{
        role: "button",
        allowed: ["link", "menuitem", "menuitemcheckbox", "menuitemradio", "radio"],
        selector: 'button:not([aria-pressed]):not([type="menu"])'
    }, {
        role: "button",
        allowed: ["button"],
        selector: "button[aria-pressed]"
    }, {
        role: "button",
        attributes: {
            "aria-haspopup": !0
        },
        allowed: ["link", "menuitem", "menuitemcheckbox", "menuitemradio", "radio"],
        selector: 'button[type="menu"]'
    }],
    CAPTION: [{
        role: "",
        allowed: ["presentation"]
    }],
    COL: [{
        role: "",
        reserved: !0
    }],
    COLGROUP: [{
        role: "",
        reserved: !0
    }],
    DATALIST: [{
        role: "listbox",
        attributes: {
            "aria-multiselectable": !1
        },
        allowed: ["presentation"]
    }],
    DEL: [{
        role: "",
        allowed: ["*"]
    }],
    DD: [{
        role: "",
        allowed: ["presentation"]
    }],
    DT: [{
        role: "",
        allowed: ["presentation"]
    }],
    DETAILS: [{
        role: "group",
        allowed: ["group", "presentation"]
    }],
    DIALOG: [{
        role: "dialog",
        allowed: "dialog alert alertdialog application log marquee status".split(" "),
        selector: "dialog[open]"
    }, {
        role: "dialog",
        attributes: {
            "aria-hidden": !0
        },
        allowed: "dialog alert alertdialog application log marquee status".split(" "),
        selector: "dialog:not([open])"
    }],
    DIV: [{
        role: "",
        allowed: ["*"]
    }],
    DL: [{
        role: "list",
        allowed: ["presentation"]
    }],
    EMBED: [{
        role: "",
        allowed: ["application", "document", "img", "presentation"]
    }],
    FIGURE: [{
        role: "",
        allowed: ["*"]
    }],
    FOOTER: [{
        role: "",
        allowed: ["contentinfo", "presentation"]
    }],
    FORM: [{
        role: "form",
        allowed: ["presentation"]
    }],
    P: [{
        role: "",
        allowed: ["*"]
    }],
    PRE: [{
        role: "",
        allowed: ["*"]
    }],
    BLOCKQUOTE: [{
        role: "",
        allowed: ["*"]
    }],
    H1: [{
        role: "heading"
    }],
    H2: [{
        role: "heading"
    }],
    H3: [{
        role: "heading"
    }],
    H4: [{
        role: "heading"
    }],
    H5: [{
        role: "heading"
    }],
    H6: [{
        role: "heading"
    }],
    HEAD: [{
        role: "",
        reserved: !0
    }],
    HEADER: [{
        role: "",
        allowed: ["banner", "presentation"]
    }],
    HR: [{
        role: "separator",
        allowed: ["presentation"]
    }],
    HTML: [{
        role: "",
        reserved: !0
    }],
    IFRAME: [{
        role: "",
        allowed: ["application", "document", "img", "presentation"],
        selector: "iframe:not([seamless])"
    }, {
        role: "",
        allowed: ["application", "document",
            "img", "presentation", "group"
        ],
        selector: "iframe[seamless]"
    }],
    IMG: [{
        role: "presentation",
        reserved: !0,
        selector: 'img[alt=""]'
    }, {
        role: "img",
        allowed: ["*"],
        selector: 'img[alt]:not([alt=""])'
    }],
    INPUT: [{
        role: "button",
        allowed: ["link", "menuitem", "menuitemcheckbox", "menuitemradio", "radio"],
        selector: 'input[type="button"]:not([aria-pressed])'
    }, {
        role: "button",
        allowed: ["button"],
        selector: 'input[type="button"][aria-pressed]'
    }, {
        role: "checkbox",
        allowed: ["checkbox"],
        selector: 'input[type="checkbox"]'
    }, {
        role: "",
        selector: 'input[type="color"]'
    }, {
        role: "",
        selector: 'input[type="date"]'
    }, {
        role: "",
        selector: 'input[type="datetime"]'
    }, {
        role: "textbox",
        selector: 'input[type="email"]:not([list])'
    }, {
        role: "",
        selector: 'input[type="file"]'
    }, {
        role: "",
        reserved: !0,
        selector: 'input[type="hidden"]'
    }, {
        role: "button",
        allowed: ["button"],
        selector: 'input[type="image"][aria-pressed]'
    }, {
        role: "button",
        allowed: ["link", "menuitem", "menuitemcheckbox", "menuitemradio", "radio"],
        selector: 'input[type="image"]:not([aria-pressed])'
    }, {
        role: "",
        selector: 'input[type="month"]'
    }, {
        role: "",
        selector: 'input[type="number"]'
    }, {
        role: "textbox",
        selector: 'input[type="password"]'
    }, {
        role: "radio",
        allowed: ["menuitemradio"],
        selector: 'input[type="radio"]'
    }, {
        role: "slider",
        selector: 'input[type="range"]'
    }, {
        role: "button",
        selector: 'input[type="reset"]'
    }, {
        role: "combobox",
        selector: 'input[type="search"][list]'
    }, {
        role: "textbox",
        selector: 'input[type="search"]:not([list])'
    }, {
        role: "button",
        selector: 'input[type="submit"]'
    }, {
        role: "combobox",
        selector: 'input[type="tel"][list]'
    }, {
        role: "textbox",
        selector: 'input[type="tel"]:not([list])'
    }, {
        role: "combobox",
        selector: 'input[type="text"][list]'
    }, {
        role: "textbox",
        selector: 'input[type="text"]:not([list])'
    }, {
        role: "textbox",
        selector: "input:not([type])"
    }, {
        role: "",
        selector: 'input[type="time"]'
    }, {
        role: "combobox",
        selector: 'input[type="url"][list]'
    }, {
        role: "textbox",
        selector: 'input[type="url"]:not([list])'
    }, {
        role: "",
        selector: 'input[type="week"]'
    }],
    INS: [{
        role: "",
        allowed: ["*"]
    }],
    KEYGEN: [{
        role: ""
    }],
    LABEL: [{
        role: "",
        allowed: ["presentation"]
    }],
    LI: [{
        role: "listitem",
        allowed: "menuitem menuitemcheckbox menuitemradio option tab treeitem presentation".split(" "),
        selector: 'ol:not([role="presentation"])>li, ul:not([role="presentation"])>li'
    }, {
        role: "listitem",
        allowed: "listitem menuitem menuitemcheckbox menuitemradio option tab treeitem presentation".split(" "),
        selector: 'ol[role="presentation"]>li, ul[role="presentation"]>li'
    }],
    LINK: [{
        role: "link",
        reserved: !0,
        selector: "link[href]"
    }],
    MAIN: [{
        role: "",
        allowed: ["main", "presentation"]
    }],
    MAP: [{
        role: "",
        reserved: !0
    }],
    MATH: [{
        role: "",
        allowed: ["presentation"]
    }],
    MENU: [{
        role: "toolbar",
        selector: 'menu[type="toolbar"]'
    }],
    MENUITEM: [{
        role: "menuitem",
        selector: 'menuitem[type="command"]'
    }, {
        role: "menuitemcheckbox",
        selector: 'menuitem[type="checkbox"]'
    }, {
        role: "menuitemradio",
        selector: 'menuitem[type="radio"]'
    }],
    META: [{
        role: "",
        reserved: !0
    }],
    METER: [{
        role: "progressbar",
        allowed: ["presentation"]
    }],
    NAV: [{
        role: "navigation",
        allowed: ["navigation", "presentation"]
    }],
    NOSCRIPT: [{
        role: "",
        reserved: !0
    }],
    OBJECT: [{
        role: "",
        allowed: ["application", "document", "img", "presentation"]
    }],
    OL: [{
        role: "list",
        allowed: "directory group listbox menu menubar tablist toolbar tree presentation".split(" ")
    }],
    OPTGROUP: [{
        role: "",
        allowed: ["presentation"]
    }],
    OPTION: [{
        role: "option"
    }],
    OUTPUT: [{
        role: "status",
        allowed: ["*"]
    }],
    PARAM: [{
        role: "",
        reserved: !0
    }],
    PICTURE: [{
        role: "",
        reserved: !0
    }],
    PROGRESS: [{
        role: "progressbar",
        allowed: ["presentation"]
    }],
    SCRIPT: [{
        role: "",
        reserved: !0
    }],
    SECTION: [{
        role: "region",
        allowed: "alert alertdialog application contentinfo dialog document log marquee search status presentation".split(" ")
    }],
    SELECT: [{
        role: "listbox"
    }],
    SOURCE: [{
        role: "",
        reserved: !0
    }],
    SPAN: [{
        role: "",
        allowed: ["*"]
    }],
    STYLE: [{
        role: "",
        reserved: !0
    }],
    SVG: [{
        role: "",
        allowed: ["application", "document", "img", "presentation"]
    }],
    SUMMARY: [{
        role: "",
        allowed: ["presentation"]
    }],
    TABLE: [{
        role: "",
        allowed: ["*"]
    }],
    TEMPLATE: [{
        role: "",
        reserved: !0
    }],
    TEXTAREA: [{
        role: "textbox"
    }],
    TBODY: [{
        role: "rowgroup",
        allowed: ["*"]
    }],
    THEAD: [{
        role: "rowgroup",
        allowed: ["*"]
    }],
    TFOOT: [{
        role: "rowgroup",
        allowed: ["*"]
    }],
    TITLE: [{
        role: "",
        reserved: !0
    }],
    TD: [{
        role: "",
        allowed: ["*"]
    }],
    TH: [{
        role: "",
        allowed: ["*"]
    }],
    TR: [{
        role: "",
        allowed: ["*"]
    }],
    TRACK: [{
        role: "",
        reserved: !0
    }],
    UL: [{
        role: "list",
        allowed: "directory group listbox menu menubar tablist toolbar tree presentation".split(" ")
    }],
    VIDEO: [{
        role: "",
        allowed: ["application", "presentation"]
    }]
  });

  return enums;

}));

define("enums", function(){});

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

define("axsUtils", function(){});

/***************************************************************************************
 * build the auditRules util that exposes method to add rules. This is a ruleID <-> RuleInfoObj mapper
 * @param
 * @return an object with 3 exposed functions
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

 }("auditRulesCreator", "axs.utils", {
   "ruleTagNameMapper" : "axs.ruleUtils.ruleTagNameMapper",
   "ruleHandlerMapper" : "axs.ruleUtils.ruleHandlerMapper",
   "JSUtils" : "axs.JSUtils"
 }, function(ruleTagNameMapper, ruleHandlerMapper, JSUtils) {

   var _auditRules = {}; //> is an Object containing auditRules info (RuleID <-> rulesInfoObj)

   //> This function provides an interface to create the rule
   function _createRule(_obj) {
       var _tagNamesArr;
       _auditRules[_obj.ruleID] = _obj;
       _tagNamesArr = _obj.tagName;
       //todo add a default * to make a rule appear for all TAGS
       if(_tagNamesArr.length == 1 && _tagNamesArr[0] === "*"){
         _tagNamesArr = ["A", "ABBR", "ACRONYM", "ADDRESS", "APPLET", "AREA", "B", "BASEFONT", "BDO", "BGSOUND",
                         "BIG", "BLOCKQUOTE", "BLINK", "BODY", "BR", "BUTTON", "CAPTION", "CENTER", "CITE", "CODE", "COL",
                         "COLGROUP", "DD", "DFN", "DEL", "DIR", "DIV", "DL", "DT", "EMBED", "EM", "FIELDSET", "FONT", "FORM",
                         "FRAME", "FRAMESET", "H1", "H2", "H3", "H4", "H5", "H6", "HEAD", "HR", "HTML", "IMG", "IFRAME", "INPUT",
                         "INS", "ISINDEX", "I", "KBD", "LABEL", "LEGEND", "LI", "LINK", "MARQUEE", "MENU", "META", "NOFRAME",
                       "NOSCRIPT", "OPTGROUP", "OPTION", "OL", "P", "Q", "PRE", "S", "SAMP", "SCRIPT", "SELECT", "SMALL", "SPAN",
                       "STRIKE", "STRONG", "STYLE", "SUB", "SUP", "TABLE", "TD", "TR", "THEAD", "TH", "TBODY", "TFOOT", "TEXTAREA",
                       "TITLE", "TT", "UL", "U", "VAR"];
       }
       _tagNamesArr.forEach(function(element, index, array) {
           ruleTagNameMapper.addRuleToTag(element, _obj.ruleID);
       });
       ruleHandlerMapper.addRuleHandler(_obj.ruleID, _obj.handler);
   }

   //> provide an interface to get the auditRules
   function _getAuditRules() {
       return _auditRules;
   }

   //> get global rules that needs to be executed once
   function _getGlobalRules(){
     var _globalRules = {}
     JSUtils.each(_auditRules, function(value, key){
       if(value.isGlobal){
           _globalRules[key] = value;
       }
     });
     return _globalRules;
   }

   //> return an individual rule info obj
   function _getRule(_key) {
       return _auditRules[_key];
   }

   //> return using the revealing module pattern
   return {
       addAuditRule: _createRule,
       getAuditRulesList: _getAuditRules,
       getRuleObj: _getRule,
       getGlobalRules : _getGlobalRules
   }

 }));

define("auditRulesCreator", function(){});

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

 }("injectDeps", "axs.utils", {}, function() {

   return {
       dependencies: {},

       process: function(target) {
           var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
           var FN_ARG_SPLIT = /,/;
           var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
           var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
           var text = target.toString();
           var args = text.match(FN_ARGS)[1].split(',');

           return target.apply(target, this.getDependencies(args));
       },

       getDependencies: function(arr) {
           var self = this;
           return arr.map(function(value) {
               return self.dependencies[value];
           });
       },

       register: function(name, dependency) {
           this.dependencies[name] = dependency;
       }
   };

 }));

define("injectDeps", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Images should have an alt attribute, unless they have an ARIA role of "presentation"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


(function(moduleName, ctxToAdd, dependenciesObj, factory){

  if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }else{
     umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
  }

  }("AX_01", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

    //run the auditRulesCreator with result from an IIFE that returns an {}
    auditRulesCreator.addAuditRule((function() {

        //> encapsulated implementation.
        function _ruleExector($,elem,enums,JSUtils,axsUtils){

          var _severityEnum = enums.severityEnum;

          //> even input type image needs an alt attribute to be present

          if((elem.tagName == "IMG")||(elem.tagName==="INPUT" && $(elem).attr("type")==="image")){
            //first check if it has an ALT attribute, else check if it has a ROLE attribute
            if(elem.hasAttribute("alt")){
              if(JSUtils.isEmpty(elem.getAttribute("alt"))){
                return {
                  TYPE : _severityEnum.WARN,
                  RESULT : false,
                  MSG : "Passed! This image has an empty alt attribute."
                };
              }
              return {
                TYPE : _severityEnum.INFO,
                RESULT : true,
                MSG : "Passed!"
              };
            }else if(elem.hasAttribute("role")
                    && (!JSUtils.isEmpty(elem.getAttribute("role")))
                    && elem.getAttribute("role")==="presentation"){
                return {
                  TYPE : _severityEnum.INFO,
                  RESULT : true,
                  MSG : "Passed! This image is used for presentation purposes!"
                };
            }else{
                return {
                  TYPE : _severityEnum.ERROR,
                  RESULT : false,
                  MSG : "Failed! This element is not a11y compliant as it neither has a valid alt / role attribute"
                };
            }
          }else{
            return {
              TYPE : _severityEnum.INFO,
              RESULT : true,
              MSG : "Passed!"
            };
          }
        }

        return {
            name: "imageWithoutAltText",
            description: "Images should have an alt attribute, unless they have an ARIA role of presentation",
            ruleID: "AX_01",
            tagName: ["IMG", "INPUT"],
            handler: _ruleExector
        } // this gets added to the audit rules

    })());


}));

define("AX_01", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Positive values for TABINDEX must be avoided
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_02", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){

         var _severityEnum = enums.severityEnum;
         if(elem.hasAttribute("tabindex")){
           if(parseInt($(elem).attr("tabindex")) > 0){
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! Detected positive values for tabindex"
             };
           }else{
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed!"
             };
           }
         }else{
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "Passed!"
           };
         }
       }

       return {
           name: "avoidPositiveTabIndex",
           description: "Avoid positive values for Tab index",
           ruleID: "AX_02",
           tagName: ["IMG", "A", "DIV", "SPAN", "INPUT", "SELECT", "BUTTON"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_02", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Check for if the current Element has an invalid ARIA attribute
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


  (function(moduleName, ctxToAdd, dependenciesObj, factory){

    if (typeof exports === 'object' && typeof module === 'object'){
      module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
    }else{
       umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
    }

    }("AX_03", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

      //run the auditRulesCreator with result from an IIFE that returns an {}
      auditRulesCreator.addAuditRule((function() {

        //> encapsulated implementation.
        function _ruleExector($,elem,enums,JSUtils,axsUtils){
          var _severityEnum = enums.severityEnum,
              _data = [], //holds the aria-* extracted from element
              _ct, _flag, //variables for loop count
              _isValid = false, //flag to detect if the extracted aria-* is valid or not
              _invalidAriaAttrArr=[], //array that holds any invalid aria-* attribute
              _ariaArr = ["aria-activedescendant", "aria-atomic",
                          "aria-autocomplete", "aria-busy", "aria-checked",
                          "aria-controls", "aria-describedby", "aria-disabled",
                          "aria-dropeffect", "aria-expanded", "aria-flowto", "aria-grabbed",
                          "aria-haspopup", "aria-hidden", "aria-invalid",
                          "aria-label", "aria-labelledby", "aria-level", "aria-live",
                          "aria-multiline", "aria-multiselectable", "aria-orientation",
                          "aria-owns", "aria-posinset", "aria-pressed", "aria-readonly",
                          "aria-relevant", "aria-required", "aria-selected", "aria-setsize",
                          "aria-sort", "aria-valuemax", "aria-valuemin", "aria-valuenow",
                          "aria-valuetext"];

          //> iterate over the attributes array of the element and check if any aria-* exists
          [].forEach.call(elem.attributes, function(attr) {
              if (/^aria-/.test(attr.name)) {
                 _data.push("".toLowerCase(attr.name));
              }
          });

          //> for the length of the aria atributes extracted from the element
          for(_ct = 0; _ct < _data.length; _ct++){
            _flag = _ariaArr.length; //length of the ariaArr with correct aria-* attributes
            _isValid = false;
            //check the current aria-* attribute from elem with the list of correct aria-* in the stock array
            while(_flag--){
              //check each individual aria-* attribute with the list of correct aria-* in the stock array
              if(_ariaArr[_flag]===_data[_ct]){
                _isValid = true;
                break; //break if true
              }else{
                continue; //continue to iterate otherwise
              }
            } //> end of while loop

            //> if the current aria-* doesn't exist then push it into the _invalidAriaAttrArr
            if(!_isValid){
              _invalidAriaAttrArr.push(_data[_ct]);
            }
          }//> end of for loop

          //> returning the result based on if invalid elements are present in the _invalidAriaAttrArr
          if(_invalidAriaAttrArr.length > 0){
            return {
              TYPE : _severityEnum.ERROR,
              RESULT : false,
              MSG : "Failed! Invalid ARIA-* attributes exists on this element"
            };
          }else{
            return {
              TYPE : _severityEnum.INFO,
              RESULT : true,
              MSG : "Passed!"
            };
          }
        }

        return {
            name: "invalidAriaAttribute",
            description: "The element has an invalid ARIA attribute",
            ruleID: "AX_03",
            tagName: ["*"],
            handler: _ruleExector
        }

      })());

  }));

define("AX_03", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Check if element ID is unique
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


   (function(moduleName, ctxToAdd, dependenciesObj, factory){

     if (typeof exports === 'object' && typeof module === 'object'){
       module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
     }else{
        umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
     }

     }("AX_04", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

       //run the auditRulesCreator with result from an IIFE that returns an {}
       auditRulesCreator.addAuditRule((function() {

         //> encapsulated implementation.
         function _ruleExector($,elem,enums,JSUtils,axsUtils){
           var _severityEnum = enums.severityEnum, _id;

           // get the element ID
           _id = $(elem).attr("id"); //need to check if there is more than one element with the same id
           _id = $.trim(_id);

           //check if its unique
           if(!JSUtils.isEmpty(_id) && _id !== ""){
             if($('*#'+_id).get().length === 1){
               return {
                 TYPE : _severityEnum.INFO,
                 RESULT : true,
                 MSG : "Passed!"
               };
             }else{
               return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! The Id "+ _id + " is used in more than one element"
               };
             }
           }
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "Passed! But No ID is set for this element"
           };
         }

         return {
             name: "isIdUnique",
             description: "Check if element ID is unique",
             ruleID: "AX_04",
             tagName: ["*"],
             handler: _ruleExector
         }

       })());

   }));

define("AX_04", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : An element's ID must not be present in more that one aria-owns attribute at any time
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_05", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _id, _objArr;

         // get the element ID - need to check if this ID is used within any aria-owns more than once
         _id = $(elem).attr("id");
         _id = $.trim(_id);

         //check $("[aria-owns='_id']") results in more than one element
         if(!JSUtils.isEmpty(_id) && _id !== ""){
           _objArr = $("[aria-owns="+ _id +"]").get();
           if(_objArr.length <= 1){
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed!"
             };
           }else{
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! The Id "+ _id + " is a part of the aria-owns attribute of more than one element"
             };
           }
         }
         // if the ID doesnt exists
         return {
           TYPE : _severityEnum.WARN,
           RESULT : false,
           MSG : "Passed! But No ID is set for this element"
         };
       }

       return {
           name: "isIdInAria_OwnsUnique",
           description: "An element's ID must not be present in more that one aria-owns attribute at any time",
           ruleID: "AX_05",
           tagName: ["IMG", "A", "DIV", "SPAN", "INPUT", "SELECT", "BUTTON"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_05", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Any ID referred to via an IDREF must be unique in the DOM
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_06", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _id, _objArr;

         // get the element ID present within this element's idref attribute
         _id = $(elem).attr("idref");
         _id = $.trim(_id);

         //check $("[id='_id']") results in more than one element
         if(!JSUtils.isEmpty(_id) && _id !== ""){
           _objArr = $("[id="+ _id +"]").get();
           if(_objArr.length <= 1){
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed!"
             };
           }else{
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! The Id "+ _id + " referred in this elements IDREF attribute is not unique"
             };
           }
         }
         // if the ID doesnt exists
         return {
           TYPE : _severityEnum.INFO,
           RESULT : true,
           MSG : "Passed! But No IDREF is set for this element"
         };
       }

       return {
           name: "isIdInIdRefUnique",
           description: "Any ID referred to via an IDREF must be unique in the DOM",
           ruleID: "AX_06",
           tagName: ["*"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_06", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : The webpage should have a title that describes topic or purpose which should not be empty
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

 }("AX_07", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _objArr, _title = $("title");

         if(_title.length === 1 && !JSUtils.isEmpty(_title.html())){
           if(_title.html().length > 15 && _title.html().length < 55){
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! Title exists for this element"
             };
           }else{
             return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "Passed! But the length of the title is either too short or very long"
             };
           }
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The page doesn't have a title tag that describes the topic or purpose, or it is empty"
           };
         }
       }

       return {
           name: "hasTitle",
           description: "The webpage should have a title that describes topic or purpose",
           ruleID: "AX_07",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));

define("AX_07", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Provide summaries for tables
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/

 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_08", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //> if there is no summary attribute or if the summary attribute is empty
         if(!elem.hasAttribute("summary") || JSUtils.isEmpty($(elem).attr("summary"))){
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The summary attribute is empty or doesn't exist"
           };
         }else{
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "Passed! The table has a summary attribute"
           };
         }

       }

       return {
           name: "hasSummary",
           description: "Provide summaries for tables",
           ruleID: "AX_08",
           tagName: ["TABLE"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_08", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : Provide abbreviations for header labels
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_09", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //either have an ABBR tag or a non-empty abbr attribute
         if((elem.hasAttribute("abbr") && !JSUtils.isEmpty($(elem).attr("abbr"))) || $(elem).find("abbr").length > 0){
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "Passed! The table header has an abbr attribute / ABBR tag"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The abbr attribute is empty or doesn't exist for the table header. Alternatively, No ABBR tag also is present"
           };
         }

       }

       return {
           name: "hasAbbr",
           description: "Provide abbreviations for header labels",
           ruleID: "AX_09",
           tagName: ["TH"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_09", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Provide a caption via the CAPTION element. A table CAPTION describes the table in one to three sentences"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_10", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _caption;
         //get the caption
         _caption = $(elem).find("caption");

         //> if there is no summary attribute or if the summary attribute is empty
         if(_caption.length === 1){
           if(JSUtils.isEmpty(_caption[0].innerHTML)){
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! The CAPTION tag is empty for the table"
             };
           }else{
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! The table has a CAPTION"
             };
           }
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The CAPTION tag doesn't exist for the table or there is more than one"
           };
         }
       }

       return {
           name: "hasCaption",
           description: "Provide a caption via the CAPTION element. A table CAPTION describes the table in one to three sentences",
           ruleID: "AX_10",
           tagName: ["TABLE"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_10", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Elements with ARIA roles must use a valid, non-abstract ARIA role."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_11", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum,
             _validRoleArr = [], _role, _flag, _isValid = false;

         _validRoleArr = ["alert", "alertdialog", "application", "article", "banner", "button", "checkbox", "columnheader", "combobox",
                         "command", "complementary", "composite", "contentinfo", "definition", "dialog", "directory", "document", "form",
                         "grid", "gridcell", "group", "heading", "img", "input", "landmark", "link", "list", "listbox", "listitem",
                         "log", "main", "marquee", "math", "menu", "menubar", "menuitem", "menuitemcheckbox", "menuitemradio", "navigation",
                         "note", "option", "presentation", "progressbar", "radio", "radiogroup", "range", "region", "roletype", "row", "rowgroup",
                         "rowheader", "search", "section", "sectionhead", "select", "separator", "scrollbar", "slider", "spinbutton", "status",
                         "structure", "tab", "tablist", "tabpanel", "textbox", "timer", "toolbar", "tooltip", "tree", "treegrid", "treeitem",
                         "widget", "window"];

         //check if the role attribute exists
         if(elem.hasAttribute("role")){

           //get the role attribute
           _role = $(elem).attr("role");

           //check if the role attribute is empty
           if(!JSUtils.isEmpty(_role)){

             // procced to check if the role attribute is valid
             _flag = _validRoleArr.length; //decrementing loop initialization

             //iterate over the valid roles array
             while(_flag--){
               if(_validRoleArr[_flag]===_role){
                 //valid role
                 _isValid = true;
                 break;
               }else{
                 //invalid role, continue iterating till the flag count is 0
                 continue;
               }
             }

             // populate the result object
              if(_isValid){
                return {
                              TYPE : _severityEnum.INFO,
                              RESULT : true,
                              MSG : "Passed! ROLE is valid"
                       };
              }else{
                return {
                              TYPE : _severityEnum.ERROR,
                              RESULT : false,
                              MSG : "Failed! ROLE is invalid"
                       };
              }

           }else{

             // role attribute is empty
             return {
                       TYPE : _severityEnum.INFO,
                       RESULT : true,
                       MSG : "Passed! Empty ROLE atribute detected"
                    };
           }

         }
         // role doesnt exist
         return {
                   TYPE : _severityEnum.INFO,
                   RESULT : true,
                   MSG : "Passed! No ROLE attribute detected"
                };
       }

       return {
           name: "hasValidAriaRole",
           description: "Elements with ARIA roles must use a valid, non-abstract ARIA role.",
           ruleID: "AX_11",
           tagName: ["*"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_11", function(){});


/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "The web page should have the content's human language indicated in the markup. Identify the primary natural language of the document"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_12", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _html = $("html");

         //> lang attribute check
         if(typeof _html.attr("lang") === undefined || JSUtils.isEmpty(_html.attr("lang"))){
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The document has no LANG attribute / EMPTY LANG attribute"
           };
         }else{
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "Passed! The document has a LANG attribute. Please check if its valid"
           };
         }
       }

       return {
           name: "hasLangAttribute",
           description: "The web page should have the content's human language indicated in the markup. Identify the primary natural language of the document",
           ruleID: "AX_12",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));

define("AX_12", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "There should be only one main element for a web page document"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_13", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //> There is neither one main element nor one element with role as main
         if($("[role='main']").length ==1 && $("main").length == 1 && $("[role='main']")[0] === $("main")[0]){
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "Passed! The document has a main element"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The document either has NO main element or more than one main element"
           };
         }

       }

       return {
           name: "hasMoreThanOneRoleMain",
           description: "There should be only one main element for a web page document",
           ruleID: "AX_13",
           tagName: ["DIV", "H1", "H2", "H3", "H4", "H5", "H6"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_13", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Prsence of Title attribute for ABBR, ACRONYM and A. Specify the expansion of each abbreviation or acronym in a document where it first occurs"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_14", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //if a title attribute is present and if its not empty
         if(elem.hasAttribute("title") && !JSUtils.isEmpty("title")){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : true,
             MSG : "Passed! Title attribute present. Please check if its Meaningful"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! The element doesn't have a title attribute to indicate expansion of abbreviation or acronym or a tooltip"
           };
         }

       }

       return {
           name: "hasTitleAttribute",
           description: "Prsence of Title attribute for ABBR, ACRONYM, IFRAME and A. Specify the expansion of each abbreviation or acronym in a document where it first occurs",
           ruleID: "AX_14",
           tagName: ["ABBR", "A", "ACRONYM", "IFRAME", "OBJECT", "MAP", "APPLET"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_14", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "This element does not support ARIA roles, states and properties"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_15", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         // pass in only the reserved elements and check if there are any aria-* attributes defined in them
         if(!_canTakeAriaAttributes(elem,axsUtils)){
           if(null !== axsUtils.getAriaProperties(elem)){
             return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "FAILED! ARIA-* attribute detected on this reserved element"
             };
           }else{ //there are no aria-* properties in this reserved element and its a PASS
             return {
                 TYPE : _severityEnum.INFO,
                 RESULT : true,
                 MSG : "PASSED! This is a reserved element but there are no aria-* attributes detected"
             };
           }
         }else{
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "PASSED! This is not a reserved element"
           };
         }
       }

       //> check if this can take aria attributes
       function _canTakeAriaAttributes(elem,axsUtils){
         return (elem = axsUtils.checkForAria(elem)) ? !elem.reserved : !false;
       }

       return {
           name: "isAriaOnReservedElement",
           description: "This element does not support ARIA roles, states and properties",
           ruleID: "AX_15",
           tagName: ["*"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_15", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid Deprecated features of W3C technologies"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/



 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_16", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "Failed! There are Deprecated elements being used which are not part of W3C technologies"
         };
       }

       return {
           name: "isDeprecatedElement",
           description: "Avoid Deprecated features of W3C technologies",
           ruleID: "AX_16",
           tagName: ["FONT", "BASEFONT", "APPLET", "CENTER", "DIR", "ISINDEX", "MENU", "S", "STRIKE", "U"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_16", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid using the style attribute and defining styles inline and move them to stylesheets instead"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/



 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_17", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if(elem.hasAttribute("style")){
           return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! There are inline styles defined for this element"
             };
           }else {
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! No inline styles defined"
             };
           }
       }

       return {
           name: "hasInlineStyles",
           description: "Avoid using the style attribute and defining styles inline and move them to stylesheets instead",
           ruleID: "AX_17",
           tagName: ["*"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_17", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Until user agents handle empty controls correctly, include default placeholding characters in edit boxes and text areas"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/



 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_18", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //if there is a proper placeholder attribute and text
         if(elem.hasAttribute("placeholder") && !JSUtils.isEmpty($(elem).attr("placeholder"))){
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! Placeholder attributes are properly defined"
           };
         }else if(!JSUtils.isEmpty(elem.value) || !JSUtils.isEmpty(elem.textContent)) {
           return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "Passed! Default values are properly defined, but mention it in placeholders"
           };
         }else{
           return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! Neither DEFAULT value nor a placeholder is specified for this form control " + elem.tagName
           };
         }
       }

       return {
           name: "hasDefaultPlaceholderTexts",
           description: "Until user agents handle empty controls correctly, include default placeholding characters in edit boxes and text areas",
           ruleID: "AX_18",
           tagName: ["INPUT", "SELECT", "TEXTAREA"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_18", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Associate labels explicitly with their controls"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/



 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_19", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _id = $(elem).attr("id"), _labelObj;

         //if there is a proper placeholder attribute and text
         if(elem.hasAttribute("id") && !JSUtils.isEmpty(_id)){
           _labelObj = $("label[for="+ _id +"]");

           //if label text is non-empty and there is only one label element defined
           if(_labelObj.length == 1 && !JSUtils.isEmpty(_labelObj.html())){
             return {
                 TYPE : _severityEnum.INFO,
                 RESULT : true,
                 MSG : "PASSED!"
             };
           }else{ //if there is no label element or more than one defined
             return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! No Label or more than one label element defined for element of id =" + _id
             };
           }
         }else{
           return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "Failed! No ID attribute is defined & therefore cannot be associated explicitly with label controlds"
           };
         }
       }

       return {
           name: "hasLabels",
           description: "Associate labels explicitly with their controls",
           ruleID: "AX_19",
           tagName: ["INPUT", "SELECT", "TEXTAREA", "DATALIST", "METER", "KEYGEN", "OUTPUT"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_19", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Until user agents provide the ability to stop the refresh, do not create periodically auto-refreshing / auto re-direct pages"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_20", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _attr = $(elem).attr("http-equiv");

         //if there is a proper placeholder attribute and text
         if(elem.hasAttribute("http-equiv") && !JSUtils.isEmpty(_attr) && _attr === "refresh"){
           return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! This page has auto-refresh capabilities enabled"
             };
         }else{
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! No auto-refresh detected"
           };
         }
       }

       return {
           name: "hasAutoRefresh",
           description: "Until user agents provide the ability to stop the refresh, do not create periodically auto-refreshing / auto re-direct pages",
           ruleID: "AX_20",
           tagName: ["META"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_20", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Until user agents allow users to turn off spawned windows, do not cause pop-ups or other windows to appear and do not change the current window without informing the user."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_21", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _attr = $(elem).attr("target");

         //if there is a proper placeholder attribute and text
         if(elem.hasAttribute("target") && !JSUtils.isEmpty(_attr) && _attr === "_blank"){
           return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! This element can potentially open pop ups that opens in a new window or tab"
             };
         }else{
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "Passed! No potential external pop up windows detected"
           };
         }
       }

       return {
           name: "isOpeningInNewTabOrPopUp",
           description: "Until user agents allow users to turn off spawned windows, do not cause pop-ups or other windows to appear and do not change the current window without informing the user.",
           ruleID: "AX_21",
           tagName: ["A", "IFRAME"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_21", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Ensure that pages are usable when scripts, applets, or other programmatic objects are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_22", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         //> checks for presence of NOSCRIPT tags
         if($("NOSCRIPT").length > 0){
           return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "Passed! Ensure that pages are usable when scripts, applets, or other programmatic objects are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page"
           };
         }else{
           return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! NOSCRIPT tag is not present. Page would not be usable when scripts are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page"
           };
         }
       }

       return {
           name: "hasNoScriptTag",
           description: "Ensure that pages are usable when scripts, applets, or other programmatic objects are turned off or not supported. If this is not possible, provide equivalent information on an alternative accessible page",
           ruleID: "AX_22",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));

define("AX_22", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Provide keyboard shortcuts to important links (including those in client-side image maps), form controls, and groups of form controls"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_23", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if(elem.hasAttribute("accesskey") && !JSUtils.isEmpty("accesskey")){
           return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "Passed! Keyboard shortcut via accesskey is provided for this form control. Ensure that the accesskey is not repeated for multiple controls"
           };
         }else{
           return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! To ensure accessibility, provide shortcut via accesskey to this form control"
           };
         }
       }

       return {
           name: "hasAccessKeyEnabled",
           description: "Provide keyboard shortcuts to important links (including those in client-side image maps), form controls, and groups of form controls",
           ruleID: "AX_23",
           tagName: ["A", "AREA", "BUTTON", "INPUT", "TEXTAREA", "LABEL", "LEGEND", "SELECT"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_23", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check if there is atleast one header section / element for the page content that defines its purpose & context"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_24", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _innerHTML, _innerTags, _prevAll;

         //a proper mark up defines one heading / purpose for the page & multiple sub-headings / sections / paragraphs
         if($("h1").length == 1 && !JSUtils.isEmpty($("h1").html())){
           _innerHTML = $("h1").html();
           _innerTags = $("h1").find("p, span, div, b, i, u, a, section, article, aside, ul, li, ol, h2, h3, h4, h5, h6");
           _prevAll = $("h1").prevAll().filter("h2, h3, h4, h5, h6");

           //check if the text length of > 15 but < 100
           if((_innerHTML.length > 15) && (_innerHTML.length < 100)){
             //check if there are no other tags defined in it and no other header tags defined out of order
             if((_innerTags.length == 0) && (_prevAll.length == 0)){
               return {
                     TYPE : _severityEnum.WARN,
                     RESULT : false,
                     MSG : "Passed! Please check if the header tag is valid with the content being : " + _innerHTML
               };
             }else{
               return {
                     TYPE : _severityEnum.ERROR,
                     RESULT : false,
                     MSG : "Failed! Header tag is present but either has other HTML tag markup within it or has other header tags defined out of order before it"
               };
             }
           }else{
             return {
                   TYPE : _severityEnum.ERROR,
                   RESULT : false,
                   MSG : "Failed! Header tag is present but the text length is either too short (lt 15) or too long(gt 100)"
             };
           }
         }else{
           return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "Failed! There is either more than one / empty / no header element defining the context & purpose of the page"
           };
         }
       }

       return {
           name: "hasHeaderElementDefined",
           description: "Check if there is atleast one header section / element for the page content that defines its purpose & context",
           ruleID: "AX_24",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));

define("AX_24", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "role=main must be present on significant elements only"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_25", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _tagName, _txt;

         if(elem.hasAttribute("role") && elem.getAttribute("role")==="main"){
           _tagName = elem.tagName.toUpperCase();

           if (enums.InlineElementsEnum[_tagName]) {
             return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "FAILED! Main role is defined for an insignificant element"
             };
           }
           _txt = axsUtils.getTextFromDescendantContent(elem);

           if(!_txt || 50 > _txt.length){
             return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "FAILED! Role=main is on an invalid element"
             };
           }else{
             return {
                 TYPE : _severityEnum.INFO,
                 RESULT : true,
                 MSG : "PASSED! Role=main is on a valid element"
             };
           }
         }else{
           return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "PASSED! Role=main doesnt exists"
           };
         }
       }

       return {
           name: "isRoleMainOnSignificantElement",
           description: "role=main must be present on significant elements only",
           ruleID: "AX_25",
           tagName: ["*"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_25", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Avoid using the style attribute and defining styles inline and move them to stylesheets instead"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_26", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum,
             _description = $("meta[name='description']"),
             _author = $("meta[name='author']"),
             _keywords = $("meta[name='keywords']"),
             _copyright = $("meta[name='copyright']"),
             _hasCharset = $("meta[charset]");


         if(_author.length === 1 && !_checkIfIsEmpty(_author.attr("content"),JSUtils)
           && _description.length === 1 && !_checkIfIsEmpty(_description.attr("content"),JSUtils)
           && _keywords.length === 1 && !_checkIfIsEmpty(_keywords.attr("content"),JSUtils)
           && _copyright.length === 1 && !_checkIfIsEmpty(_copyright.attr("content"),JSUtils)
           && _hasCharset.length === 1 && !_checkIfIsEmpty(_hasCharset.attr("charset"),JSUtils)){
             return {
               TYPE : _severityEnum.INFO,
               RESULT : true,
               MSG : "PASSED! Required META tags exists"
             };
           }else{
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "FAILED! Some or all of Required META tags such as 'keywords', 'description', 'copyright', 'author', 'charset' are missing for this page"
             };
           }
       }

       //> check if the input param object is empty
       function _checkIfIsEmpty(obj,JSUtils){
         return JSUtils.isEmpty(obj);
       }

       return {
           name: "hasRequiredMetaAttributes",
           description: "Check if there is a meta tag with charset, keywords, description, author, copyright attributes defined",
           ruleID: "AX_26",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));

define("AX_26", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check if there is a link that helps skip irrelevant information and land the user at the main content"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_27", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum,
             _mainElem = $("main"),
             _mainRole = $("[role='main']"),
             _mainID = _mainElem.attr("id") ||  _mainRole.attr("id"),
             _skipToMainContentLink;

         //check if there is an element corresponding to the main id
         if(!JSUtils.isEmpty(_mainID) && !JSUtils.isEmpty($('#'+_mainID).html())){
           _skipToMainContentLink = $("a[href='#" + _mainID + "']");
           if(!JSUtils.isEmpty(_skipToMainContentLink) && !JSUtils.isEmpty(_skipToMainContentLink.html())){
               return {
                 TYPE : _severityEnum.INFO,
                 RESULT : true,
                 MSG : "PASSED! Valid Link to skip to the main content section exists"
               };
           }else{
               return {
                 TYPE : _severityEnum.ERROR,
                 RESULT : false,
                 MSG : "FAILED! Link to skip to main content doesn't exist or is empty"
               };
           }
         }else {
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! A proper main section defined either by the MAIN tag or role=main doesn't exist or is empty"
           };
         }
       }

       return {
           name: "hasLinkToSkipToMainContent",
           description: "Check if there is a link that helps skip irrelevant information and land the user at the main content",
           ruleID: "AX_27",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));

define("AX_27", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check if PRE elements are used. Ensure that there are no TABLE based layouts in it"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_28", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if(!JSUtils.isEmpty($(elem).html())){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! A PRE tag is present. Check the contents to ensure it doesn't have pre-formatted TABLE based layouts"
           };
         }else{
           return {
             TYPE : _severityEnum.INFO,
             RESULT : true,
             MSG : "PASSED!"
           };
         }

       }

       return {
           name: "isPreElementUsed",
           description: "Check if PRE elements are used. Ensure that there are no TABLE based layouts in it",
           ruleID: "AX_28",
           tagName: ["PRE"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_28", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Don't use the <B> and <I> tags. They are used to create a visual presentation effect"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_29", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if(elem.tagName==="B"){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! A B tag is used. They are used to create a visual presentation effect and cannot indicate structure emphasis or speech inflection. Use the STRONG tag instead"
           };
         }else if(elem.tagName==="I"){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! An I tag is present. They are used to create a visual presentation effect. Render it via CSS"
           };
         }

       }

       return {
           name: "isBorIElementUsed",
           description: "Don't use the <B> and <I> tags. They are used to create a visual presentation effect",
           ruleID: "AX_29",
           tagName: ["B", "I"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_29", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Provide text equivalent for every non-text element like OBJECT"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_30", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum;

         if($.trim(elem.innerHTML) !== ""){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! An OBJECT tag is used. Inner Text equivalent content is provided. Please check its validity"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "ERROR! Provide a text equivalent for this non-text element OBJECT"
           };
         }

       }

       return {
           name: "hasTextEquivalent",
           description: "Provide text equivalent for every non-text element like OBJECT",
           ruleID: "AX_30",
           tagName: ["OBJECT"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_30", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Ensure that equivalents for dynamic content are updated when the dynamic content changes. As the contents of a frame changes, so must change any description. This is not possible if an IMG is inserted directly into a frame. Thus, content developers should always make the source ('src') of a frame an HTML file"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_31", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){

         var _severityEnum = enums.severityEnum, _url, _hasImg = false;

         if(!JSUtils.isEmpty(elem.getAttribute("src"))){
           _url = document.createElement("a");
           _url.href = elem.getAttribute("src");

           ['pathname'].forEach(function(k) {
             if(_url[k].indexOf("jpg") !== -1 || _url[k].indexOf("jpeg") !== -1 || _url[k].indexOf("gif") !== -1 || _url[k].indexOf("png") !== -1){
               _hasImg = true;
             }else{
               _hasImg = false;
             }
           });

           if(_hasImg){
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "ERROR! Do not provide an image URL as the SRC attribute of the iFrame"
             };
           }else{
             return {
               TYPE : _severityEnum.WARN,
               RESULT : true,
               MSG : "PASSED! There are no images used as URL's for this iFrame"
             };
           }
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "ERROR! The SRC attribute of the iFrame is Empty. Remove unused frames"
           };
         }
       } //> end of impl

       return {
           name: "hasImgInSrcOfUrl",
           description: "Ensure that equivalents for dynamic content are updated when the dynamic content changes. As the contents of a frame changes, so must change any description. This is not possible if an IMG is inserted directly into a frame. Thus, content developers should always make the source ('src') of a frame an HTML file",
           ruleID: "AX_31",
           tagName: ["IFRAME"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_31", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Use FIELDSET to group form controls into semantic units and describe the group with the LEGEND element."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_32", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _fieldset, elem = $(elem);
         _fieldset = $(elem).closest("fieldset").first();
         if(_fieldset.has(elem).length){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! Fieldset is present around this form element to group it semantically. Validate it manually."
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! There is no FIELDSET used to group form controls into semantic units"
           };
         }

       } //> end of impl

       return {
           name: "isFormElementInsideFieldSet",
           description: "Use FIELDSET to group form controls into semantic units and describe the group with the LEGEND element.",
           ruleID: "AX_32",
           tagName: ["BUTTON", "SELECT", "INPUT", "TEXTAREA", "KEYGEN", "DATALIST", "OUTPUT"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_32", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Use FIELDSET to group form controls into semantic units and describe the group with the LEGEND element."
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_33", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, elem = $(elem);

         if(elem.has("legend").length){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! LEGEND is present inside this FIELDSET to describe it. Check its description"
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! There is no LEGEND used to Describe this FIELDSET group"
           };
         }

       } //> end of impl

       return {
           name: "isFieldsetContainsLegend",
           description: "Describe the FIELDSET group with the LEGEND element.",
           ruleID: "AX_33",
           tagName: ["FIELDSET"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_33", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Check for presence of a DOCTYPE"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_34", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _node, _htmlDocType;

         //some browsers return this as as DocumentType Object
         _node = document.doctype;
         if(!JSUtils.isUndefined(_node) && !JSUtils.isNull(_node)){
           _htmlDocType = "<!DOCTYPE "
              + _node.name
              + (_node.publicId ? ' PUBLIC "' + _node.publicId + '"' : '')
              + (!_node.publicId && _node.systemId ? ' SYSTEM' : '')
              + (_node.systemId ? ' "' + _node.systemId + '"' : '')
              + '>';
         }

         if(!JSUtils.isEmpty(_htmlDocType) && JSUtils.isNull(_node.previousSibling)){
           return {
             TYPE : _severityEnum.WARN,
             RESULT : false,
             MSG : "WARNING! A Doctype is present as :" + _htmlDocType
           };
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! No valid DocType is present (or) the Doctype is not the first element of the page"
           };
         }

       } //> end of impl

       return {
           name: "hasDoctype",
           description: "Check for presence of a DOCTYPE",
           ruleID: "AX_34",
           tagName: [],
           handler: _ruleExector,
           isGlobal : true
       }

     })());

 }));

define("AX_34", function(){});

/***************************************************************************************
 * Add to the list of Audit Rules
 * Rule : "Table TD tags are associated to corresponding TH header tags of the table via the headers attribute"
 * @return Rule Info object with Rule ID, Info, ErrMsg, Tags, Handler
 **/


 (function(moduleName, ctxToAdd, dependenciesObj, factory){

   if (typeof exports === 'object' && typeof module === 'object'){
     module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }else{
      umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
   }

   }("AX_35", null, {"auditRulesCreator" : "axs.utils.auditRulesCreator"}, function(auditRulesCreator) {

     //run the auditRulesCreator with result from an IIFE that returns an {}
     auditRulesCreator.addAuditRule((function() {

       //> encapsulated implementation.
       function _ruleExector($,elem,enums,JSUtils,axsUtils){
         var _severityEnum = enums.severityEnum, _th;

         if(elem.hasAttribute("headers") && !JSUtils.isEmpty(elem.getAttribute("headers"))){
           _th = $("#"+elem.getAttribute("headers"));
           if(_th.length > 0 && _th.prop("tagName") === "TH"){
             return {
               TYPE : _severityEnum.WARN,
               RESULT : false,
               MSG : "PASSED! There is a TH corresponding to this. But validate if the content makes sense"
             };
           }else{
             return {
               TYPE : _severityEnum.ERROR,
               RESULT : false,
               MSG : "FAILED! There is no corresponding header TH associated with this element's headers attribute"
             };
           }
         }else{
           return {
             TYPE : _severityEnum.ERROR,
             RESULT : false,
             MSG : "FAILED! The TD element is not associated with a corresponding table header defined by TH. If this table is used for layout, structure or presentation purposes other than tablulating data. Avoid it."
           };
         }

       } //> end of impl

       return {
           name: "hasHeadersAttribute",
           description: "Table TD tags are to be associated to corresponding TH header tags of the table via the headers attribute",
           ruleID: "AX_35",
           tagName: ["TD"],
           handler: _ruleExector
       }

     })());

 }));

define("AX_35", function(){});

/***************************************************************************************
 * This is the module that processess the a11y audit over the passed selector
 * @param Selector
 * @param configObject
 * @return an a function run()
 **/


  (function(moduleName, ctxToAdd, dependenciesObj, factory){

    if (typeof exports === 'object' && typeof module === 'object'){
      module.exports = __allyRoot.umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
    }else{
       umdLoader(moduleName, ctxToAdd, dependenciesObj, factory);
    }

  }("run", "axs.audit", {
    "JSUtils" : "axs.JSUtils",
    "injectDeps" : "axs.utils.injectDeps",
    "auditRulesCreator" : "axs.utils.auditRulesCreator",
    "ruleTagNameMapper" : "axs.ruleUtils.ruleTagNameMapper",
    "ruleHandlerMapper" : "axs.ruleUtils.ruleHandlerMapper",
    "enums" : "axs.enums",
    "axsUtils" : "axs.utils.axsUtils"
  }, function(JSUtils, injectDeps, auditRulesCreator, ruleTagNameMapper, ruleHandlerMapper, enums, axsUtils) {

        //> check for jQuery dependency
        /*(function() {
            if (JSUtils.isNull($) || JSUtils.isUndefined($)) {
                throw new Error("jQuery dependency doesn't exist.");
            }
        })();*/

        var _resultObj = {}, // returns the results of the audit run
            _selectorObjs = {}, // a map that maps an ID to the object extracted from the selectors in the config
            _selectorRules = {} ; // a map that maps the same ID to the array of rules to be skipped

            //> performs some basic validation on the inputs
            function _validator(selector, ignoreSpecific) {

                //if selector is empty or if its not a valid string or if its undefined
                if (JSUtils.isEmpty(selector) && !JSUtils.isString(selector) && JSUtils.isUndefined(selector)) {
                    //throw new Error("Selector is null/undefined or empty or not a string");
                    selector = "html"; // do the audit for the whole document
                }

                if ($(selector).length === 0) { //check if the selector gets some DOM element
                    //if not throw Not a valid selector / No DOM element matching the selector
                    throw new Error("Not a valid selector. Or no matching DOM Elements!")
                } else {
                    //if ignoreSpecific is not empty & not undefined
                    if(!JSUtils.isEmpty(ignoreSpecific) && !JSUtils.isUndefined(ignoreSpecific)){
                      // check if its a valid object
                      if (!JSUtils.isObject(ignoreSpecific)){
                        throw new Error("Configuration options passed is not a valid object");
                        return;
                      }
                      //> pre-process - do tasks on the config options object that is passed
                      _preProcess(ignoreSpecific);
                    }
                    //inject the jQuery obj
                    injectDeps.register("$", $);

                    //inject the JSUtils object
                    injectDeps.register("JSUtils", JSUtils);

                    //inject enums
                    injectDeps.register("enums", enums);

                    //inject axsUtils
                    injectDeps.register("axsUtils", axsUtils);

                    //execute global executors
                    _globalExecutors();
                    //> run the audit on the current selector that was passed
                    _auditRunner($(selector));
                    //> return the results object
                    return _resultObj;
                }
            }

            //> This creates two maps ->
            //> 1) a list of objects extracted from the selectors mentioned in the config object.
            //> 2) A second map that contains the list of rules
            //> The keys for both the maps are the same -> object.toString() + Random Alphanumeric
            function _preProcess(config){
              var _obj, _ct, _rand;
              //> the config is a "selector" -> ["array of rules to be skipped"]
              for (var currentSelector in config){
                //> get the array of corresponding objects
                _obj = $(currentSelector).get();
                //> go ahead only when there is an object corresponding to the selector
                if(_obj.length > 0){
                  //> non-breaking for loop as it needs to process all the objects
                  for(_ct=0; _ct < _obj.length; _ct++){
                    //> generate a UID
                    _rand = _randomString(10, '0123456789abcdefghijkLMNOPQRSTUVWXYZ');
                    //> map the array of objects
                    _selectorObjs[ _obj[_ct].toString() + _rand] = _obj[_ct];
                    //> map the array of rules
                    _selectorRules[_obj[_ct].toString() + _rand] = config[currentSelector];
                  }
                }
              }
            }

            //> generates a random alpha numeric
            function _randomString(length, chars) {
              var result = '';
              for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
              return result;
            }

            //> initiates the audit over an array of selectors
            function _auditRunner(selectorArr) {
                var _count = 0;
                //iterate over the selectorArr and process every selector and its child
                while (_count < selectorArr.length) {
                    //> auditEngine will process the current Selector from the selectorArr
                    _process(selectorArr[_count]);
                    //if current the current Selector from the selectorArr has children, process them as well
                    if (selectorArr[_count].children.length > 0) {
                        //re-run the auditRunner over the array of children
                        //TODO: check if recursion has any effect.
                        _auditRunner(selectorArr[_count].children);
                    }
                    _count++;
                }
            }

            //> function to run global rules
            function _globalExecutors(){
              var _globalRules = auditRulesCreator.getGlobalRules(), _handler, _result;
              if(!JSUtils.isEmpty(_globalRules)){
                injectDeps.register("elem", undefined);
                JSUtils.each(_globalRules, function(value, key){
                  _handler = value.handler;
                  _result = injectDeps.process(_handler);
                  //invoke the handler function which returns a truthy or a falsy.
                  if (!_result.RESULT) {
                      // there is an error in the execution of current rule. So process Error
                      _populateErrors(auditRulesCreator.getRuleObj(key), null, _result);
                  }
                });
              }
            }

            //> process every individual selector from the selector Array
            function _process(elem) {
                var _rulesArr, _fn, _result;
                //get the array of rules corresponding to the tagName to execute (tagName <->['Rule1', 'Rule2'])
                _rulesArr = ruleTagNameMapper.getTagHandlers(elem.tagName);

                //check if the _rulesArr is empty before iterating
                if(!JSUtils.isEmpty(_rulesArr) && !JSUtils.isUndefined(_rulesArr)){
                  //inject the element as one of the dependencies into the injector
                  injectDeps.register("elem", elem);
                  //iterate over the rules array index being index of the array and value being the rule
                  $.each(_rulesArr, function(index, value) {
                      //for every rule in the rulesArray for the given tag, get the corresponding handler function (ruleID <-> handler)
                      if(!_isSkipRule(value, elem)){
                        _fn = ruleHandlerMapper.getHandler(value);
                        _result = injectDeps.process(_fn);
                        //invoke the handler function which returns a truthy or a falsy.
                        if (!_result.RESULT) {
                            // there is an error in the execution of current rule. So process Error
                            _populateErrors(auditRulesCreator.getRuleObj(value), elem, _result);
                        }
                      }
                  });
                }
            }

            //> check if the rule execution must be skipped based on presence of rules against selector in config object
            function _isSkipRule(rule, elem){
              var _ruleList, _ct, _isSkip = false;
              //> iterate over the list of objects in the _selectorObjs which was populated from the config
              for(var _obj in _selectorObjs){
                //> if the object is the same, proceed
                if($(elem).is(_selectorObjs[_obj])){
                    //> get the rules list to exclude for the current object
                    _ruleList = _selectorRules[_obj];
                    //> check if the current rule exists in the list of rules to be skipped or if * means skip all
                    for(_ct = 0; _ct < _ruleList.length; _ct++){
                      if(_ruleList[_ct] === rule || _ruleList[_ct] === "*"){
                        _isSkip = true;
                        break; //> since the rule is found, break this loop
                      }
                    }
                    break; //> since the object is found break this loop
                }
              }
              return _isSkip;
            }

            //> This one console.logs the error info for the rule and the element for which it failed
            function _populateErrors(ruleInfoObj, element, errorObj) {
              var _key = (!JSUtils.isEmpty(element)) ? (JSUtils.isEmpty(element.id) ? element.tagName : element.id) : ruleInfoObj.ruleID ;
              _resultObj[_key] = _resultObj[_key] || [];
              _resultObj[_key].push({
                  severityEnum: errorObj.TYPE,
                  description: ruleInfoObj.description,
                  errMsg: errorObj.MSG,
                  ruleID: ruleInfoObj.ruleID,
                  attr : (!JSUtils.isEmpty(element)) ? element.attributes : null
              });
            }

            //> invocation point of axs.audit.run(selector, ignoreAllArr, ignoreSpecific)
            return (function(selector, ignoreSpecific) {
                return _validator(selector, ignoreSpecific);
            });


  }));

define("run", function(){});

  require.config({
      baseUrl:"./",
      paths: {

        umdLoader : "../utils/umdLoader",
        ruleHandlerMapper : "../mapper/ruleHandlerMapper",
        ruleTagNameMapper : "../mapper/ruleTagNameMapper",
        JSUtils : "../jsutils/JSUtils",
        enumCreator : "../utils/enumCreator",
        auditRulesCreator : "../utils/auditRulesCreator",
        axsUtils : "../utils/axsUtils",
        enums : "../enums/enums",
        injectDeps : "../utils/injectDeps",
        run : "../audit/run",
        AX_01 : "../rulesImpl/AX_01",
        AX_02 : "../rulesImpl/AX_02",
        AX_03 : "../rulesImpl/AX_03",
        AX_04 : "../rulesImpl/AX_04",
        AX_05 : "../rulesImpl/AX_05",
        AX_06 : "../rulesImpl/AX_06",
        AX_07 : "../rulesImpl/AX_07",
        AX_08 : "../rulesImpl/AX_08",
        AX_09 : "../rulesImpl/AX_09",
        AX_10 : "../rulesImpl/AX_10",
        AX_11 : "../rulesImpl/AX_11",
        AX_12 : "../rulesImpl/AX_12",
        AX_13 : "../rulesImpl/AX_13",
        AX_14 : "../rulesImpl/AX_14",
        AX_15 : "../rulesImpl/AX_15",
        AX_16 : "../rulesImpl/AX_16",
        AX_17 : "../rulesImpl/AX_17",
        AX_18 : "../rulesImpl/AX_18",
        AX_19 : "../rulesImpl/AX_19",
        AX_20 : "../rulesImpl/AX_20",
        AX_21 : "../rulesImpl/AX_21",
        AX_22 : "../rulesImpl/AX_22",
        AX_23 : "../rulesImpl/AX_23",
        AX_24 : "../rulesImpl/AX_24",
        AX_25 : "../rulesImpl/AX_25",
        AX_26 : "../rulesImpl/AX_26",
        AX_27 : "../rulesImpl/AX_27",
        AX_28 : "../rulesImpl/AX_28",
        AX_29 : "../rulesImpl/AX_29",
        AX_30 : "../rulesImpl/AX_30",
        AX_31 : "../rulesImpl/AX_31",
        AX_32 : "../rulesImpl/AX_32",
        AX_33 : "../rulesImpl/AX_33",
        AX_34 : "../rulesImpl/AX_34",
        AX_35 : "../rulesImpl/AX_35"

      }
  });


  define('main',[ 'umdLoader', 'JSUtils', 'ruleHandlerMapper', 'ruleTagNameMapper',
            'enumCreator', 'enums', 'axsUtils', 'auditRulesCreator', 'injectDeps',
            'AX_01', 'AX_02', 'AX_03', 'AX_04', 'AX_05', 'AX_06', 'AX_07', 'AX_08',
            'AX_09', 'AX_10', 'AX_11', 'AX_12', 'AX_13', 'AX_14', 'AX_15',
            'AX_16', 'AX_17', 'AX_18', 'AX_19', 'AX_20', 'AX_21', 'AX_22',
            'AX_23', 'AX_24', 'AX_25', 'AX_26', 'AX_27', 'AX_28', 'AX_29',
            'AX_30', 'AX_31', 'AX_32', 'AX_33', 'AX_34', 'AX_35', 'run'],
            function(umdLoader, JSUtils, ruleHandlerMapper, ruleTagNameMapper,
              enumCreator, enums, axsUtils, auditRulesCreator, injectDeps, AX_01,
              AX_02, AX_03, AX_04, AX_05, AX_06, AX_07, AX_08, AX_09, AX_10, AX_11,
              AX_12, AX_13, AX_14, AX_15, AX_16, AX_17, AX_18, AX_19, AX_20, AX_21,
              AX_22, AX_23, AX_24, AX_25, AX_26, AX_27, AX_28, AX_29, AX_30,
              AX_31, AX_32, AX_33, AX_34, AX_35, run){

    var axs = axs || {}; //> define an audit object globally
    axs.audit = axs.audit || {}; // all related audit to go in here
    axs.audit.run = run;
    return axs;
  });

