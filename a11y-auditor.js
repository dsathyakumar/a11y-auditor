//defining a global root dirname to save the trouble from relative paths
//global.__base = __dirname + '/';

/* globals window */
'use strict';

// load the audit runner and export it
var auditInitializer = require('./lib/audit/auditInitializer');

if (typeof window !== 'undefined') {
    window.auditRunner = auditInitializer;
}

module.exports = auditInitializer;
