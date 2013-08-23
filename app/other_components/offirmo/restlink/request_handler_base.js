/* A generic RestLink request handler
 * Meant to be inserted in a server or in a handler chain
 * can handle requests or dispatch them to other objects.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'jquery',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/utils/http_constants'
],
function(_, jQuery, Request, Response, http_constants) {
	"use strict";


	////////////////////////////////////
	var constants = {
		// ...
	};
	Object.freeze(constants);


	////////////////////////////////////
	var defaults = {
		//...
	};
	Object.freeze(defaults);


	////////////////////////////////////
	function BaseRequestHandler() {
		_.defaults( this, defaults );
	}

	// utilities
	BaseRequestHandler.prototype.resolve_with_error = function(context, request, status_code) {
		var result_deferred = jQuery.Deferred();

		var response = Response.make_new_from_request(request);
		response.return_code = status_code;
		result_deferred.resolve(context, response);

		return result_deferred.promise();
	};

	BaseRequestHandler.prototype.resolve_with_not_implemented = function(context, request) {
		return this.resolve_with_error(context, request, http_constants.status_codes.status_501_server_error_not_implemented);
	};

	// default implementation, to be overriden of course
	BaseRequestHandler.prototype.handle_request = function(context, request) {
		return this.resolve_with_not_implemented(context, request);
	};


	////////////////////////////////////
	var make_new_restlink_base_request_handler = function() {
		return new BaseRequestHandler();
	}; // make_new

	return {
		'make_new': make_new_restlink_base_request_handler,
		'constants': constants,
		'defaults': defaults
	};
}); // requirejs module
