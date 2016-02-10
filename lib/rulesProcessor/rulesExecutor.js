var glob = require("glob");
var auditRulesCreator = rootRequire("lib/rulesProcessor/auditRulesCreator");


glob("lib/rulesImpl/*.js", {}, function(er, files){
  for(var count=0; count< files.length; count++){
    auditRulesCreator.addAuditRule(rootRequire(files[count]));
  }
});
