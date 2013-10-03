if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'underscore',
	'offirmo/restlink/restlink_server',
	'offirmo/restlink/request',
	'offirmo/base/backbone/base_object',
//	'offirmo/restlink/server_internals/adapters/direct',
//	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, _, RestlinkServer, Request, BaseObject) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false




	var TestModel = BaseObject.extend({

		defaults: function(){
			var this_class_defaults = {
				url: 'testobject', //< (backbone) url fragment for this object

				attr1: 12,
				attr2: [ 'chai', 'underscore' ],
				attr3: { code: 543 }
			};

			// merge with parent's defaults if needed
			var parent_defaults = new BaseObject().attributes;
			var defaults = _.defaults(this_class_defaults, parent_defaults);

			return defaults;
		}
	});




	describe('[Integration] Restlink server', function() {

		describe('simple setup', function() {

			it('should work for a simple handler', function(signalAsyncTestFinished) {

				// create a restlink server
				var restlink_server = RestlinkServer.make_new();

				// give it a name for debug
				restlink_server.set_denomination("test01");

				// add handlers
				var teapot_BREW_callback = function(transaction, request) {
					var response = request.make_response()
							.with_status(400)
							.with_content("I'm a teapot !");

					transaction.respond(response);
				};

				restlink_server.add_callback_handler("/stanford/teapot", "BREW", teapot_BREW_callback);

				// start the server
				restlink_server.startup();

				// open a connexion to it
				var client = restlink_server.open_direct_connection();

				// send a request
				var request = Request.make_new()
						.with_uri("/stanford/teapot")
						.with_method("BREW");

				var promise = client.send_request(request);

				promise.spread(function(request, response) {
					response.return_code.should.equal(400);
					response.content.should.equal("I'm a teapot !");
					signalAsyncTestFinished();
				});
				promise.otherwise(function on_failure(){
					expect(false).to.be.ok;
				});
			});

		}); // describe feature


		describe('more complete setup', function() {

			it('should work for a full object handler', function(signalAsyncTestFinished) {

				// create a restlink server
				var restlink_server = RestlinkServer.make_new();

				// give it a name for debug
				restlink_server.set_denomination("test02");

				// add handlers
				xxx

				restlink_server.add_restful_rsrc_handler("/stanford/teapot", "BREW", teapot_BREW_callback);

				// start the server
				restlink_server.startup();

				// open a connexion to it
				var client = restlink_server.open_direct_connection();

				// send a request
				var request = Request.make_new()
					.with_uri("/stanford/teapot")
					.with_method("BREW");

				var promise = client.send_request(request);

				promise.spread(function(request, response) {
					response.return_code.should.equal(400);
					response.content.should.equal("I'm a teapot !");
					signalAsyncTestFinished();
				});
				promise.otherwise(function on_failure(){
					expect(false).to.be.ok;
				});
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
