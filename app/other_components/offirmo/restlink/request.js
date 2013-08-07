/* A REST-like request,
 * to be sent over offirmo RESTlink
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone',
	'offirmo/utils/http_constants'
],
function(_, Backbone, http_constants) {
	"use strict";

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
