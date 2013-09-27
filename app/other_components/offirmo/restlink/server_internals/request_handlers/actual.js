/* The RestLink request handler
 * that actually handle requests (i.e. doesn't transfer them to other handlers)
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'offirmo/restlink/server_internals/request_handlers/base',
	'offirmo/restlink/route_indexed_container',
	'offirmo/utils/extended_exceptions',
	'offirmo/utils/http_constants'
],
function(_, BaseRequestHandler, RouteIndexedContainer, EE, http_constants) {
	"use strict";


	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};


	////////////////////////////////////
	//constants. = ;
	constants.shared_container_key = "ActualRequestHandler";


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//defaults. = ;


	////////////////////////////////////
	//methods. = ;

	// override of parent
	methods.handle_request = function(transaction, request) {

		var handled = false; // for now
		try {
			var match_infos = transaction.get_match_infos();
			if(!match_infos.route_found) {
				return this.resolve_with_error(transaction, request, http_constants.status_codes.status_404_client_error_not_found);
			}
			if(!match_infos.action_found) {
				return this.resolve_with_error(transaction, request, http_constants.status_codes.status_501_server_error_not_implemented);
			}
			if(!match_infos.found) {
				// should have been filtered by above tests !
				return this.resolve_with_error(transaction, request, http_constants.status_codes.status_500_server_error_internal_error);
			}
			var my_data = match_infos.payload.get_and_optionally_create_data(constants.shared_container_key);

			if( typeof my_data['callback'] === 'function' ) {
				return my_data.callback(transaction, request);
			}
		}
		catch(err) {
			if (err instanceof RouteIndexedContainer.exceptions.RouteTooLongError) {
				return this.resolve_with_error(transaction, request, http_constants.status_codes.status_414_client_error_request_uri_too_long);
			}
			if (err instanceof RouteIndexedContainer.exceptions.MalformedRouteError) {
				return this.resolve_with_error(transaction, request, http_constants.status_codes.status_400_client_error_bad_request);
			}
			// unknown other error
			return this.resolve_with_error(transaction, request, http_constants.status_codes.status_500_server_error_internal_error, err.message + "/n" + err.stack);
		}

		// not handled yet ?
		// TODO forward to delegate instead
		return this.resolve_with_not_implemented(transaction, request);
	};

	methods.add_callback_handler = function(rest_indexed_container, route, action, callback, replace_existing) {
		if (typeof replace_existing === 'undefined') { replace_existing = false; }

		var container = rest_indexed_container.get_bound_interface(constants.shared_container_key);

		var entry = container.ensure(route, action);

		if(entry.callback && !replace_existing)
			throw EE.InvalidArgument("Conflict : a callback is already set for this REST endpoint.");

		entry.callback = callback;
	};

	////////////////////////////////////

	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function RestlinkRequestHandlerActual() {
		_.defaults( this, defaults );

		// optional : call parent constructor
		BaseRequestHandler.klass.prototype.constructor.apply(this, arguments);

		// do our own inits
		//methods.init.apply(this, arguments);
	};

	// prototype chain (class) inheritance from base
	DefinedClass.prototype = Object.create(BaseRequestHandler.klass.prototype);
	DefinedClass.prototype.constructor = DefinedClass;

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);


	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new'   : function() { return new DefinedClass(); },
		// but we still expose the constructor to allow class inheritance
		'klass'      : DefinedClass,
		// exposing these allows convenient syntax and also prototypal inheritance
		'constants'  : constants,
		'exceptions' : exceptions,
		'defaults'   : defaults,
		'methods'    : methods,
		// class methods (should not call this of course)
		'add_callback_handler' : methods.add_callback_handler

	};
}); // requirejs module
