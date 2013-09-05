/* An object with generic start/stop methods
 * This object is meant to be prototypally inherited.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

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
	defaults.started_ = false;


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods.xyz = ...;
	methods.startup = function() {
		// TODO check consistency
		this.started_ = true;
	};
	methods.shutdown = function() {
		// TODO check consistency
		this.started_ = false;
	};
	methods.is_started = function() {
		return this.started_;
	};


	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	function DefinedClass() {
		_.defaults( this, defaults );
		// other inits...
	}

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);


	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new': function() { return new DefinedClass(); },
		// exposing these allows inheritance
		'constants'  : constants,
		'exceptions' : exceptions,
		'defaults'   : defaults,
		'methods'    : methods
	};
}); // requirejs module
