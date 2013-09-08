if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/base/offinh/named_object',
	'mocha'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('Named Object', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				out.get_denomination().should.equals("Anonymous");
			});

		}); // describe feature

		describe('name manipulation', function() {

			it('should work', function() {
				var out = CUT.make_new();

				out.get_denomination().should.equals("Anonymous");
				out.set_denomination("toto");
				out.get_denomination().should.equals("toto");
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
