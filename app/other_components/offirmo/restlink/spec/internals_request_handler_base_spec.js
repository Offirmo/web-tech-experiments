if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'offirmo/restlink/server_internals/request_handlers/base',
	'offirmo/restlink/server_internals/server_core',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, CUT, ServerCore, Request, Response, http_constants) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	var request = Request.make_new();
	request.method = 'BREW';
	request.uri = '/stanford/teapot';

	describe('Restlink base request handler', function() {

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

			it('should work', function() {
				var out = CUT.make_new();

				out.is_started().should.be.false;
				out.startup();
				out.is_started().should.be.true;
				out.shutdown();
				out.is_started().should.be.false;
			});

		}); // describe feature

		describe('request handling', function() {

			it('should work', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				var core = ServerCore.make_new();
				core.startup();
				var session = core.create_session();
				var trans = session.create_transaction(request);

				var promise = trans.forward_to_handler_and_intercept_response(out);
				promise.spread(function on_success(context, request, response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_501_server_error_not_implemented);
					response.content.should.equals('Not Implemented');
					signalAsyncTestFinished();
				});
				promise.otherwise(function on_failure(context, request, response){
					expect(false).to.be.ok;
				});
			});

		}); // describe feature

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
