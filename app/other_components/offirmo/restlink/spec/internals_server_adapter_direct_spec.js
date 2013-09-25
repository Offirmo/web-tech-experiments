if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'jquery',
	'offirmo/restlink/server_internals/adapters/direct',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/restlink/server_internals/server_core',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, jQuery, CUT, Request, Response, ServerCore, http_constants) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	var request = Request.make_new();
	request.method = 'BREW';
	request.uri = '/stanford/teapot';


	describe('Restlink direct server adapter', function() {

		describe('instantiation', function() {

			it('should work', function() {
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

			it('should work', function() {
				var out = CUT.make_new();

				var fake_server = {};

				out.is_started().should.be.false;
				out.startup(fake_server);
				out.is_started().should.be.true;
				out.shutdown();
				out.is_started().should.be.false;
			});

		}); // describe feature

		describe('generated client', function() {

			it('should not be available when not started', function() {
				var out = CUT.make_new();

				// go for it
				var tempfn = function() { var client = out.new_connection(); };
				tempfn.should.throw(Error, "Can't open connection : server adapter is stopped.");
			});


			it('should work when started and configured', function(signalAsyncTestFinished) {
				var out_ = CUT.make_new();

				// give it a real server
				var server_core = ServerCore.make_new();
				server_core.add_adapter(out_);
				server_core.startup();

				var out = out_.new_connection();

				// go for it
				var promise = out.send_request(request);

				// check result (expected error : we only configured as much)

				promise.spread(function on_success(request, response){
					response.method.should.equal('BREW');
					response.uri.should.equal('/stanford/teapot');
					response.return_code.should.equal(http_constants.status_codes.status_500_server_error_internal_error);
					response.content.should.equal("Can't process request, Server misconfigured : no request handler set !");
					signalAsyncTestFinished();
				});
				promise.otherwise(function on_failure(){
					expect(false).to.be.ok;
				});
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
