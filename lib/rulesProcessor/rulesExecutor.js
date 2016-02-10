var glob = require("glob");
var auditRulesCreator = rootRequire("lib/rulesProcessor/auditRulesCreator");

//> adds all the rules to the auditRulesCreator - there is no need to add entries anywhere
//> any new rule added will get picked up by this util provided its under lib/rulesImpl/
glob("lib/rulesImpl/*.js", {}, function(er, files){
  for(var count=0; count< files.length; count++){
    auditRulesCreator.addAuditRule(rootRequire(files[count]));
  }
});
