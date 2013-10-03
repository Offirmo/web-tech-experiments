/* A javascript object
 * Defined in "Offirmo style"
 * A cool writing that is readable
 * and doesn't constraint the user.
 * (i.e. allow all kinds of inheritance)
 *
 * Inspired from various talks and posts about javascript objects and inheritance :
 * http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/
 * http://javascript.crockford.com/private.html
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore'
],
function(_) {
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

	methods.init = function() {
		// init of member objects
		//...
	};


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods. = ;


	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function OffirmoSampleObject() {
		_.defaults( this, defaults );
		// other inits...
		methods.init.apply(this, arguments);
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
