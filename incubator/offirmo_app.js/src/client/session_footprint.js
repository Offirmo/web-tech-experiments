/* Offirmo App session footprint (client side)
 * = data stored locally (cookie like) that allows to restart a session
 * A store may be provided, will default to local storage.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',

	'generic_store/generic_store' // to generate default if not provided
],
function(_, GenericStore) {
	"use strict";

	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};

	////////////////////////////////////
	constants.serialization_version = 1;
	constants.keys = {
		serialization_version : "serialization_version",   //< kept even if manually disconnected
		last_username  : "last_username",   //< kept even if manually disconnected
		last_userlogin : "last_userlogin"  //< kept even if manually disconnected
	};

	function retrieve_raw_data_snapshot(store) {
		// read data
		return {
			'serialization_version': store.get(constants.keys.last_username);
		'last_username': store.get(constants.keys.last_username);
		'last_username': store.get(constants.keys.last_username);
	};
}

	function retrieve_footprint(store, prefix) {

		if(typeof prefix === 'undefined')
			prefix = ""; // by default

		if(typeof store === 'undefined')
			store = GenericStore.get_existing("local", prefix); // by default

		// read data
		return {
			'serialization_version': store.get(constants.keys.last_username);
			'last_username': store.get(constants.keys.last_username);
		'last_username': store.get(constants.keys.last_username);
		};
	}

	////////////////////////////////////
	return {
		// "global" object
		'instance'   : retrieve_footprint
	};
}); // requirejs module
