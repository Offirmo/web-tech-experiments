"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/restlink/client_adapter_base',
	'offirmo/restlink/request',
	'offirmo/restlink/response'
],
function(chai, CUT, Request, Response) {

	var expect = chai.expect;
	chai.should();

	describe('restlink base client adapter', function() {

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

			it('should work', function(signalAsyncTestFinished) {
				var request = Request.make_new();
				request.method = 'BREW';
				request.uri = '/stanford/teapot';

				var out = CUT.make_new();
				var promise = out.process_request(request);
				promise.done(function(response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(Response.constants.http_code.status_501_server_error_not_implemented);
					response.meta.should.deep.equal({ error_msg: 'ClientAdapterBase process_request is to be implemented in a derived class !' });
					expect(response.content).to.be.undefined;
					signalAsyncTestFinished();
				});
				promise.fail(function(response){
					expect(false).to.be.ok;
				});
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
