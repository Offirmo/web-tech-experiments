/* Direct adapter class for a RESTlink client adapter
 * This adapter works via direct (local) function calls
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'jquery',
	'offirmo/restlink/client_adapter_direct',
	'offirmo/restlink/response'
],
function(_, jQuery, ClientAdapterDirect, Response) {

	var ServerAdapterDirect = {

		make_new: function() {
			var direct_adapter = {

				server: undefined, //< the server we talk to

				set_server: function(server) {
					this.server = server;
				},

				make_new_client: function() {
					var direct_client = ClientAdapterDirect.make_new();
					direct_client.set_server(this);
					return direct_client;
				},

				// direct processing call
				process_request: function(request, result_deferred) {
					if(! this.server) {
						// no server ! Can't process !
						this.resolve_request_if_no_server(request, result_deferred);
					}
					else {
						this.resolve_request(request, result_deferred);
					}
				},

				resolve_request: function(request, result_deferred) {
					//TODO
					// session ?
					// can get the caller ?
				},

				resolve_request_if_no_server: function(request, result_deferred) {
					// build an error response
					var response = Response.make_new_from_request(request, {
						return_code: Response.constants.http_code.status_500_server_error_internal_error,
						meta: {
							error_msg: 'ServerAdapterDirect process_request : no linked server !'
						}
					});
					result_deferred.resolve(response);
				}
			};

			return direct_adapter;
		}
	};

	return ServerAdapterDirect;
}); // requirejs module
