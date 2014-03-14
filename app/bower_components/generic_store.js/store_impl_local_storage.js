/* A "in memory" local storage for tests
 * or special uses.
 */
if (typeof define !== 'function') {
	// node.js doesn't know require.js unless we use 'amdefine' lib
	var define = require('amdefine')(module);
	// by the way, init global var so that store.js works
	global.localStorage = require('localStorage');
}

define(
[
	'store'
],
function(Store) {
	"use strict";

	function get_store_facade(optional_prefix) {

		if(typeof optional_prefix !== 'undefined' && optional_prefix !== "")
			throw new Error("store prefix is not implemented yet !"); // not handled for now

		// no facade for now
		return Store;
	}


	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		// simulate different stores via prefixing
		'make_new'   : function(optional_prefix) { return get_store_facade(optional_prefix); },
		// but of course local storage is unique
		'instance'   : function() { return Store; },
		'get_facade' : get_store_facade
	};
}); // requirejs module
