'use strict';

/***************************************************************************************
 * This is a simple immutable enumCreator
 * @param obj that needs to be made as an Enum
 * @return an Enum Generator function
 **/

function EnumGen(obj) {
    var _obj = {};
    if (arguments.length === 1 && obj !== null && typeof obj === 'object') {
        Object.keys(obj).forEach(function(name) {
            _obj[name] = obj[name];
        }, _obj);
    } else {
        throw new Error('Mention a proper enum configuration !');
    }
    Object.freeze(_obj);
    return _obj;
}
//disabling mutable object prototypes
EnumGen.prototype = Object.create(null);

//freezing the prototype (TODO:// to check if this works for some browsers or write a filler)
Object.freeze(EnumGen.prototype);

module.exports = EnumGen; //> return the enum constructor
