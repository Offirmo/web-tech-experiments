if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'jquery',
	'offirmo/restlink/server_internals/request_handlers/actual',
	'offirmo/restlink/server_internals/request_handlers/base',
	'offirmo/restlink/server_internals/rest_target_indexed_shared_container',
	'offirmo/restlink/server_internals/server_transaction',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, jQuery, CUT, BaseRequestHandler, RestIndexedContainer, Transaction, Request, Response, http_constants) {
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
				var ric = RestIndexedContainer.make_new();
				var trans = Transaction.make_new();
				trans.parent_session = {
					get_server : function() {
						return {
							rest_indexed_shared_container: ric
						};
					}
				};

				var teapot_BREW_callback = function(transaction, request) {
					var response = Response.make_new_from_request(request);
					response.return_code = http_constants.status_codes.status_400_client_error_bad_request;
					response.content = "I'm a teapot !";

					var deferred = jQuery.Deferred();
					deferred.resolve(transaction, response);

					return deferred.promise();
				};

				var firm_GET_callback = function(transaction, request) {
					var response = Response.make_new_from_request(request);
					response.return_code = http_constants.status_codes.status_200_ok;
					response.content = "I'm here !";

					var deferred = jQuery.Deferred();
					deferred.resolve(transaction, response);

					return deferred.promise();
				};

				out.add_callback_handler(ric, "/stanford/teapot", "BREW", teapot_BREW_callback);
				out.add_callback_handler(ric, "/firm/:id",        "GET",  firm_GET_callback);

				trans.request = request;
				var promise1 = out.handle_request(trans, request);
				promise1.done(function(context, response){
					response.method.should.equal("BREW");
					response.uri.should.equal("/stanford/teapot");
					response.return_code.should.equal(http_constants.status_codes.status_400_client_error_bad_request);
					expect(response.content).to.equals("I'm a teapot !");
				});
				promise1.fail(function(context, response){
					expect(false).to.be.ok;
				});

				var request2 = Request.make_new();
				request2.uri = '/firm/ACME';
				request2.method = 'GET';
				trans.request = request2;
				trans.match_infos_ = undefined; // bad !

				var promise2 = out.handle_request(trans, request2);
				promise2.done(function(context, response){
					response.method.should.equal("GET");
					response.uri.should.equal("/firm/ACME");
					response.return_code.should.equal(http_constants.status_codes.status_200_ok);
					expect(response.content).to.equals("I'm here !");
					// + TODO
				});
				promise2.fail(function(context, response){
					expect(false).to.be.ok;
				});

				promise1.done(function(){
					promise2.done(function(){
						signalAsyncTestFinished();
					});
				});
			});

			it('should control callbacks behaviour', function() {
				//add a spy on returned promise to check params type
			});

			it('should return a 404 not_found error when called on an unknown route', function(signalAsyncTestFinished) {
				var out = CUT.make_new();
				var ric = RestIndexedContainer.make_new();
				var trans = Transaction.make_new();
				trans.parent_session = {
					get_server : function() {
						return {
							rest_indexed_shared_container: ric
						};
					}
				};
				trans.request = request;

				var promise = out.handle_request(trans, request);
				promise.done(function(context, response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_404_client_error_not_found);
					response.content.should.equals('Not Found');
					signalAsyncTestFinished();
				});
				promise.fail(function(context, response){
					expect(false).to.be.ok;
				});
			});

			it('should return a 501 not_implemented error when called on an unknown action', function(signalAsyncTestFinished) {
				var out = CUT.make_new();
				var ric = RestIndexedContainer.make_new();
				var trans = Transaction.make_new();
				trans.parent_session = {
					get_server : function() {
						return {
							rest_indexed_shared_container: ric
						};
					}
				};
				trans.request = request;

				var callback = function() {};
				out.add_callback_handler(ric, "/stanford/teapot", "GET", callback);

				var promise = out.handle_request(trans, request);
				promise.done(function(context, response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_501_server_error_not_implemented);
					response.content.should.equals('Not Implemented');
					signalAsyncTestFinished();
				});
				promise.fail(function(context, response){
					expect(false).to.be.ok;
				});
			});

			it('should forward to delegate when unknown route');

		}); // describe feature


		// note : derived from parent
		describe('utilities', function() {

			it('should allow easy error generation', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				var promise = out.resolve_with_error({}, request, http_constants.status_codes.status_403_client_forbidden);
				promise.done(function(context, response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_403_client_forbidden);
					signalAsyncTestFinished();
				});
				promise.fail(function(context, response){
					expect(false).to.be.ok;
				});
			});

			it('should allow easy common errors generation', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				var promise = out.resolve_with_not_implemented({}, request);
				promise.done(function(context, response){
					response.return_code.should.equal(http_constants.status_codes.status_501_server_error_not_implemented);
					signalAsyncTestFinished();
				});
				promise.fail(function(context, response){
					expect(false).to.be.ok;
				});
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
