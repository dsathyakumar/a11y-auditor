/* globals describe, it */
'use strict';

//> proxyquire helps to override certain dependencies that you require in your files
var proxyquire = require('proxyquire');

//> using jsdom 3.1.2 as 4.x.x is incompatible with Node v.0.10
var jsdom = require('jsdom');
var window = jsdom.jsdom().parentWindow;

//> setting up jquery with the jsdom - else its throws error jQuery requires a window with a document
var $ = require('jquery')(window);

//> setting up chai and expect interfaces
var chai = require('chai');
var expect = chai.expect;

//> getting the rule that needs to be unit tested - For eg: we override jquery with $ + jsdom
var AX_08 = proxyquire('../.coverage/instrument/lib/rulesImpl/AX_08', {jquery:$});

//> mocha -setup describing the test suite
describe('AX_08', function() {

    //> Test case : 1
    it('should FAIL if <table> doesn\'t have a summary attribute', function() {
        //build the required implementation
        var document = window.document;
        var table = document.createElement('table');

        //invoke the handler of the rule
        var result = AX_08.handler.call(null, table);

        //validate the result
        expect(result.RESULT).to.equal(false);
    });

    //> Test case : 2
    it('should FAIL if <table> has an empty summary attribute', function() {
        //build the required implementation
        var document = window.document;
        var table = document.createElement('table');
        table.setAttribute('summary', '');

        //invoke the handler of the rule
        var result = AX_08.handler.call(null, table);

        //validate the result
        expect(result.RESULT).to.equal(false);
    });

    //> Test case : 3
    it('should PASS if <table> has a summary attribute', function() {
        //build the required implementation
        var document = window.document;
        var table = document.createElement('table');
        table.setAttribute('summary', 'This table is a tabulation of vendors and prices');

        //invoke the handler of the rule
        var result = AX_08.handler.call(null, table);

        //validate the result
        expect(result.RESULT).to.equal(true);
    });

    //> Test case : 4
    it('should not be a global rule', function() {
        expect(AX_08.isGlobal).to.equal(false);
    });

});
