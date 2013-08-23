/* A generic REST 'server' executing REST operations
 * transport agnostic : can run on server or in client
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone',
	'jquery',
	'offirmo/restlink/response'
],
function(_, Backbone, jQuery, Response) {
	"use strict";

	////////////////////////////////////
	var constants = {
		// ...
	};
	Object.freeze(constants);

	/// TOSORT
	// routes and their associated callbacks
	// let's use the convenient 'Router' from Backbone
	// TODO replace with optimized version ?
	//router: new Backbone.Router()


	////////////////////////////////////
	var defaults = {
		// status (start may involve opening sockets, etc.)
		is_started_ : false,
		// the server should know its adapters
		// to be able to transmit them some events (startup/shutdown for ex.)
		server_adapters_ : [],
		// for complexity reasons, the actual handling is in another object
		request_handler_ : undefined // or null ?
	};
	Object.freeze(defaults);


	////////////////////////////////////
	function RestlinkServer() {
		_.defaults( this, defaults );
	}

	RestlinkServer.prototype.add_adapter = function(adapter) {
		this.server_adapters_.push(adapter);
		if( this.is_started()) {
			adapter.startup(this);
		}
	};

	RestlinkServer.prototype.set_request_handler = function(handler) {
		this.request_handler_ = handler;
	};

	RestlinkServer.prototype.startup = function() {
		this.is_started_ = true;
		_.each(this.server_adapters_, function(adapter) {
			adapter.startup(this);
		});
	};

	RestlinkServer.prototype.shutdown = function() {
		_.each(this.server_adapters_, function(adapter) {
			adapter.shutdown();
		});
		this.is_started_ = false;
	};

	RestlinkServer.prototype.is_started = function() {
		return this.is_started_;
	};

	RestlinkServer.prototype.create_session = function() {
		//TODO
	};

	RestlinkServer.prototype.terminate_session = function(session) {
		//TODO
	};

	RestlinkServer.prototype.process_request = function(transaction, request) {
		//TODO
	};


	////////////////////////////////////
	return {
		'make_new': function() { return new RestlinkServer(); },
		'constants': constants,
		'defaults' : defaults
	};
}); // requirejs module
