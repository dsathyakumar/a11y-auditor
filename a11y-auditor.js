//defining a global root dirname to save the trouble from relative paths
//global.__base = __dirname + '/';

// load the audit runner and export it
var auditRunner = require('./lib/audit/auditRunner');

if (typeof window !== 'undefined') {
    window.auditRunner = auditRunner;
}

module.exports = auditRunner;