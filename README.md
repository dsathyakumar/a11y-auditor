# a11y-auditor

This a11y project is an implementation of accessibility rules as defined in
Accessibility Checklist:

http://www.w3.org/TR/WCAG10/full-checklist.html

**NPM MODULE**
The corresponding NPM module of [a11y-auditor](https://www.npmjs.com/package/a11y-auditor)

> Status : Dev (in progress)

**Pull requests are welcome!**


TIP :
---------------------------------------------------------
Its recommended to use a11y-auditor to run audit checks for A, AA, AAA compliance on your web pages.

The great way would be to include it as part of your Dev tests itself via the chai-a11y plugin.

[chai-a11y](https://github.com/pranavjha/chai-a11y) is a chai plugin available as an [npm](https://github.com/pranavjha/chai-a11y) module which consumes a11y-auditor and helps run tests and conduct audits.

[chai-a11y](https://github.com/pranavjha/chai-a11y) helps to run a11y-auditor on the browser (AMD, common JS style) and also
via script tag loading



For Node JS usage :
---------------------------------------------------------
require the module as require('a11y-auditor') and add it to the dependencies. This will return a [function validator()]. Use it in your module.

```
var a11y = require('a11y-auditor');

var result = a11y(htmlSelector, configRulesObj, executeGlobalRules);
```


For Browser usage (include <script...> and run without AMD):
---------------------------------------------------------
Use the distribution file at dist/browser/main.js. Implement it as :

```
window.onload = function(){
		a11y-auditor(htmlSelector, configRulesObj, executeGlobalRules);
}
```



Method definition of method exported by the Module :
--------------------------------------------------

The method takes in 3 parameters:

```
var a11y = require('a11y-auditor');

var result = a11y(htmlSelector, configRulesObj, executeGlobalRules);

```

1. htmlSelector - A valid HTML selector (eg. 'button')
2. configRulesObj - A config obj containing rules to be ignored for some elements matched by valid HTML selectors as shown below
3. executeGlobalRules - A Boolean to indicate whether global rules that audit the whole document need to be ignored.


To ignore a few rules :
-----------------------

```
function(“htmlSelector”, {
	‘selector_1’ : [‘array of rules to ignore’],
	‘selector_2’ : [‘array of rules to ignore’],
	‘selector_3’ : [‘*’] //skip all
});
```


To author new rules :
---------------------------------------------------------
1. Create a new numbered rule named file AX_XX.js (eg: AX_01.js) under lib/rulesImpl
2. Follow the pattern in which the files are authored under lib/rulesImpl
3. Place an entry in lib/rulesProcessor/rulesExecutor.js
4. The exported object via module.exports will contain the following:

```
module.exports = {
	name: "shortNameMentioningWhatThisRuleDoes",
	description: "Detailed description of the rule",
	ruleID: "AX_XXX",
	tagName: ['array of tagName affected'],
	handler: Handler function,
	isGlobal: Boolean //to indicate if this rule checks on document level checks
};
```


Implementation Tests :
--------------------

Individual tests for each of the rules implemented have been placed under tests


Rule Understanding:
--------------------

To know what each rule does, look at the a11y.properties.json file.


Dependencies :
--------------------

jQuery library (v 2.2.0), lodash (4.3.0)
