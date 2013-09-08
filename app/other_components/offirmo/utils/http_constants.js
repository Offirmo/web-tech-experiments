if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore' // XXX I must fake a dependency or it doesn't work !!!
],
function() {
	"use strict";

	var http_constants = {

		'methods': {
			'get':      'GET',
			'put':      'PUT',
			'post':     'POST',
			'delete':   'DELETE',
			'options':  'OPTIONS',
			'head':     'HEAD',
			'trace':    'TRACE',
			'connect':  'CONNECT',
			'propfind': 'PROPFIND' // referenced by mongoose. Real code ?

			// there are a few more, deprecated, not used or proposed
		},

		'header_fields': {
			// TODO
		},

		// HTTP status codes
		// http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
		// http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
		//
		'status_codes': {

			// 100 : informational
			status_100_continue: 100,

			// 200 : success
			status_200_ok:       200,
			status_201_created:  201,

			// 300 redirection

			// 400 : Client errors
			status_400_client_error_bad_request:          400,
			status_401_client_unauthorized:               401,
			status_403_client_forbidden:                  403,
			status_404_client_error_not_found:            404,
			status_405_client_error_method_not_allowed:   405,
			status_414_client_error_request_uri_too_long: 414,

			// 500 : Server error
			status_500_server_error_internal_error:  500,
			status_501_server_error_not_implemented: 501,
			status_502_bad_gateway:                  502,
			status_503_client_forbidden:             503,
			status_504_server_error_gateway_timeout: 504,
			status_507_insufficient_storage:         507
		},

		'status_messages': {
			100 : "Continue",

			200 : "OK",
			201 : "Created",

			400 : "Bad Request",
			401 : "Unauthorized",
			403 : "Forbidden",
			404 : "Not Found",
			405 : "Method Not Allowed",
			414 : "Request-URI Too Long",

			500 : "Internal Server Error",
			501 : "Not Implemented",
			502 : "Bad gateway",
			503 : "Service unavailable",
			504 : "Gateway Timeout",
			507 : "Insufficient Storage"
		}
	};
	Object.freeze(http_constants);
	Object.freeze(http_constants.methods);
	Object.freeze(http_constants.header_fields);
	Object.freeze(http_constants.status_codes);
	Object.freeze(http_constants.status_messages);

	return http_constants;
}); // requirejs module
