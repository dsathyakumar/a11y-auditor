/**
 * *Created by gopj on 3/29/2016.
 */
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
var AX_38 = proxyquire('../.coverage/instrument/lib/rulesImpl/AX_38', {jquery:$});

//> mocha -setup describing the test suite
describe('AX_38', function() {

    //> Test case : 1
    it('should pass if submit element within form tag ', function() {
        //build the required implementation
        var document = window.document;
        var aTarget = document.createElement('input'),aForm = document.createElement('form');
        aTarget.setAttribute('type', 'submit');
        aForm.appendChild(aTarget);

        //invoke the handler of the rule
        var result = AX_38.handler.call(null, aTarget);

        //validate the result
        expect(result.RESULT).to.equal(true);
    });

    //> Test case : 2
    it('should pass if submit element is not inside the form tag', function() {
        //build the required implementation
        var document = window.document;
        var aTarget = document.createElement('input');
        aTarget.setAttribute('type', 'submit');

        //invoke the handler of the rule
        var result = AX_38.handler.call(null, aTarget);

        //validate the result
        expect(result.TYPE).to.equal('error');
    });

    //> Test case : 3
    it('should pass if input element is not a submit button', function() {
        //build the required implementation
        var document = window.document;
        var aTarget = document.createElement('input');
        aTarget.setAttribute('type', 'text');

        //invoke the handler of the rule
        var result = AX_38.handler.call(null, aTarget);

        //validate the result
        expect(result.RESULT).to.equal(false);
    });


    //> Test case : 4
    it('should not be a global rule', function() {
        expect(AX_38.isGlobal).to.equal(false);
    });

});
