/**
 * A sample module which does nothing ;)
 *
 */

// browser -> require.js (preloaded) / node.js -> load amdefine
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function() {
	'use strict';

	return function do_nothing() {
		// just do nothing !
	};
}); // requirejs module
