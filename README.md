# a11y-auditor

This a11y project is an implementation of accessibility rules as defined in
Accessibility Checklist:
http://www.w3.org/TR/WCAG10/full-checklist.html

Status : Dev (in progress), to make it compatible with Front end loading (via AMD loaders and script tag loading)


For Node JS usage :
---------------------------------------------------------
require the module as require('a11y-auditor') and add it to the dependencies. This will return a [function validator()]. Use it in your module.

```
var a11y = require('a11y-auditor');

var result = a11y(htmlSelector, configRulesObj);
```



Method definition of method exported by the Module :
--------------------------------------------------

The method takes in 2 parameters:

```
var a11y = require('a11y-auditor');

var result = a11y(htmlSelector, configRulesObj);

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

jQuery library (v 2.2.0), lodash (4.3.0)
