/* Direct adapter class for a RESTlink client adapter
 * This adapter works via direct (local) function calls
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'jquery',
	'offirmo/restlink/client_adapter_base',
	'offirmo/restlink/response'
],
function(_, jQuery, ClientAdapterBase, Response) {
	"use strict";

	var ClientAdapterDirect = {
		make_new: function() {
			var base_adapter = ClientAdapterBase.make_new();

			var direct_adapter_additions = {

				server_adapter: undefined, //< the server adapter we'll directly talk to

				set_server: function(direct_server_adapter) {
					this.server_adapter = direct_server_adapter;
				},

				// override of parent
				resolve_request: function(request, result_deferred) {
					if(! this.server_adapter) {
						// no server ! Can't process !
						this.resolve_request_if_no_server(request, result_deferred);
					}
					else {
						this.server_adapter.process_request(request, result_deferred);
					}
				},

				resolve_request_if_no_server: function(request, result_deferred) {
					// build a response
					var response = Response.make_new_from_request(request, {
						return_code: Response.constants.http_code.status_500_server_error_internal_error,
						meta: {
							error_msg: 'ClientAdapterDirect process_request : no linked server adapter !'
						}
					});
					result_deferred.resolve(response);
				}
			};

			return _.defaults(direct_adapter_additions, base_adapter);
		}
	};

	return ClientAdapterDirect;
}); // requirejs module
