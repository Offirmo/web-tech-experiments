/* A generic REST 'server' executing REST operations
 * transport agnostic : can run on server or in client
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'when',
	'offirmo/utils/extended_exceptions',
	'offirmo/base/offinh/startable_object',
	'offirmo/restlink/server_internals/rest_target_indexed_shared_container',
	'offirmo/restlink/server_internals/server_session',
	'offirmo/restlink/server_internals/request_handlers/base'
],
function(_, when, EE, StartableObject, RestIndexedContainer, ServerSession, BaseRequestHandler) {
	"use strict";

	// to use when no request handler set
	// shared (since no state)
	var default_request_handler = BaseRequestHandler.make_new();


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
		// to be able to stop them
		this.sessions_ = [];
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

		var this_ = this; // for the call below
		_.each(this.server_adapters_, function(adapter) {
			adapter.startup(this_);
		});
	};

	// override of parent
	methods.shutdown = function() {

		// shutdown adapters so we won't receive new requests
		_.each(this.server_adapters_, function(adapter) {
			adapter.shutdown();
		});

		// also invalidate all existing sessions
		_.each(this.sessions_, function(session) {
			session.invalidate();
		});
		this.sessions_ = []; // no need to keep invalidated sessions

		// call parent
		StartableObject.methods.shutdown.apply(this);
	};

	methods.create_session = function() {
		if(!this.is_started())
			throw new EE.IllegalStateError("Can't create new session : server is stopped !");
		var session = ServerSession.make_new();
		session.set_server(this);
		this.sessions_.push(session);
		return session;
	};

	methods.terminate_session = function(session) {
		session.invalidate();

		// keep only the valid one
		this.sessions_ = _.filter(this.sessions_, function(session){ return session.is_valid(); });
	};

	methods.process_request = function(transaction, request) {
		var handler = this.request_handler_;
		if(typeof handler === 'undefined') {
			// fake handler just to throw error
			handler = {'handle_request':function(trans, req) {
				// we use a method from the base handler
				default_request_handler.resolve_with_internal_error(transaction, request, "Can't process request, Server misconfigured : no request handler set !");
			}};
		}

		return transaction.forward_to_handler_and_intercept_response(handler);
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
