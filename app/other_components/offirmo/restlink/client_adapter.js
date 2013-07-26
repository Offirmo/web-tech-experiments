/* Base adapter class for a RESTlink client adapter
 * This class is not to be used 'as is' but is to be derived.
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone'
],
function(_, Backbone) {

	// GET, PUT, POST, DELETE, OPTIONS, HEAD, TRACE, CONNECT

	var Request = {
		make_new: function() {
			return {
				method: undefined,
				uri: undefined,
				meta: [],
				content: undefined
			};
		}
	};

	return Request;
}); // requirejs module
