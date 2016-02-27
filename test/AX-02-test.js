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
var AX_02 = proxyquire('../.coverage/instrument/lib/rulesImpl/AX_02', {jquery:$});

//> mocha -setup describing the test suite
describe('AX_02', function() {

    //> Test case : 1
    it('should pass if element has no tabindex attribute', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src', 'http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');
        imgString.setAttribute('alt', 'jquery logo');

        //invoke the handler of the rule
        var result = AX_02.handler.call(null, imgString);

        //validate the result
        expect(result.RESULT).to.equal(true);
    });

    //> Test case : 2
    it('should pass if element has tabindex = 0', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src', 'http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');
        imgString.setAttribute('alt', 'jquery logo');
        imgString.setAttribute('tabindex', '0');

        //invoke the handler of the rule
        var result = AX_02.handler.call(null, imgString);

        //validate the result
        expect(result.RESULT).to.equal(true);
    });

    //> Test case : 3
    it('should fail if element has positive tabindex', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src', 'http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');
        imgString.setAttribute('alt', 'jquery logo');
        imgString.setAttribute('tabindex', '4');

        //invoke the handler of the rule
        var result = AX_02.handler.call(null, imgString);

        //validate the result
        expect(result.RESULT).to.equal(false);
    });

    //> Test case : 4
    it('should not be a global rule', function() {
        expect(AX_02.isGlobal).to.equal(false);
    });

});
