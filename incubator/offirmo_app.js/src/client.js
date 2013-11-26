/* A client for executing REST operations on Backbone models
 * on a 'generic' server (distant or local)
 * with an integrated cache
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'when',
	'restlink/client/client'
],
function(_, when, RestlinkClient) {
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

	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function OffirmoAppClient(optional_local_storage) {
		_.defaults( this, defaults );
	};

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);


	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new'   : function(optional_local_storage) { return new DefinedClass(optional_local_storage); },
		// but we still expose the constructor to allow class inheritance
		'klass'      : DefinedClass,
		// exposing these allows convenient syntax and also prototypal inheritance
		'constants'  : constants,
		'exceptions' : exceptions,
		'defaults'   : defaults,
		'methods'    : methods
	};
}); // requirejs module
