/* A REST-like response,
 * to be sent over offirmo RESTlink
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'offirmo/utils/http_constants'
],
function(_, http_constants) {
	"use strict";

	var Response = {
		make_new: function() {
			return {
				method      : undefined,
				uri         : undefined,
				return_code : http_constants.status_codes.status_500_server_error_internal_error,
				meta        : {},
				content     : undefined,

				with_status  : function(code)    { this.return_code = code; },
				with_content : function(content) { this.content = content; },
				with_meta    : function(meta)    { this.meta = meta; }
			};
		},

		make_new_from_request: function(request, attrs) {
			var default_response = this.make_new();

			var temp_response = _.defaults({
				method : request.method,
				uri    : request.uri
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
