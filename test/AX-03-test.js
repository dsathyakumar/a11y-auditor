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
var AX_03 = proxyquire('../.coverage/instrument/lib/rulesImpl/AX_03', {jquery:$});

//> mocha -setup describing the test suite
describe('AX_03', function() {

    //> Test case : 1
    it('should pass if element has no aria attribute', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src', 'http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');
        imgString.setAttribute('alt', 'jquery logo');

        //invoke the handler of the rule
        var result = AX_03.handler.call(null, imgString);

        //validate the result
        expect(result.RESULT).to.equal(true);
    });

    //> Test case : 2
    it('should not be a global rule', function() {
        expect(AX_03.isGlobal).to.equal(false);
    });

    //> Test case : 3
    it('should pass if element has valid aria attribute', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src', 'http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');
        imgString.setAttribute('alt', 'jquery logo');
        imgString.setAttribute('aria-expanded', 'false');

        //invoke the handler of the rule
        var result = AX_03.handler.call(null, imgString);

        //validate the result
        expect(result.RESULT).to.equal(true);
    });

    //> Test case : 4
    it('should FAIL if element has IN-valid aria attribute', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src', 'http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');
        imgString.setAttribute('alt', 'jquery logo');
        imgString.setAttribute('aria-show', 'false');

        //invoke the handler of the rule
        var result = AX_03.handler.call(null, imgString);

        //validate the result
        expect(result.RESULT).to.equal(false);
    });

});
