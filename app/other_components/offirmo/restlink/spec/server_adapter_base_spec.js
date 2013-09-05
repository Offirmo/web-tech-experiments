if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/restlink/server_adapter_base',
	'mocha'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	describe('restlink base server adapter', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				out.is_started().should.be.false;
			});

		}); // describe feature

		describe('startup / shutdown', function() {

			it('should be able to start and stop', function() {
				var out = CUT.make_new();

				var fake_server = {};

				out.is_started().should.be.false;
				out.startup(fake_server);
				out.is_started().should.be.true;
				out.shutdown();
				out.is_started().should.be.false;
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
