if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/restlink/client_adapter_direct',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, CUT, Request, Response, http_constants) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('restlink direct client adapter', function() {

		describe('instantiation', function() {

			it('should be doable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				//...
			});

		}); // describe feature

		describe('request processing', function() {

			it('should fail correctly when no server', function(signalAsyncTestFinished) {
				var request = Request.make_new();
				request.method = 'BREW';
				request.uri = '/stanford/teapot';

				var out = CUT.make_new();
				var promise = out.process_request(request);
				promise.done(function(response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_500_server_error_internal_error);
					response.meta.should.deep.equal({ error_msg: 'ClientAdapterDirect process_request : no linked server adapter !' });
					expect(response.content).to.be.undefined;
					signalAsyncTestFinished();
				});
				promise.fail(function(response){
					expect(false).to.be.ok;
				});
			});

			it('should work when connected to a correct server', function(signalAsyncTestFinished) {

				// TODO

				var request = Request.make_new();
				request.method = 'BREW';
				request.uri = '/stanford/teapot';

				var out = CUT.make_new();
				var promise = out.process_request(request);
				promise.done(function(response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_200_ok);
					response.content.should.equal("toto");
					signalAsyncTestFinished();
				});
				promise.fail(function(response){
					expect(false).to.be.ok;
				});
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
