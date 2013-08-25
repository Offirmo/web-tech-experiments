if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'jquery',
	'offirmo/restlink/server_adapter_direct',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	//'offirmo/restlink/restlink_server',
	'offirmo/restlink/server_internals/server_core',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, jQuery, CUT, Request, Response, ServerCore, http_constants) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	var request = Request.make_new();
	request.method = 'BREW';
	request.uri = '/stanford/teapot';


	describe('restlink direct server adapter', function() {

		describe('instantiation', function() {

			it('should be doable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				//console.log(out);
				out.is_started().should.be.false;
			});

		}); // describe feature

		describe('startup / shutdown', function() {

			it('should be able to start and stop', function() {
				var out = CUT.make_new();

				var fake_server = {};

				out.is_started().should.be.false;
				out.startup(fake_server);
				out.is_started().should.be.true;
				out.shutdown();
				out.is_started().should.be.false;
			});

		}); // describe feature

		describe('direct request processing', function() {


			it('should fail correctly when not started', function() {
				var out = CUT.make_new();

				// note : in normal usage, interface is not to be called directly but via a client.
				// need a deferred object
				var result_deferred = jQuery.Deferred();

				// go for it
				var tempfn = function() { out.process_request(request, result_deferred); }
				tempfn.should.throw(Error, "Can't process requests : this adapter is stopped.");
			});


			it('should fail correctly when no server', function() {
				var out = CUT.make_new();
				out.startup();

				// note : in normal usage, interface is not to be called directly but via a client.
				// need a deferred object
				var result_deferred = jQuery.Deferred();

				// go for it
				var tempfn = function() { out.process_request(request, result_deferred); }
				tempfn.should.throw(Error, "Can't process requests");
			});


			it('should work when connected to a correct server', function(signalAsyncTestFinished) {
				var out = CUT.make_new();

				// give it a real server
				out.startup(ServerCore.make_new());

				// note : in normal usage, interface is not to be called directly but via a client.
				// need a deferred object
				var result_deferred = jQuery.Deferred();

				// go for it
				out.process_request(request, result_deferred);

				// check result
				var promise = result_deferred.promise();
				promise.done(function(response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_200_ok);
					response.content.should.equal('toto');
					signalAsyncTestFinished();
				});
				promise.fail(function(response){
					expect(false).to.be.ok;
				});

			});

		}); // describe feature

		describe('request processing via a client', function() {

			it('should fail correctly when no server', function(signalAsyncTestFinished) {

				var out = CUT.make_new();

				// normal usage : access via a client
				var direct_client = out.make_new_client();

				// go for it
				var promise = direct_client.process_request(request);

				// check result
				promise.done(function(response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_500_server_error_internal_error);
					response.meta.should.deep.equal({ error_msg: 'ServerAdapterDirect process_request : no linked server !' });
					expect(response.content).to.be.undefined;
					signalAsyncTestFinished();
				});
				promise.fail(function(response){
					expect(false).to.be.ok;
				});
			});

			it('should work when connected to a correct server', function(signalAsyncTestFinished) {

				// TODO
				expect(false).to.be.ok;
				signalAsyncTestFinished();

			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
