/* A generic REST 'server' executing REST operations
 * transport agnostic : can run on server or in client
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone',
	'jquery',
	'offirmo/restlink/request',
	'offirmo/restlink/response'
],
function(_, Backbone, jQuery, Request, Response) {
	"use strict";

	var Constants = {
		// ...
	};

	// http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/
	// http://javascript.crockford.com/private.html
	function RestlinkServer(param) {

		////////////////////////////////////
		// the server should know its adapters
		// to be able to transmit them some events (startup/shutdown for ex.)
		var server_adapters = [];
		this.add_adapter = function(adapter) {
			server_adapters.push(adapter);
		};

		////////////////////////////////////
		// for complexity reasons, the actual handling is in another object
		var request_handler; // undefined
		this.set_request_handler = function(handler) {
			request_handler = handler;
		};

		////////////////////////////////////
		var is_started = false;
		this.startup = function() {
			is_started = true;
		};
		this.shutdown = function() {
			is_started = false;
		};
		this.is_started = function() {
			return is_started;
		};

		/// TOSORT
		// routes and their associated callbacks
		// let's use the convenient 'Router' from Backbone
		// TODO replace with optimized version ?
		//router: new Backbone.Router()
	}

	RestlinkServer.prototype.constants = Constants;

	var make_new_restlink_server = function() {
		return new RestlinkServer();
	}; // make_new


		/* Get the url matching object.
		 * Useful for installing new handlers.
		 */
		//virtual SharedUrlMatcherPtr getSharedUrlMatcher() const = 0;

		/* Get the action matching object.
		 * Useful for ?
		 */
		//virtual SharedActionMatcherPtr getActionMatcher() const = 0;

		/* Server internal interface for adapters
		 */
		//class IAdapterInterface
		//{
			/* Get the url matching object.
			 * Useful for matching requests urls.
			 */
			//virtual SharedUrlMatcherPtr getSharedUrlMatcher() const = 0;

			/* Generate (thread-safe) a new session.
			 */
			//virtual ISessionPtr createSession() = 0;

			/* Release (thread-safe) a session.
			 */
			//virtual void terminateSession(ISession&) = 0;

			/* Process (thread-safe) a generic request
			 */
			//virtual void onRequest(ITransaction& trans, const core::IRequest& req, IResponseWriter& responseWriter) = 0;
		//};

		/* Get the internal interface
		 */
		//virtual IAdapterInterfacePtr getAdapterInterface() const = 0;

	var restlink_server = {
		'make_new': make_new_restlink_server
	};

	return restlink_server;
}); // requirejs module
