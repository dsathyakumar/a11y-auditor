/* globals describe, it */
'use strict';

//> proxyquire helps to override certain dependencies that you require in your files
var proxyquire = require('proxyquire');

//> using jsdom 3.1.2 as 4.x.x is incompatible with Node v.0.10
var jsdom = require('jsdom');
var window = jsdom.jsdom('<html><head></head><body></body></html>').defaultView;

//> setting up jquery with the jsdom - else its throws error jQuery requires a window with a document
var $ = require('jquery')(window);

//> setting up chai and expect interfaces
var chai = require('chai');
var expect = chai.expect;

//> getting the rule that needs to be unit tested - For eg: we override jquery with $ + jsdom
var AX_07 = proxyquire('../.coverage/instrument/lib/rulesImpl/AX_07', {jquery:$});
window.AX_07 = AX_07;

//> mocha -setup describing the test suite
describe('AX_07', function() {

    //> Test case : 1
    it('should fail if page has NO title', function() {
        var res = window.AX_07.handler.call(window, null);
        expect(res.RESULT).to.equal(false);
    });

    //> Test case : 2
    it('should pass if page has title but throws a warning since the length of title is short', function() {
        //build the required title implementation
        var title = window.document.createElement('title');
        title.innerHTML = 'Test page';
        //append the title into the head
        var head = window.document.getElementsByTagName('head')[0];
        head.appendChild(title);
        //run the tests
        var res = window.AX_07.handler.call(window, null);
        //remove the attached title
        head.removeChild(title);
        expect(res.TYPE).to.equal('warning');
    });

    //> Test case : 3
    it('should pass if page has title of proper length', function() {
        //build the required title implementation
        var title = window.document.createElement('title');
        title.innerHTML = 'Test page for AX_07 which tests for title';
        //append the title into the head
        var head = window.document.getElementsByTagName('head')[0];
        head.appendChild(title);
        //run the tests
        var res = window.AX_07.handler.call(window, null);
        //remove the attached title
        head.removeChild(title);
        expect(res.TYPE).to.equal('info');
    });
});
