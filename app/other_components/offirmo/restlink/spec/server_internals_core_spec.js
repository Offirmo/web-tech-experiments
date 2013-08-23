if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'underscore',
	'jquery',
	'offirmo/restlink/server_internals/server_core',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/restlink/server_adapter_base',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, _, jQuery, CUT, Request, Response, ServerAdapterBase, http_constants) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('restlink server internal core', function() {

		describe('instantiation', function() {

			it('should be possible', function() {
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

			it('should work', function() {
				var out = CUT.make_new();

				out.is_started().should.be.false;
				out.startup();
				out.is_started().should.be.true;
				out.shutdown();
				out.is_started().should.be.false;
			});

			it('should properly forward start and stop to adapters', function() {
				var out = CUT.make_new();

				// first with an adapter added before start
				var test_adapter1 = ServerAdapterBase.make_new();
				test_adapter1.is_started().should.be.false;
				out.add_adapter( test_adapter1 );
				test_adapter1.is_started().should.be.false;

				out.startup();
				test_adapter1.is_started().should.be.true;

				// now an adapter added after start
				var test_adapter2 = ServerAdapterBase.make_new();
				out.add_adapter( test_adapter2 );
				test_adapter2.is_started().should.be.true;

				out.shutdown();
				test_adapter1.is_started().should.be.false;
				test_adapter2.is_started().should.be.false;
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
