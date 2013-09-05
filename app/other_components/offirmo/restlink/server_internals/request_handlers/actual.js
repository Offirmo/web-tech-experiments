/* The RestLink request handler
 * that actually handle requests (i.e. doesn't transfer them to other handlers)
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'jquery',
	'offirmo/restlink/server_internals/request_handlers/base',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/utils/http_constants'
],
function(_, jQuery, BaseRequestHandler, Request, Response, http_constants) {
	"use strict";


	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};


	////////////////////////////////////
	//constants. = ;


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//defaults. = ;


	////////////////////////////////////
	//methods. = ;

	// override of parent
	methods.handle_request = function(context, request) {
		return this.resolve_with_not_implemented(context, request);
	};

	methods.add_callback_handler = function(route, callback) {

	};

	////////////////////////////////////

	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	function DefinedClass() {
		_.defaults( this, defaults );

		// optional : call parent constructor (after setting our defaults)
		BaseRequestHandler.klass.prototype.constructor.apply(this, arguments);

		// do our own inits
		//methods.init.apply(this, arguments);
	}

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
		'methods'    : methods
	};
}); // requirejs module
