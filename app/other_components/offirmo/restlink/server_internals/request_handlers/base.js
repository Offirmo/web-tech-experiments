/* A generic RestLink request handler
 * Meant to be inserted in a server or in a handler chain
 * can handle requests or dispatch them to other objects.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'offirmo/base/offinh/startable_object',
	'offirmo/utils/http_constants'
],
function(_, StartableObject, http_constants) {
	"use strict";


	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};


	////////////////////////////////////
	//constants. = ;


	////////////////////////////////////
	//defaults. = ;


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods. = ;

	// utilities
	methods.resolve_with_error = function(transaction, request, status_code, optional_content) {
		var response = request.make_response()
				.with_status(status_code);
		if(typeof optional_content !== 'undefined') {
			response.content = optional_content;
		}
		else {
			response.content = http_constants.status_messages[status_code];
		}

		transaction.respond(response);
	};

	methods.resolve_with_not_implemented = function(transaction, request, optional_message) {
		this.resolve_with_error(transaction, request, http_constants.status_codes.status_501_server_error_not_implemented, optional_message);
	};

	methods.resolve_with_internal_error = function(transaction, request, optional_message) {
		this.resolve_with_error(transaction, request, http_constants.status_codes.status_500_server_error_internal_error, optional_message);
	};

	// default implementation, to be overriden of course
	methods.handle_request = function(transaction, request) {
		this.resolve_with_not_implemented(transaction, request);
	};


	////////////////////////////////////

	// prototypal inheritance from StartableObject
	_.defaults(constants, StartableObject.constants);
	_.defaults(defaults,  StartableObject.defaults);
	_.defaults(methods,   StartableObject.methods);
	// exceptions ?

	Object.freeze(constants);
	Object.freeze(exceptions);
	Object.freeze(defaults);
	Object.freeze(methods);

	var DefinedClass = function RestlinkRequestHandlerBase() {
		_.defaults( this, defaults );
		// other inits...
	};

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
		'methods'    : methods
	};
}); // requirejs module
