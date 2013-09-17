/* A generic REST 'server' executing REST operations
 * transport agnostic : can run on server or in client
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'offirmo/base/offinh/named_object',
	'offirmo/base/offinh/startable_object',
	'offirmo/restlink/server_internals/server_core',
	'offirmo/restlink/server_internals/request_handlers/actual',
	'offirmo/restlink/server_internals/adapters/direct'
],
function(_, NamedObject, StartableObject, ServerCore, ActualRequestHandler, DirectServerAdapter) {
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
		this.core_ = ServerCore.make_new();
		this.handler_built_ = false;

		// always the direct, for convenience
		var direct_adapter = DirectServerAdapter.make_new();
		this.add_adapter( direct_adapter );
		// we also keep a ref to it for later use
		this.direct_adapter_ = direct_adapter;
	};


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods. = ;


	methods.startup = function() {
		this.ensure_request_handler_();

		// call parent
		StartableObject.methods.startup.call(this);

		// start members
		this.core_.startup();
	};
	methods.shutdown = function() {
		// stop members (reverse order)
		this.core_.shutdown();

		// call parent
		StartableObject.methods.shutdown.call(this);
	};

	methods.add_adapter = function(adapter) {
		this.core_.add_adapter(adapter);
	};

	// convenience
	methods.open_direct_connection = function(adapter) {
		return this.direct_adapter_.new_connection();
	};

	// to be overriden
	methods.build_request_handler_ = function() {
		var actual_handler = ActualRequestHandler.make_new();
		this.core_.set_request_handler(actual_handler);
	};

	methods.ensure_request_handler_ = function() {
		if(!this.handler_built_) {
			this.build_request_handler_();
		}
	};

	methods.add_callback_handler = function(route, method, handler, replace_existing) {
		ActualRequestHandler.add_callback_handler(this.core_.rest_indexed_shared_container, route, method, handler, replace_existing);
	};

	methods.add_restful_rsrc_handler = function(restful_handler, replace_existing) {
		//todo !
	};


	/*
	 virtual void addAdapter(const server::IAdapterPtr& adapter);

	 virtual void addRsrcHandler(const server::IResourceHandlerPtr& handler, const std::string& parentRoute = "");

	 virtual void addRsrcHandler(const server::IResourceDeclarationPtr& handler, const std::string& parentRoute = "");
	 */
	////////////////////////////////////

	// prototypal inheritance from StartableObject
	_.defaults(constants, StartableObject.constants);
	_.defaults(defaults,  StartableObject.defaults);
	_.defaults(methods,   StartableObject.methods);
	// exceptions ?

	// prototypal inheritance from NamedObject
	_.defaults(constants, NamedObject.constants);
	_.defaults(defaults,  NamedObject.defaults);
	_.defaults(methods,   NamedObject.methods);
	// exceptions ?

	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function RestlinkServer() {
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
