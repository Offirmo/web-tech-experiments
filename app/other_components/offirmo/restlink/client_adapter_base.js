/* Base adapter class for a RESTlink client adapter
 * This class is not to be used 'as is' but is to be derived.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'jquery',
	'offirmo/restlink/response',
	'offirmo/utils/http_constants'
],
function(_, jQuery, Response, http_constants) {
	"use strict";

	// GET, PUT, POST, DELETE, OPTIONS, HEAD, TRACE, CONNECT

	var ClientAdapterBase = {
		make_new: function() {
			return {

				// factor common code : deferred object creation
				process_request: function(request) {
					var result_deferred = jQuery.Deferred();

					this.resolve_request(request, result_deferred);

					return result_deferred.promise();
				},

				// this method is to be overriden
				resolve_request: function(request, result_deferred) {
					// build a response
					var response = Response.make_new_from_request(request, {
						return_code: http_constants.status_codes.status_501_server_error_not_implemented,
						meta: {
							error_msg: 'ClientAdapterBase process_request is to be implemented in a derived class !'
						}
					});
					result_deferred.resolve(response);
				}
			};
		}
	};

	return ClientAdapterBase;
}); // requirejs module
