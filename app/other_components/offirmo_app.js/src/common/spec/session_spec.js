/* Top spec on how to use offirmo app
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define(
[
	'chai',
	'underscore',

	'offirmo_app/common/session',

	'mocha'
],
function(chai, _, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false



	describe('Offirmo App Session', function() {


		describe('instantiation', function() {

			it('should work', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				//...
			});

		});


		describe('more complete setup', function() {


		}); // describe feature

	}); // describe CUT
}); // requirejs module
