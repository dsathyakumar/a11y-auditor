[![Build Status](https://img.shields.io/travis/dsathyakumar/a11y-auditor.svg?style=flat-square)](https://travis-ci.org/dsathyakumar/a11y-auditor)
[![Dependency Status](https://img.shields.io/david/dsathyakumar/a11y-auditor.svg?style=flat-square)](https://david-dm.org/dsathyakumar/a11y-auditor)
[![devDependency Status](https://img.shields.io/david/dev/dsathyakumar/a11y-auditor.svg?style=flat-square)](https://david-dm.org/dsathyakumar/a11y-auditor#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/dsathyakumar/a11y-auditor.svg?style=flat-square)](https://david-dm.org/dsathyakumar/a11y-auditor#info=peerDependencies)
[![npm](https://img.shields.io/npm/v/a11y-auditor.svg)](https://david-dm.org/dsathyakumar/a11y-auditor#info=version)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)]()
[![Maintenance](https://img.shields.io/maintenance/yes/2016.svg)]()
[![NPM](https://nodei.co/npm/a11y-auditor.png)](https://nodei.co/npm/a11y-auditor/)


# a11y-auditor

> This a11y project is an implementation of accessibility rules as defined in [W3C Accessibility Checklist](http://www.w3.org/TR/WCAG10/full-checklist.html)

> Accessibility testing happens on products after they are deployed onto staging and relies on the QA folks. This project along with [chai-a11y BDD style accessibility assertions](https://github.com/pranavjha/chai-a11y) helps to include accessibility testing as part of the unit tests itself. This helps in cutting down lead time by eliminating dependency over the QA deployments. Accessibility issues can now be spotted in the development phase itself.

> Recursively conducts accessibility audits on HTML partials / snippets / mocked HTML response (inclusive of child nodes)

> **NPM MODULE** of [a11y-auditor](https://www.npmjs.com/package/a11y-auditor)

> Status : Dev (in progress)

**Pull requests are welcome!**


#### TIP :
---------------------------------------------------------
Its recommended to use a11y-auditor to run accessibility audit for A, AA, AAA compliance on your web pages as part of your Dev testing (unit tests) itself via the [chai-a11y](https://github.com/pranavjha/chai-a11y) plugin.

[chai-a11y](https://github.com/pranavjha/chai-a11y) is a chai plugin available as an [npm](https://github.com/pranavjha/chai-a11y) module which consumes a11y-auditor and helps run tests and conduct audits.

[chai-a11y](https://github.com/pranavjha/chai-a11y) helps to run a11y-auditor on a headless phantomJS instance (AMD, common JS style) and also via script tag loading.



#### For Node JS usage :
---------------------------------------------------------
require the module as require('a11y-auditor') and add it to the dependencies. This will return a [function validator()]. Use it in your module. But its recommended to use a11y-auditor with the chai-a11y plugin that provides BDD style assertions via CHAI JS and can be integrated with mocha tests and run on development machines and CI.

```
var auditRunner = require('a11y-auditor');

var result = auditRunner(htmlSelector, rulesConfig, auditConfig);
```


#### For Browser usage (include <script...> and run without AMD):
---------------------------------------------------------
Use the distribution file at dist/browser/main.js. Implement it as :

```
window.onload = function(){
		auditRunner(htmlSelector, rulesConfig, auditConfig);
}
```
But its recommended to use a11y-auditor with the chai-a11y plugin that provides BDD style assertions via CHAI JS and can be integrated with mocha tests and run on development machines and CI.


#### For JAVA projects :
---------------------------------------------------------
It is possible to run a grunt workflow via MAVEN builds using the [Front end maven plugin](https://github.com/eirslett/frontend-maven-plugin) and execute test cases built on mocha and chai. The above setup for a11y-auditor & chai-a11y ( mentioned above for Node JS ) holds good here as well, as the Front End Maven plugin downloads and installs a node executable. You will have to [integrate your project](https://www.linkedin.com/pulse/node-npm-java-maven-damodaran-sathyakumar) with the Front End Maven Plugin before attempting to use a11y-auditor for JAVA based projects built on JSP / JSF / Struts.


#### Method definition of method exported by the Module :
--------------------------------------------------

The method takes in 3 parameters:

```
var auditRunner = require('a11y-auditor');

var result = auditRunner(htmlSelector, rulesConfig, auditConfig);

```

1. htmlSelector or DOM object - A valid HTML selector or a DOM object (containing child nodes is also cool) (eg. 'button')
2. rulesConfig - A config obj containing rules to be ignored for some elements matched by valid HTML selectors as shown below
3. auditConfig - A config obj for the a11y-auditor that governs compliance, global rules execution etc.,

auditConfig takes in 2 properties / keys :

- 'executeGlobalRules': A Boolean to indicate whether global rules that audit the whole document need to be ignored.
- 'compliance' : Takes one of the 3 strings : 'A', 'AA', 'AAA'.


#### To ignore a few rules :
-----------------------

```
function(“htmlSelector”, {
	‘selector_1’ : [‘array of rules to ignore’],
	‘selector_2’ : [‘array of rules to ignore’],
	‘selector_3’ : [‘*’] //* will skip all rules for the selector
},{
	executeGlobalRules : true,
	compliance : 'AA'
	});
```


#### To author new rules :
---------------------------------------------------------
1. Create a new numbered rule named file AX_XX.js (eg: AX_01.js) under lib/rulesImpl
2. Follow the pattern in which the files are authored under lib/rulesImpl/AX_XXX.js
3. Place an entry in lib/rulesProcessor/rulesExecutor.js (for the auditRunner to pick up your rule)
4. The exported object via module.exports will contain the following:

```
module.exports = {
	name: "shortNameMentioningWhatThisRuleDoes",
	description: "Detailed description of the rule",
	ruleID: "AX_XXX",
	tagName: ['array of tagName affected'],
	handler: Handler function Implementation,
	isGlobal: Boolean //to indicate if this rule checks on document level checks,
	compliance : 'AA'
};
```


#### File Structure :
--------------------

| Directory  | Description |
| -----------| ------------- |
| dist/  | The distribution file to use in browser environments |
| lib/auditRunner  | The engine that recursively iterates & performs the audit & exposes an interface to consume  |
| lib/constants  | Constants / Enums  |
| lib/axs  | Utils for certain rules  |
| lib/enums  | List of enums  |
| lib/mapper  | Mapper functions that map rules to handler and tagName  |
| lib/rulesImpl  | Implementation functions that contain the rule implementation  |
| lib/rulesProcessor  | Code to pick up rules and add it to the auditRulesCreator  |
| lib/utils  | Code containing utils for enum creation, DOM object checks and dependency injections  |
| test/  | The test cases written for this project  |

#### Implementation Tests :
--------------------

Individual tests for each of the rules implemented have been placed under tests. The test cases are built with the help of
[Mocha](http://mochajs.org) and [Chai](http://chaijs.com) for BDD style assertions. The tests are integrated into the workflow via Grunt.


#### Rule Understanding:
--------------------

To know what each rule does, look at the a11y.properties.json file.


#### Dependencies :
--------------------

jQuery (v 2.2.0), lodash (4.3.0)
