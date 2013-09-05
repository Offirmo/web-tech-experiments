if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/restlink/server_internals/request_handlers/actual',
	'offirmo/restlink/server_internals/request_handlers/base',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, CUT, BaseRequestHandler, Request, Response, http_constants) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	var request = Request.make_new();
	request.method = 'BREW';
	request.uri = '/stanford/teapot';

	describe('restlink actual request handler', function() {

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

			it('should return a not_implemented error when called on an unknown route', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				var promise = out.handle_request({}, request);
				promise.done(function(context, response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_501_server_error_not_implemented);
					expect(response.content).to.be.undefined;
					signalAsyncTestFinished();
				});
				promise.fail(function(context, response){
					expect(false).to.be.ok;
				});
			});

			it('should allow setting callbacks', function() {
				var out = CUT.make_new();

				var test_callback = function() {};

				out.add_callback_handler("/stanford/teapot", "BREW", test_callback);
				out.add_callback_handler("/firm/:id",        "GET",  test_callback);
			});

			it('should correctly call the appropriate callback', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				var teapot_BREW_callback = function(todo) {
					// TODO
				};

				var firm_GET_callback = function(todo) {
					// TODO
				};

				out.add_callback_handler("/stanford/teapot", "BREW", teapot_BREW_callback);
				out.add_callback_handler("/firm/:id",        "GET",  firm_GET_callback);

				var promise1 = out.handle_request({}, request);
				promise1.done(function(context, response){
					response.method.should.equal("BREW");
					response.uri.should.equal("/stanford/teapot");
					response.return_code.should.equal(http_constants.status_codes.status_400_client_error_bad_request);
					expect(response.content).to.equals("I'm a teapot !");
				});
				promise1.fail(function(context, response){
					expect(false).to.be.ok;
				});

				var promise2 = out.handle_request({}, request);
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

		}); // describe feature

		describe('utilities', function() {

			it('should allow easy error generation', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				var promise = out.resolve_with_error({}, request, http_constants.status_codes.status_403_client_forbidden);
				promise.done(function(context, response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_403_client_forbidden);
					expect(response.content).to.be.undefined;
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
