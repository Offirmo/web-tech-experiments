/* Direct adapter class for a RESTlink client adapter
 * This adapter works via direct (local) function calls
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/restlink/server_adapter_base',
	'offirmo/restlink/client_adapter_direct',
	'offirmo/restlink/response',
	'offirmo/utils/http_constants'
],
function(_, ServerBaseAdapter, ClientAdapterDirect, Response, http_constants) {
	"use strict";

	var base_adapter = ServerBaseAdapter.make_new();

	// inherit constants
	var constants = _.defaults({
		// ...
	}, base_adapter.constants);
	Object.freeze(constants);

	// inherit defaults
	var defaults = _.defaults({
		////////////////////////////////////
		// the adapter knows its server
		'server_' : undefined
	}, base_adapter.defaults);
	Object.freeze(defaults);


	function RestlinkServerDirectAdapter() {
		_.defaults(this,defaults );
	}

	RestlinkServerDirectAdapter.prototype.constants = constants;

	RestlinkServerDirectAdapter.prototype.make_new_client = function() {
		var direct_client = ClientAdapterDirect.make_new();
		direct_client.set_server(this);
		return direct_client;
	};

	// direct processing call
	RestlinkServerDirectAdapter.prototype.process_request = function(request, result_deferred) {
		if(! this.is_started()) {
			throw new Error("This adapter is stopped.");
		}
		else if(! this.server_) {
			// no server ! Can't process !
			this.resolve_request_if_no_server(request, result_deferred);
		}
		else {
			this.resolve_request(request, result_deferred);
		}
	};

	RestlinkServerDirectAdapter.prototype.resolve_request = function(request, result_deferred) {
		//TODO
		// session ?
		// can get the caller ?
	};

	RestlinkServerDirectAdapter.prototype.resolve_request_if_no_server = function(request, result_deferred) {
		// build an error response
		var response = Response.make_new_from_request(request, {
			return_code: http_constants.status_codes.status_500_server_error_internal_error,
			meta: {
				error_msg: 'ServerAdapterDirect process_request : no linked server !'
			}
		});
		result_deferred.resolve(response);
	};

	// inherit methods
	_.defaults(RestlinkServerDirectAdapter.prototype, Object.getPrototypeOf(base_adapter));


	var make_new_restlink_server_direct_adapter = function() {
		return new RestlinkServerDirectAdapter();
	}; // make_new

	return {
		'make_new': make_new_restlink_server_direct_adapter,
		'constants': constants,
		'defaults': defaults
	};;
}); // requirejs module
