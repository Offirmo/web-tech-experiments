/* A restlink server session
 * A session is a set of data shared across several requests
 * Can contains login status, etc.
 * Can expire after a set of time, etc.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore'
],
function(_) {
	"use strict";

	var Session = {
		make_new: function() {
			return {
				// TODO
			};
		}
	};

	return Session;
}); // requirejs module
