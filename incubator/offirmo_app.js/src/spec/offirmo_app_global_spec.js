/* Top spec on how to use offirmo app
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define(
[
	'chai',
	'underscore',
	'generic_store/generic_store',
	'restlink/server/restlink_server',
	'offirmo_app/server',
	'offirmo_app/client',
	'mocha'
],
function(chai, _, GenericStore, RestlinkServer, OffirmoAppServer, OffirmoAppClient) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false



	describe('[Integration] Offirmo App', function() {


		describe('simple setup', function() {

			it('should work', function(signalAsyncTestFinished) {

				/////// SERVER SIDE ///////
				// create a restlink server
				var restlink_server = RestlinkServer.make_new();

				// give it a name for debug
				restlink_server.set_denomination("test01");

				// add offirmo account handling
				// todo

				// start the server
				restlink_server.startup();


				/////// CLIENT SIDE ///////
				// open a connexion to the server
				var client_connection = restlink_server.open_direct_connection();

				// create a fake local storage for test
				var store = GenericStore.make_new("memory");

				// create a client
				var out = OffirmoAppClient.make_new(client_connection, store);
				// this should automatically trigger session creation / recuperation

				// start working
				// first we must wait for session infos to be available (if possible)

			});

		}); // describe feature


		describe('more complete setup', function() {


		}); // describe feature

	}); // describe CUT
}); // requirejs module
