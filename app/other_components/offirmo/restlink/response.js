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
				method       : undefined,
				uri          : undefined,
				// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
				return_code  : http_constants.status_codes.status_500_server_error_internal_error,
				meta         : {},
				content_type : undefined,
				content      : undefined,

				// easy setting. Note the "return this" for fluid interface
				with_status  : function(code)    { this.return_code = code; return this; },
				with_content : function(content) { this.content = content;  return this; },
				with_meta    : function(meta)    { this.meta = meta;        return this; }
				// other accessors not really needed.
			};
		},

		make_new_from_request: function(request, attrs) {
			var default_response = this.make_new();

			// 1st init with request values
			var temp_response = _.defaults({
				method       : request.method,
				uri          : request.uri,
				content_type : request.content_type
				// REM : status already has a default
			}, default_response);

			// then overwrite with explicite values (if any)
			attrs || (attrs = {});
			var response = _.defaults(attrs, temp_response);

			// deep for meta
			attrs.meta || (attrs.meta = {});
			response.meta = _.defaults(attrs.meta, temp_response.meta);

			return response;
		}
	};

	return Response;
}); // requirejs module
