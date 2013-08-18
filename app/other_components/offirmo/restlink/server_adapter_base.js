/* A generic RestLink server adapter
 * useful for using different transport mechanisms.
 * an adapter knows the linked server,
 * and is also registered to the server so it can pass him some events
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/restlink/request',
	'offirmo/restlink/response'
],
function(_, Backbone, jQuery, Request, Response) {
	"use strict";

	var constants = {
		// ...
	};
	Object.freeze(constants);

	var defaults = {
		////////////////////////////////////
		// the adapter knows its server
		'server_' : undefined
	};
	Object.freeze(defaults);

	// http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/
	// http://javascript.crockford.com/private.html
	function RestlinkServerBaseAdapter() {
		_.defaults(this,defaults );
	}

	RestlinkServerBaseAdapter.prototype.constants = constants;
	RestlinkServerBaseAdapter.prototype.startup = function(server) {
		this.server_ = server;
	};
	RestlinkServerBaseAdapter.prototype.shutdown = function() {
		this.server_ = undefined;
	};
	RestlinkServerBaseAdapter.prototype.is_started = function() {
		return (typeof this.server_ !== 'undefined');
	};


	var make_new_restlink_server_base_adapter = function() {
		return new RestlinkServerBaseAdapter();
	}; // make_new

	return {
		'make_new': make_new_restlink_server_base_adapter,
		'constants': constants,
		'defaults': defaults
	};;
}); // requirejs module
