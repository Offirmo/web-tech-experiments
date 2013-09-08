if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'underscore',
	'jquery',
	'offirmo/restlink/server_internals/server_core',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/restlink/server_internals/adapters/base',
	'mocha'
],
function(chai, _, jQuery, CUT, Request, Response, ServerAdapterBase) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false



	describe('Restlink server internal core', function() {



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

		}); // describe feature



		describe('rest-indexed shared container member', function() {

			it('should be available', function() {
				var out = CUT.make_new();

				out.rest_indexed_shared_container.should.exist;
				out.rest_indexed_shared_container.should.be.an('object');
			});

		}); // describe feature



		describe('adapters management', function() {

			it('should allow insertion', function() {
				var out = CUT.make_new();

				out.add_adapter({});
			});

			it('should correctly propagate startup/shutdown', function() {
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

			describe('support functions', function() {

				it('should allow session creation but only when started', function() {
					var out = CUT.make_new();

					var tempfn = function() { var session = out.create_session(); };
					tempfn.should.throw(Error, "Can't create new session : server is stopped !");

					out.startup();
					var session = out.create_session(); // OK
					session.is_valid().should.be.true;
				});

				it('should allow session termination', function() {
					var out = CUT.make_new();

					out.startup();
					var session = out.create_session(); // OK
					session.is_valid().should.be.true;

					out.terminate_session(session);
					session.is_valid().should.be.false;
				});

				it('should allow handling', function() {

				});

			});

		}); // describe feature



		describe('handler management', function() {

			it('should allow insertion', function() {

			});

			it('should avoid conflicts', function() {

			});

			it('should allow customization', function() {

			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
