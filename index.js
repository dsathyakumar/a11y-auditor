'use strict';

//defining a global root dirname to save the trouble from relative paths
global.__base = __dirname + '/';

// load the audit runner - 'standalone' of browserify to make it global
var auditRunner = require('./lib/audit/auditInitializer');

// export the auditRunner - this is what will be sent back when require('a11y-auditor') is done
module.exports = auditRunner;
