/* A generic REST 'server' executing REST operations
 * transport agnostic : can run on server or in client
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'jquery',
	'offirmo/base/offinh/startable_object',
	'offirmo/restlink/server_internals/rest_target_indexed_shared_container'
	//'offirmo/restlink/response'
],
function(_, jQuery, StartableObject, RestIndexedContainer) {
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

		// the server should know its adapters
		// to be able to transmit them some events (startup/shutdown for ex.)
		this.server_adapters_ = [];
		// for complexity reasons, the actual handling is in another object
		this.request_handler_ = undefined; // or null ?
		// we provide a generic rest-indexed shared container
		this.rest_indexed_shared_container = RestIndexedContainer.make_new();
	};


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods. = ;

	methods.add_adapter = function(adapter) {
		this.server_adapters_.push(adapter);
		if( this.is_started()) {
			adapter.startup(this);
		}
	};

	methods.set_request_handler = function(handler) {
		this.request_handler_ = handler;
	};

	// override of parent
	methods.startup = function() {
		// call parent
		StartableObject.methods.startup.apply(this);

		_.each(this.server_adapters_, function(adapter) {
			adapter.startup(this);
		});
	};

	// override of parent
	methods.shutdown = function() {
		_.each(this.server_adapters_, function(adapter) {
			adapter.shutdown();
		});

		// call parent
		StartableObject.methods.shutdown.apply(this);
	};

	methods.create_session = function() {
		//TODO
	};

	methods.terminate_session = function(session) {
		//TODO
	};

	methods.process_request = function(transaction, request) {
		//TODO
	};

	/// TOSORT
	// routes and their associated callbacks
	// let's use the convenient 'Router' from Backbone
	// TODO replace with optimized version ?
	//router: new Backbone.Router()



	////////////////////////////////////

	// inheritance

	// prototypal inheritance from StartableObject
	_.defaults(constants, StartableObject.constants);
	_.defaults(defaults,  StartableObject.defaults);
	_.defaults(methods,   StartableObject.methods);
	// exceptions ?

	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function RestlinkServerCore() {
		_.defaults( this, defaults ); // also set parent's defaults

		// optional : call parent constructor (after setting our defaults)
		//StartableObject.prototype.constructor.apply(this, arguments);
		// other inits...
		methods.init.apply(this, arguments);
	};

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);


	////////////////////////////////////
	return {
		'klass' : DefinedClass,
		// objects are created via a factory, more future-proof
		'make_new': function() { return new DefinedClass(); },
		// exposing these allows inheritance
		'constants'  : constants,
		'exceptions' : exceptions,
		'defaults'   : defaults,
		'methods'    : methods
	};
}); // requirejs module
