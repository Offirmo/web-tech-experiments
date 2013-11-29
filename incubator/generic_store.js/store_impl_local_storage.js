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
		'instance'   : function() { return Store; },
		'get_facade'   : get_store_facade
	};
}); // requirejs module
