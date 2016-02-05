//defining a global root dirname to save the trouble from relative paths
var __allyRoot = {
  dirname : __dirname + '/',
  pathsConfig : require(__dirname + '/'+'pathsConfig')
};
global.__allyRoot = __allyRoot;

//load the UMD loader
require(__allyRoot.dirname+'js/utils/umdLoader');

//load the rules creator
require(__allyRoot.dirname + __allyRoot.pathsConfig['auditRulesCreator']);

//load the rules
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_01']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_02']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_03']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_04']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_05']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_06']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_07']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_08']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_09']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_10']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_11']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_12']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_13']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_14']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_15']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_16']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_17']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_18']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_19']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_20']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_21']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_22']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_23']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_24']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_25']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_26']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_27']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_28']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_29']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_30']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_31']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_32']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_33']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_34']);
require(__allyRoot.dirname + __allyRoot.pathsConfig['AX_35']);

//load the audit runner and export it
module.exports = require(__allyRoot.dirname + __allyRoot.pathsConfig['run']);

//console.log(mod);
