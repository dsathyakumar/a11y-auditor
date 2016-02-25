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
var AX_01 = proxyquire('../lib/rulesImpl/AX_01',{'jquery':$});

//> mocha -setup describing the test suite
describe('AX_01', function() {

    //> Test case : 1
    it('should pass if image tag has an alt', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src','http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');
        imgString.setAttribute('alt','jquery logo');

        //invoke the handler of the rule
        var result = AX_01.handler.call(null,imgString);

        //validate the result
        expect(result.RESULT).to.equal(true);
    });

    //> Test case : 2
    it('should pass if image tag has EMPTY alt', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src','http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');
        imgString.setAttribute('alt','');

        //invoke the handler of the rule
        var result = AX_01.handler.call(null,imgString);

        //validate the result
        expect(result.TYPE).to.equal('warning');
    });

    //> Test case : 3
    it('should pass if image tag has ROLE=presentation', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src','http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');
        imgString.setAttribute('role','presentation');

        //invoke the handler of the rule
        var result = AX_01.handler.call(null,imgString);

        //validate the result
        expect(result.RESULT).to.equal(true);
    });

    //> Test case : 4
    it('should FAIL if image tag has neither ROLE=presentation nor valid or empty alt', function() {
        //build the required implementation
        var document = window.document;
        var imgString = document.createElement('img');
        imgString.setAttribute('src','http://api.jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png');

        //invoke the handler of the rule
        var result = AX_01.handler.call(null,imgString);

        //validate the result
        expect(result.TYPE).to.not.equal(true);
    });

    //> Test case : 5
    it('should FAIL if input type image tag has neither ROLE=presentation nor valid / empty alt', function(){
        //build the required implementation
        var document = window.document;
        var input = document.createElement('input');
        input.setAttribute('type','image');
        input.setAttribute('src','https://mdn.mozillademos.org/files/2917/fxlogo.png');

        //invoke the handler of the rule
        var result = AX_01.handler.call(null,input);

        //validate the result
        expect(result.RESULT).to.not.equal(true);
    });

    //> Test case : 6
    it('should not be a global rule', function(){
        expect(AX_01.isGlobal).to.equal(false);
    });

});
