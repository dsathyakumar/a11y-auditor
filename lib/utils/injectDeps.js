'use strict';

/***************************************************************************************
 * dependency injection for rules creation
 * @param
 * @return an object with exposed functions
 **/

module.exports = {
    dependencies: {},

    process: function(target) {
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        //var FN_ARG_SPLIT = /,/;
        //var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
        //var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var text = target.toString();
        var args = text.match(FN_ARGS)[1].split(',');

        return target.apply(target, this.getDependencies(args));
    },

    getDependencies: function(arr) {
        var _this = this;
        return arr.map(function(value) {
            return _this.dependencies[value];
        });
    },

    register: function(name, dependency) {
        this.dependencies[name] = dependency;
    }
};
