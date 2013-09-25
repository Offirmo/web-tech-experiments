if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'jquery',
	'offirmo/restlink/server_internals/request_handlers/actual',
	'offirmo/restlink/server_internals/request_handlers/base',
	'offirmo/restlink/server_internals/rest_target_indexed_shared_container',
	'offirmo/restlink/server_internals/server_core',
	'offirmo/restlink/request',
//	'offirmo/restlink/response',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, jQuery, CUT, BaseRequestHandler, RestIndexedContainer, ServerCore, Request, /*Response,*/ http_constants) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	var request = Request.make_new();
	request.method = 'BREW';
	request.uri = '/stanford/teapot';



	describe('Restlink actual request handler', function() {



		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should have correct inheritance', function() {
				var out = CUT.make_new();
				out.should.be.an.instanceOf(BaseRequestHandler.klass);
			});

		}); // describe feature



		describe('request handling', function() {

			it('should allow setting callbacks', function() {
				var out = CUT.make_new();
				var ric = RestIndexedContainer.make_new();

				var test_callback = function() {};

				out.add_callback_handler(ric, "/stanford/teapot", "BREW", test_callback);
				out.add_callback_handler(ric, "/firm/:id",        "GET",  test_callback);
			});

			it('should correctly call the appropriate callback', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				var core = ServerCore.make_new();
				core.startup();
				var session = core.create_session();


				var teapot_BREW_callback = function(transaction, request) {
					var response = request.make_response();
					response.return_code = http_constants.status_codes.status_400_client_error_bad_request;
					response.content = "I'm a teapot !";

					transaction.respond(response);
				};

				var firm_GET_callback = function(transaction, request) {
					var response = Response.make_new_from_request(request);
					response.return_code = http_constants.status_codes.status_200_ok;
					response.content = "I'm here !";

					transaction.respond(response);
				};

				out.add_callback_handler(core.rest_indexed_shared_container, "/stanford/teapot", "BREW", teapot_BREW_callback);
				out.add_callback_handler(core.rest_indexed_shared_container, "/firm/:id",        "GET",  firm_GET_callback);

				var trans1 = session.create_transaction(request);
				var promise1 = trans1.forward_to_handler_and_intercept_response(out);
				promise1.spread(function(transaction, request, response) {
					response.method.should.equal("BREW");
					response.uri.should.equal("/stanford/teapot");
					response.return_code.should.equal(http_constants.status_codes.status_400_client_error_bad_request);
					expect(response.content).to.equals("I'm a teapot !");
				});
				promise1.otherwise(function(){
					expect(false).to.be.ok;
				});

				var request2 = Request.make_new();
				request2.uri = '/firm/ACME';
				request2.method = 'GET';
				var trans2 = session.create_transaction(request2);
				var promise2 = trans2.forward_to_handler_and_intercept_response(out);
				promise2.spread(function(transaction, request, response) {
					response.method.should.equal("GET");
					response.uri.should.equal("/firm/ACME");
					response.return_code.should.equal(http_constants.status_codes.status_200_ok);
					expect(response.content).to.equals("I'm here !");
					// + TODO
				});
				promise2.otherwise(function(){
					expect(false).to.be.ok;
				});

				promise1.then(function(){
					promise2.then(function(){
						signalAsyncTestFinished();
					});
				});
			});

			it('should control callbacks behaviour', function() {
				//add a spy on returned promise to check params type
			});

			it('should return a 404 not_found error when called on an unknown route', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				var core = ServerCore.make_new();
				core.startup();
				var session = core.create_session();
				var trans = session.create_transaction(request);

				var promise = trans.forward_to_handler_and_intercept_response(out);
				promise.spread(function(transaction, request, response) {
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_404_client_error_not_found);
					response.content.should.equals('Not Found');
					signalAsyncTestFinished();
				});
				promise.otherwise(function(){
					expect(false).to.be.ok;
				});
			});

			it('should return a 501 not_implemented error when called on an unknown action', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				var core = ServerCore.make_new();
				core.startup();
				var session = core.create_session();

				var callback = function() {};
				out.add_callback_handler(core.rest_indexed_shared_container, "/stanford/teapot", "GET", callback);

				var trans = session.create_transaction(request);
				var promise = trans.forward_to_handler_and_intercept_response(out);
				promise.spread(function(transaction, request, response) {
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_501_server_error_not_implemented);
					response.content.should.equals('Not Implemented');
					signalAsyncTestFinished();
				});
				promise.otherwise(function(){
					expect(false).to.be.ok;
				});
			});

			it('should forward to delegate when unknown route');

		}); // describe feature


		// note : derived from parent


		describe('utilities', function() {

			it('should allow easy error generation', function(signalAsyncTestFinished) {
				var out = CUT.make_new();
				// override default implementation
				out.handle_request = function(transaction, request) {
					this.resolve_with_error(transaction, request, http_constants.status_codes.status_403_client_forbidden);
				};

				var core = ServerCore.make_new();
				core.startup();
				var session = core.create_session();
				var trans = session.create_transaction(request);

				var promise = trans.forward_to_handler_and_intercept_response(out);
				promise.spread(function(transaction, request, response) {
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_403_client_forbidden);
					response.content.should.equals('Forbidden');
					signalAsyncTestFinished();
				});
				promise.otherwise(function(){
					expect(false).to.be.ok;
				});
			});

			it('should allow easy common errors generation : not implemented', function(signalAsyncTestFinished) {
				var out = CUT.make_new();
				// override default implementation
				out.handle_request = function(transaction, request) {
					this.resolve_with_not_implemented(transaction, request);
				};

				var core = ServerCore.make_new();
				core.startup();
				var session = core.create_session();
				var trans = session.create_transaction(request);

				var promise = trans.forward_to_handler_and_intercept_response(out);
				promise.spread(function(transaction, request, response) {
					response.return_code.should.equal(http_constants.status_codes.status_501_server_error_not_implemented);
					signalAsyncTestFinished();
				});
				promise.otherwise(function(){
					expect(false).to.be.ok;
				});
			});

			it('should allow easy common errors generation : internal error', function(signalAsyncTestFinished) {
				var out = CUT.make_new();
				// override default implementation
				out.handle_request = function(transaction, request) {
					this.resolve_with_internal_error(transaction, request);
				};

				var core = ServerCore.make_new();
				core.startup();
				var session = core.create_session();
				var trans = session.create_transaction(request);

				var promise = trans.forward_to_handler_and_intercept_response(out);
				promise.spread(function(transaction, request, response) {
					response.return_code.should.equal(http_constants.status_codes.status_500_server_error_internal_error);
					signalAsyncTestFinished();
				});
				promise.otherwise(function(){
					expect(false).to.be.ok;
				});
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
