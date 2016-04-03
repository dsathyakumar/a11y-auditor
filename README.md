# a11y-auditor


[![Build Status](https://img.shields.io/travis/dsathyakumar/a11y-auditor.svg?style=flat-square)](https://travis-ci.org/dsathyakumar/a11y-auditor)
[![Dependency Status](https://img.shields.io/david/dsathyakumar/a11y-auditor.svg?style=flat-square)](https://david-dm.org/dsathyakumar/a11y-auditor)
[![devDependency Status](https://img.shields.io/david/dev/dsathyakumar/a11y-auditor.svg?style=flat-square)](https://david-dm.org/dsathyakumar/a11y-auditor#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/dsathyakumar/a11y-auditor.svg?style=flat-square)](https://david-dm.org/dsathyakumar/a11y-auditor#info=peerDependencies)


[![npm](https://img.shields.io/npm/v/a11y-auditor.svg)](https://david-dm.org/dsathyakumar/a11y-auditor#info=version)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)]()
[![Maintenance](https://img.shields.io/maintenance/yes/2016.svg)]()
[![Coverage Status](https://coveralls.io/repos/github/dsathyakumar/a11y-auditor/badge.svg?branch=master)](https://coveralls.io/github/dsathyakumar/a11y-auditor?branch=master)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/dsathyakumar/a11y-auditor.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)
[![CodeClimate](https://codeclimate.com/github/dsathyakumar/a11y-auditor/badges/gpa.svg)](https://codeclimate.com/github/dsathyakumar/a11y-auditor)


[![NPM](https://nodei.co/npm/a11y-auditor.png)](https://nodei.co/npm/a11y-auditor/)


#### Table of Contents
- [What is this? What does it do ?](#what-is-this-what-does-it-do-)
- [Status](#status)
- [Usage Tip with chai-a11y for BDD style to.be.accessible() assertions](#usage-tip-)
- [Configuring for Node JS Usage](#for-node-js-usage-)
- [Configuring for Browser usage (include <script...> and run without AMD)](#for-browser-usage-include--and-run-without-amd)
- [Configuring for JAVA projects](#for-java-projects-)
- [Configuring for phantomJS CLI](#configuring-to-run-on-a-phantomjs-cli-)
- [Method definition of method exported by the Module](#method-definition-of-method-exported-by-the-module-)
- [Skipping / Ignoring a few rules for some elements](#to-ignore-a-few-rules-)
- [How to author new rules ?](#to-author-new-rules-)
- [File Structure of the project](#file-structure-)
- [Test Cases](#implementation-tests-)
- [Understanding of the rules implemented](#rule-understanding)
- [Build Tasks for the project](#build-tasks)
- [Dependencies](#dependencies-)
- [Dev Dependencies](#dev-dependencies-)
- [Contributors](#ideation--contributors-)
- [License](#license)


#### What is this? What does it do ?


> This a11y project is an implementation of accessibility rules as defined in [W3C Accessibility Checklist](http://www.w3.org/TR/WCAG10/full-checklist.html)

> Accessibility testing happens on products after they are deployed onto staging and relies on the QA folks. This project along with [chai-a11y](https://github.com/pranavjha/chai-a11y) helps to include accessibility testing as part of the unit tests phase itself.

> [chai-a11y](https://github.com/pranavjha/chai-a11y) provides a BDD style `to.be.accessible()` interface for asserting a11y audits. This audit, helps in cutting down lead time by eliminating dependency over the QA deployments. Accessibility issues can now be spotted in the development phase itself.

> Recursively conducts accessibility audits on HTML partials / snippets / mocked HTML response (inclusive of child nodes)


#### Status

**Status** : Dev (in progress) & **Pull requests are welcome!**



#### Usage Tip :
---------------------------------------------------------
Its recommended to use a11y-auditor to run accessibility audit for A, AA, AAA compliance on your web pages as part of your Dev testing (unit tests) itself via the [chai-a11y](https://github.com/pranavjha/chai-a11y) plugin.

[chai-a11y](https://github.com/pranavjha/chai-a11y) is a chai plugin available as an [npm](https://www.npmjs.com/package/chai-a11y) module which consumes a11y-auditor, provides a `to.be.accessible()` interface for asserting a11y audits, and helps run tests, conduct audits on a headless phantomJS instance (supporting all flavors of javascript :- AMD, common JS style and also via script tag loading.)



#### For Node JS usage :
---------------------------------------------------------
require the module as require('a11y-auditor') and add it to the dependencies. This will return a [function ()]. Use it in your module. But its recommended to use a11y-auditor with the chai-a11y plugin that provides BDD style `to.be.accessible()` interface via chai js and can be integrated with mocha tests and run on development machines and CI.

```
var auditRunner = require('a11y-auditor');

var result = auditRunner.run(htmlSelector, rulesConfig, auditConfig);
```


#### For Browser usage (include <script...> and run without AMD):
---------------------------------------------------------
Use the distribution file at `dist/browser/a11y-auditor.min.js`. This comes bundled with dependencies like `jQuery (v 2.2.0)`, `lodash (4.3.0)`. However, if you just want the source file alone, its available at `dist/browser/a11y-auditor.min.only.js`

Implement it as :

```
window.onload = function(){
		window.auditRunner.run(htmlSelector, rulesConfig, auditConfig);
}
```
But its recommended to use a11y-auditor with the chai-a11y plugin that provides BDD style `to.be.accessible()` interface via chai and can be integrated with mocha tests and run on development machines and CI.



#### For JAVA projects :
---------------------------------------------------------
It is possible to run a grunt workflow via MAVEN builds using the [Front end maven plugin](https://github.com/eirslett/frontend-maven-plugin) and execute test cases built on mocha and chai. The above setup for a11y-auditor & chai-a11y ( mentioned above for Node JS ) holds good here as well, as the Front End Maven plugin downloads and installs a node executable. You will have to [integrate your project](https://www.linkedin.com/pulse/node-npm-java-maven-damodaran-sathyakumar) with the Front End Maven Plugin before attempting to use a11y-auditor for JAVA based projects built on JSP / JSF / Struts.


#### Configuring to run on a phantomJS CLI :
---------------------------------------------------------
The a11y-auditor has a command line runner to conduct the audit on static HTML files and on any URL's directly. To use the runner, install phantomjs then run the following command from the project root directory.

```
$ phantomjs path/to/phantomRunner.js <path-to-StaticFile-or-URL> <path-To-A11yAuditor-Distribution-File> <path-to-outPutFile>

```


#### Method definition of method exported by the Module :
--------------------------------------------------

The method takes in 3 parameters:

```
var auditRunner = require('a11y-auditor');

var result = auditRunner.run(htmlSelector, rulesConfig, auditConfig);

```

1. **htmlSelector or DOM object** - A valid HTML selector or a DOM object or a jquery DOM object (containing child nodes is also cool) (eg. 'button')
2. **rulesConfig** - A config obj containing rules to be ignored for some elements matched by valid HTML selectors as shown below
3. **auditConfig** - A config obj for the a11y-auditor that governs compliance, global rules execution etc.,

`auditConfig` takes in 3 properties / keys :

- *'executeGlobalRules'*: A Boolean to indicate whether global rules that audit the whole document need to be ignored.
- *'compliance'* : Takes an array, containing values from : `'A', 'AA', 'AAA'`
- *'displayOptions'* : Takes one of the values ` 'error', 'warning', 'errAndWarn' `



#### To ignore a few rules :
-----------------------
Rules can be ignored by passing the `ruleID` or the `short name` of the rule.

`As an example :`

```
window.auditRunner.run(“img”, {
	‘img’ : [‘imageWithoutAltText'],
	‘#sampleId1’ : [‘AX_22’, 'AX_33'],
	‘title’ : [‘*’] //* will skip all rules for the selector
},{
	executeGlobalRules : true,
	compliance : ['AA'],
	displayOptions : 'errAndWarn'
	});

```
In the above example, for the selector `#sampleId1`, rules `AX_22` and `AX_33` are skipped.
And, `AA` compliance is only tested for.
For all objects corresponding to `img` selector, the `imageWithoutAltText` is skipped.
Since the `displayOptions` is set to `errAndWarn`, all errors and Warnings are shown.

**Note :** If there is no HTML partial object or selector passed, it will perform the audit for the whole document, under the assumption that `a11y-auditor.min.js` is included inside an HTML document.


#### To execute only a selected few rules :
-----------------------
Only a select set of few rules can be executed on a given selector or DOM object.

`As an example :`

```
window.auditRunner.runOnly(“img”, {
	‘img’ : [‘imageWithoutAltText']
});

```

In the above example, for the selector `img`, only the rule `imageWithoutAltText` is executed.
Any other valid rules which may exist for this selector, is just ignored. This helps to run targeted rules on components or widgets. Also, only the first element matching the selector is used to run this test on.

#### To author new rules :
---------------------------------------------------------
1. Create a new numbered rule named file AX_XX.js (eg: AX_01.js) under lib/rulesImpl
2. Follow the pattern in which the files are authored under lib/rulesImpl/AX_XXX.js
3. The exported object via module.exports will contain the following:

```
module.exports = {
	name: "shortNameMentioningWhatThisRuleDoes",
	description: "Detailed description of the rule",
	ruleID: "AX_XXX",
	tagName: ['comma separated array of tagNames'], // the rule will execute for the tags mentioned here
	handler: function(){/* Your implementation here */},
	isGlobal: Boolean //to indicate if this rule checks on document level checks,
	compliance : ['AA']
};

```

`tagName` can take :

1. ['comma separated array of tagNames'] - if its not a Global Rule.
2. [] - if its a Global Rule as its not tag specific and will execute just once for the document.
3. ['\*'] - if its to execute for all tags

`compliance` can take values from : A, AA, AAA

`isGlobal` can take : true / false



#### File Structure :
--------------------

| Directory  | Description |
| :---         | :---       |
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

The a11y-auditor aims to automate rules defined in the [W3C Accessibility Checklist](http://www.w3.org/TR/WCAG10/full-checklist.html), which contains numerous rules.
In order to make creation of rules easier, each rule is implemented in a modular fashion in a separate file. To understand what each rule does, look at the a11y.properties.json file.



#### Build Tasks
--------------------

##### `clean` task

This task will clean up the residue directories .test, .coverage, .docs.


##### `lint` task

This task runs [jshint](http://jshint.com/), [jsonlint](https://www.npmjs.com/package/grunt-jsonlint),
[jscs](http://jscs.info/) on the source files.


##### `test` task

Runs the above lint task and [mocha](https://mochajs.org) test cases over a sampled DOM via [jsdom](https://github.com/tmpvar/jsdom)


##### `coverage` task

Runs [mocha](https://mochajs.org) test cases and use [istanbul](https://gotwarlost.github.io/istanbul/) to instrument code & collects the coverage info to build coverage reports & submit .lcov to [coveralls.io](https://coveralls.io/) for code coverage


##### `build` task

Generates the distribution file built via [Browserify](http://browserify.org) & also the Documentation and publishes it to the GH pages.


##### `document` task

Generates Code Documentation using [docco-plus](https://www.npmjs.com/package/docco-plus)



#### Dependencies :
--------------------

jQuery (v 2.2.0), lodash (4.3.0), glob (6.0.4)



#### Dev Dependencies :
--------------------
Grunt, grunt-mocha-test, Chai, grunt-browserify, jsdom, grunt-istanbul, grunt-contrib-watch, grunt-jsonlint, grunt-jscs, grunt-contrib-jshint, docco-plus, proxyquire, sinon-chai, grunt-contrib-copy, grunt-contrib-clean, require-globify



#### Ideation & Contributors :
--------------------
[@pranavjha](https://github.com/pranavjha/)
[@gopalj](https://github.com/gopalj)


#### License
-------------
> The MIT License (MIT)
