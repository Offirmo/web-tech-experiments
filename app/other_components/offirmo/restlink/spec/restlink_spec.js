if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'offirmo/restlink/restlink_server',
	'offirmo/restlink/server_internals/adapters/direct',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, RestlinkServer, DirectServerAdapter, http_constants) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false


	describe('[Integration] Restlink server', function() {

		describe('simple setup', function() {

			it('should work', function() {

				// create a restlink server
				var restlink_server = RestlinkServer.make_new();

				// give it a name for debug
				restlink_server.set_denomination("test01");

				// add handlers
				var teapot_BREW_callback = function(transaction, request) {
					var response = Response.make_new_from_request(request)
							.with_status(400)
							.with_content("I'm a teapot !");

					transaction.reply(response);
				};

				restlink_server

				// start the server
				restlink_server.startup();

				// open a connexion to it
				var client = restlink_server.open_direct_connection();

				//noinspection BadExpressionStatementJS
				out.should.exist;
				out.should.be.an('object');
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
