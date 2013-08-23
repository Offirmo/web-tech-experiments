if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/restlink/restlink_server',
	'mocha'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('Restlink server', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				out.is_started().should.be.false;
				out.get_denomination().should.equal("Anonymous");
			});

		}); // describe feature

		describe('startup / shutdown', function() {

			it('should work', function() {
				var out = CUT.make_new();

				out.is_started().should.be.false;
				out.startup();
				out.is_started().should.be.true;
				out.shutdown();
				out.is_started().should.be.false;
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
