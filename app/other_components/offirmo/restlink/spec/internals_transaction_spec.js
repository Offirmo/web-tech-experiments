if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'offirmo/restlink/server_internals/server_transaction',
	'offirmo/restlink/server_internals/server_core',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/restlink/server_internals/rest_target_indexed_shared_container',
	'offirmo/utils/extended_exceptions',
	'mocha'
],
function(chai, CUT, ServerCore, Request, Response, RestIndexedContainer, EE) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	var request = Request.make_new();
	request.method = 'BREW';
	request.uri = '/stanford/teapot';

	describe('Restlink server transaction', function() {

		describe('instantiation', function() {

			it('should work', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();

				out.is_valid().should.be.true;
			});

		}); // describe feature

		describe('termination', function() {

			it('should be doable manually', function() {
				var out = CUT.make_new();

				out.invalidate();
				out.is_valid().should.be.false;
			});

		}); // describe feature

		describe('origin', function() {

			it('should come from a core via a session', function() {
				var core = ServerCore.make_new();
				core.startup();
				var session = core.create_session();
				var out = session.create_transaction();

				out.should.exist;
				expect(out).to.be.an('object');
				expect(out).to.be.an.instanceof(CUT.klass);
			});

		}); // describe feature

		describe('getters and setters', function() {

			it('should allow request setting and lock it', function() {
				var out = CUT.make_new();

				var test_request = Request.make_new()
					.with_method('BREW')
					.with_uri('/stanford/teapot');

				out.set_request(test_request);

				// test_request should now be locked
				var tempfn = function() { out.request.method = "INFUSE"; };
				tempfn.should.throw(Error, "Cannot assign to read only property \'method\' of #<RestlinkRequest>");
			});

		}); // describe feature

		describe('matching infos', function() {

			it('should be computed on demand', function() {
				// the object need to be full fledged this time
				var core = ServerCore.make_new();
				core.startup();
				var session = core.create_session();
				var out = session.create_transaction();

				out.set_request(request);

				var match_infos = out.get_match_infos();
				match_infos.should.exist;
				match_infos.found.should.be.false;
			});

		}); // describe feature

		describe('utilities', function(signalAsyncTestFinished) {

			it('should allow easy forwarding', function() {
				var out = CUT.make_new();

				out.set_request(request);

				var first_handler_called = false;
				var second_handler_called = false;

				var promise = out.forward_to_handler_and_intercept_response({'handle_request':function(trans, req){
					first_handler_called = true;
					trans.forward_to_handler({'handle_request':function(trans, req){
						second_handler_called = true,
						trans.respond(req.make_response());
					}});
				}});

				promise.then(function(trans, req, resp) {
					first_handler_called.should.be.true;
					second_handler_called.should.be.true;
					signalAsyncTestFinished();
				});

			});


			it('should allow easy response', function() {
				var out = CUT.make_new();

				// the object need to be full fledged this time
				out.parent_session = {
					get_server : function() {
						return {
							rest_indexed_shared_container: RestIndexedContainer.make_new()
						};
					}
				};
				out.request = request;

				var response = Response.make_new_from_request(request);
				var match_infos = out.get_match_infos();
				match_infos.should.exist;
				match_infos.found.should.be.false;
			});

			it('should handle incorrect response to unknown', function() {
				var out = CUT.make_new();

				out.set_request(request);

				// respond should not work with no response handler
				var tempfn = function() { out.respond(request.make_response()); };
				tempfn.should.throw(EE.InvariantNotMetError, "Empty deferred chain : bad handler or adapter ?");
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
