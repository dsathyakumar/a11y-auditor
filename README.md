# a11y-auditor

This a11y project is an implementation of accessibility rules as defined in
Accessibility Checklist:
http://www.w3.org/TR/WCAG10/full-checklist.html

Status : Dev in progress


For AMD Loaders: (if you need a11y as an AMD module)
------------------------------------------------------
Use the distribution file at build/amd/main.js. Note that AMD loader like Require JS is not bundled along with this distribution file. Include require.js (any AMD loader) before plugging this into the test page. jQuery is not bundled along with this distribution. Please inject jQuery & require JS (AMD loader) into your test page before including this. Implement it as :

```
require(“main”, function(axs){
	console.log(axs.audit.run());
});
```


For Browser usage (include script and run without AMD):
---------------------------------------------------------
Use the distribution file at build/browser/main.js. This will require jQuery (v 1.11) included before it. Implement it as :

```
window.onload = function(){
		axs.audit.run();
}
```

For Node JS usage :
---------------------------------------------------------
require the module as require('a11yTester') and add it to the dependencies. This will return the run() function. Use it in your module.

```
var a11y = require('a11y-auditor');

var result = a11y(htmlSelector, configRulesObj);
```



Method definition of axs.audit.run() :
----------------------------------------

The axs.audit.run() method takes in 2 parameters:

```
axs.audit.run(htmlSelector,configObject);
```

1. A valid HTML selector
2. A config object containing rules to be ignored for some elements matched by valid HTML selectors as shown below


To ignore a few rules :
-----------------------


```
function(“htmlSelector”, {
	‘selector_1’ : [‘array of rules to ignore’],
	‘selector_2’ : [‘array of rules to ignore’],
	‘selector_3’ : [‘*’] //skip all
});
```


Implementation Tests :
--------------------

Individual tests for each of the rules implemented have been placed in test/amd/ and test/browser


Rule Understanding:
--------------------

To know what each rule does, look at the a11y.properties file.


Dependencies :
--------------------

jQuery library (v 1.11)
