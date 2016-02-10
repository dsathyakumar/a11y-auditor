//defining a global root dirname to save the trouble from relative paths
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

//load the audit runner and export it
module.exports = rootRequire("lib/audit/auditRunner");
