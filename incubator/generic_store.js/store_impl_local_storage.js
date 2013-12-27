/* A "in memory" local storage for tests
 * or special uses.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'store'
],
function(_, Store) {
	"use strict";

	function get_store_facade(optional_prefix) {

		if(typeof optional_prefix !== 'undefined' && optional_prefix !== "")
			throw new Error(); // not handled for now

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
		'get_facade'   : get_store_facade
	};
}); // requirejs module
