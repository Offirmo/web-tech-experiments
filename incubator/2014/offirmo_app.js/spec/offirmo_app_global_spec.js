/* Top spec on how to use offirmo app
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define(
[
	'chai',
	'underscore',

	'generic_store/generic_store',

	'offirmo_app/server',
	'offirmo_app/client',

	'offirmo_app/client/session_footprint',
	'mocha'
],
function(chai, _, GenericStore, OffirmoAppServer, OffirmoAppClient, Footprint) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false


	function build_test_restlink_server(name) {
		// create a server persistence config

		// create a restlink server
		var server = OffirmoAppServer.make_new();

		// give it a name for debug
		server.set_denomination(name);

		// start the server
		server.startup();

		return server;
	}


	describe('[Integration] Offirmo App', function() {


		describe('simple setup', function() {

			it('should work for a 1st visit', function(/*signalAsyncTestFinished*/) {

				/////// SERVER SIDE ///////
				// create a restlink server
				var restlink_server = build_test_restlink_server("test01");


				/////// CLIENT SIDE ///////
				// open a connexion to the server
				var client_connection = restlink_server.open_direct_connection();

				// create a fake local storage for test
				var store = GenericStore.make_new("memory");

				// create a client
				var out = OffirmoAppClient.make_new(client_connection, store);

				// add listeners
				out.login_state_machine.once("onenter_logged_out", function() {
					console.log("event caught : logged out");

					// since there is no previous session, everything is default
					expect( out.logged_in ).to.be.false;
					expect( out.identity.get_denomination() ).to.equal("You");

					// go the 'account creation' path
					out.initiate_account_creation();
				});

				out.startup();
				// this should automatically trigger session creation / recuperation

				// start working
				// first we must wait for session infos to be available (if possible)

			});


			it('should work when coming back', function(/*signalAsyncTestFinished*/) {

				/////// SERVER SIDE ///////
				// create a restlink server
				var restlink_server = build_test_restlink_server("test01");


				/////// CLIENT SIDE ///////
				// open a connexion to the server
				var client_connection = restlink_server.open_direct_connection();
				// TODO add previous session

				// create a fake local storage for test
				var store = GenericStore.make_new("memory");
				// populate the store with fake data from a previous visit
				store.set(Footprint.constants.keys.ug_serialization_version,  Footprint.constants.latest_serialization_version);
				store.set(Footprint.constants.keys.ug_last_session_id,        "5678");
				store.set(Footprint.constants.keys.ug_last_session_auth_data, "123456789ABCDEF");

				// create a client
				var out = OffirmoAppClient.make_new(client_connection, store);
				// this should automatically trigger session creation / recuperation

				// now wait for the session to set up
				// since there is no previous session, everything is default
				//expect( out.logged_in ).to.be.false;
				//expect( out.identity.get_denomination() ).to.equal("You");

				// start working
				// first we must wait for session infos to be available (if possible)

			});


			it('should work when using another machine', function(/*signalAsyncTestFinished*/) {

				/////// SERVER SIDE ///////
				// create a restlink server
				var restlink_server = build_test_restlink_server("test01");


				/////// CLIENT SIDE ///////
				// open a connexion to the server
				var client_connection = restlink_server.open_direct_connection();
				// TODO add previous session

				// create a fake local storage for test
				var store = GenericStore.make_new("memory");
				// populate the store with fake data from a previous visit
				// none !

				// create a client
				var out = OffirmoAppClient.make_new(client_connection, store);

				// use creds to create a session
			});

		}); // describe feature


		describe('more complete setup', function() {


		}); // describe feature

	}); // describe CUT
}); // requirejs module
