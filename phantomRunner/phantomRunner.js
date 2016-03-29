
//> get the webpage module, system module
var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs'),
    path,
    pathToA11yAuditor,
    filePath;

//> Total number of arguments on CLI is 4
//> the 1st argument in phantomjs CLI is this file itself - system.args[0]
//> the 2nd argument in phantomjs CLI is file path / URL of page which has to be audited - system.args[1]
//> the 3rd argument in phantomjs CLI is the path to the a11y-auditor.min.js - system.args[2]
//> the 4th argument in phantomjs CLI is the path to the writable output file.json - system.args[3]

//> grant access to all cross orgins
page.settings.webSecurityEnabled = false;

//> check if the a11y-auditor.min.js and the file path / URL is sent. In effect, there has to be 2 args
if (system.args.length !== 4) {
    console.log('Either the path to the a11y-auditor.min.js (or) the URL of page / path to static HTML file (or) the path to the writable output file.json is missing!');
    phantom.exit(1);
} else {
    //> get the URL / path to the static file
    path = system.args[1];

    //> get the path to the a11y-auditor.min.js
    pathToA11yAuditor = system.args[2];

    //> get the path to the file to write to
    filePath = system.args[3];

    //> open the file via the path / URL in the phantom JS instance
    page.open(path, function (status) {
        //> if status is a success
        if (status === 'success') {
            //> inject the a11y-auditor.min.js from its path mentioned from CLI
            page.injectJs(pathToA11yAuditor);
            var result = page.evaluate(function() {
              return auditRunner();
          });
            //> stringify the output object from auditRunner
            result = JSON.stringify(result);
            //> write the JSON response into the filePath mentioned in CLI
            fs.write(filePath, result, 'w');
            //> successfully close down the phantom instance
            phantom.exit(0);
        } else { //> if it fails to open the path / URL
            console.log('Failed to load the page / file ' + path + '. Status: ' + status);
            //> exit phantom with error
            phantom.exit(1);
        }
    });
}
