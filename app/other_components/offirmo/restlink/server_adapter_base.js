/* A generic RestLink server adapter
 * useful for using different transport mechanisms.
 * an adapter knows the linked server,
 * and is also registered to the server so it can pass him some events
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore'
],
function(_) {
	"use strict";

	// http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/
	// http://javascript.crockford.com/private.html


	////////////////////////////////////
	var constants = {
		// ...
	};
	Object.freeze(constants);


	////////////////////////////////////
	var defaults = {
		started_ : false,
		// the adapter knows its server
		server_ : undefined
	};
	Object.freeze(defaults);


	////////////////////////////////////
	function RestlinkServerBaseAdapter() {
		_.defaults( this, defaults );
	}

	RestlinkServerBaseAdapter.prototype.constants = constants;
	RestlinkServerBaseAdapter.prototype.startup = function(server) {
		this.server_ = server;
		this.started_ = true;
	};
	RestlinkServerBaseAdapter.prototype.shutdown = function() {
		this.started_ = false;
		this.server_ = undefined;
	};
	RestlinkServerBaseAdapter.prototype.is_started = function() {
		return this.started_;
	};


	////////////////////////////////////
	return {
		'make_new': function() { return new RestlinkServerBaseAdapter(); },
		'constants': constants,
		'defaults': defaults
	};
}); // requirejs module
