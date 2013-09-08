/* A generic RestLink server adapter
 * useful for using different transport mechanisms.
 * an adapter knows the linked server,
 * and is also registered to the server so it can pass him some events
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/utils/extended_exceptions'
],
function(_, EE) {
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

	methods.init = function() {
		// init of member objects

		// the adapter knows its server
		this.server_ = undefined;
	};


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods. = ;
	methods.startup = function(server) {
		if(typeof server === 'undefined')
			throw new EE.InvalidArgument("Can't start adapter : missing server argument !");
		this.server_ = server;
		this.started_ = true;
	};
	methods.shutdown = function() {
		this.started_ = false;
		this.server_ = undefined;
	};
	methods.is_started = function() {
		return this.started_;
	};


	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function RestlinkServerBaseAdapter() {
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
