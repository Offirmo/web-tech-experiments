/* A javascrip object
 * Defined in "Offirmo style"
 * A cool writing that is readable
 * and doesn't constraint the user.
 * (i.e. allow all kinds of inheritance)
 *
 * Inspired from various talks and posts about javascript objects and inheritance :
 * http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/
 * http://javascript.crockford.com/private.html
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/base/spec/offinh_sample_object',
],
function(_, SampleObject) {
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

	// inheritance
	//_.defaults(constants, SampleObject.constants); // depends how we inherit
	//_.defaults(defaults,  SampleObject.defaults);  // depends how we inherit
	//_.defaults(methods,   SampleObject.methods); // depends how we inherit
	// exceptions ?

	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	function DefinedClass() {
		_.defaults( this, defaults ); // may also set parent's defaults, depending on how we inherited

		// example : call parent constructor (after setting our defaults)
		// optional depending on how we inherited
		SampleObject.klass.prototype.constructor.apply(this, arguments);
		// we can also call this one
		SampleObject.methods.init.apply(this, arguments); // choice...

		// do our own inits
		//methods.init.apply(this, arguments);
	}

	// in this case, "class" inheritance via prototype chain
	DefinedClass.prototype = Object.create(SampleObject.klass.prototype);
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
