/* globals describe, it */
'use strict';

//> proxyquire helps to override certain dependencies that you require in your files
var proxyquire = require('proxyquire');

//> using jsdom 3.1.2 as 4.x.x is incompatible with Node v.0.10
var jsdom = require('jsdom');
//> building a basic dom to test on
var window = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>').defaultView;

//> setting up jquery with the jsdom - else its throws error jQuery requires a window with a document
var $ = require('jquery')(window);

//> setting up chai and expect interfaces
var chai = require('chai');
//> getting the expect interface
var expect = chai.expect;

//> getting the rule that needs to be unit tested - For eg: we override jquery with $ + jsdom
var AX_04 = proxyquire('../.coverage/instrument/lib/rulesImpl/AX_04', {jquery:$});

//> setting the handler into the window context and making it globaly available
window.AX_04 = AX_04;

//> mocha -setup describing the test suite
describe('AX_04', function() {

    //> Test case : 1
    it('should not be a global rule', function() {
        expect(AX_04.isGlobal).to.equal(false);
    });

    //> Test case : 2
    it('should pass if element has a unique ID', function() {

        //build the required implementation - DIV
        var div1 = window.document.createElement('div');
        div1.setAttribute('id', 'div1');
        div1.innerHTML = 'Test page';

        //build the required implementation - DIV
        var div2 = window.document.createElement('div');
        div2.setAttribute('id', 'div2');
        div2.innerHTML = 'Test page';

        //append the objects into the body
        var body = window.document.getElementsByTagName('body')[0];
        body.appendChild(div1);
        body.appendChild(div2);

        //run the tests
        var res = window.AX_04.handler.call(window, div1);

        //remove the attached title
        body.removeChild(div1);
        body.removeChild(div2);

        expect(res.RESULT).to.equal(true);

    });

    //> Test case : 3
    it('should FAIL if element doesnt have a unique ID', function() {

        //build the required implementation - DIV
        var div1 = window.document.createElement('div');
        div1.setAttribute('id', 'div1');
        div1.innerHTML = 'Test page';

        //build the required implementation - DIV
        var div2 = window.document.createElement('div');
        div2.setAttribute('id', 'div1');
        div2.innerHTML = 'Test page';

        //append the objects into the body
        var body = window.document.getElementsByTagName('body')[0];
        body.appendChild(div1);
        body.appendChild(div2);

        //run the tests
        var res = window.AX_04.handler.call(window, div1);

        //remove the attached title
        body.removeChild(div1);
        body.removeChild(div2);

        expect(res.RESULT).to.equal(false);

    });

});
