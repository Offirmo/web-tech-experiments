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
	chai.Assertion.includeStack = true; // defaults to false

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

		describe('adapters', function() {

			it('should be insertable', function() {
				var adapter_started = false;
				var fake_adapter = {
					startup : function() {
						adapter_started = true;
					},
					shutdown : function() {
						adapter_started = false;
					}
				};
				var out = CUT.make_new();

				out.startup();
				adapter_started.should.be.false;
				out.add_adapter(fake_adapter);
				adapter_started.should.be.true;
				out.shutdown();
				adapter_started.should.be.false;
			});

			it('should work', function() {
				xxx
			});

		}); // describe feature

		describe('request handling', function() {

			it('should be configurable', function() {
				xxx
			});

			it('should work', function() {
				xxx
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
