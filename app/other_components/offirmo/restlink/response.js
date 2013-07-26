/* A REST-like response,
 * to be sent over offirmo RESTlink
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'backbone'
],
function(_, Backbone) {

	// HTTP codes
	var Constants = {
		http_code: {
			// 100 : informational

			// 200 : success
			status_200_ok:       200,
			status_201_created:  201,

			// 300 redirection

			// 400 : Client errors
			status_400_client_error_bad_request:          400,
			status_404_client_error_not_found:            404,
			status_405_client_error_method_not_allowed:   405,
			status_414_client_error_request_uri_too_long: 414,

			// 500 : Server error
			status_500_server_error_internal_error: 500,
			status_501_server_error_not_implemented: 501,
			status_507_server_error_internal_error: 507
		}
	};

	var Response = {
		constants: Constants,

		make_new: function() {
			return {
				method: undefined,
				uri: undefined,
				return_code: Constants.http_code.status_500_server_error_internal_error,
				meta: {},
				content: undefined
			};
		},

		make_new_from_request: function(request, attrs) {
			var default_response = this.make_new();

			var temp_response = _.defaults({
				method: request.method,
				uri: request.uri
			}, default_response);

			attrs || (attrs = {});
			var response = _.defaults(attrs, temp_response);
			attrs.meta || (attrs.meta = {});
			response.meta = _.defaults(attrs.meta, temp_response.meta);

			return response;
		}
	};

	return Response;
}); // requirejs module
