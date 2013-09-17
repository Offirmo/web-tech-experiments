if (typeof define !== 'function') { var define = require('amdefine')(module); }

/* Warning :
 * The cache object is a sort of global object !
 * Beware of side effects !
 */
define(
[
	'chai',
	'offirmo/restlink/cache',
	'mocha'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	describe('Restlink simple cache', function() {

		describe('instance', function() {

			it('should be retrievable', function() {
				var out = CUT;
				out.should.exist;
				out.should.be.an('object');
			});

		}); // describe feature

		describe('implementation', function() {

			it('should allow storage', function() {
				var out = CUT;
				out.set('toto', 123);
			});

			it('should allow retrieving', function() {
				var out = CUT;
				out.get('toto').should.equal(123);
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
