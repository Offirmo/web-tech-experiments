/* A generic REST 'server' executing REST operations
 * transport agnostic : can run on server or in client
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/base/offinh/named_object',
	'offirmo/base/offinh/startable_object',
	'offirmo/restlink/server_internals/server_core'
],
function(_, NamedObject, StartableObject, ServerCore) {
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
	};


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods. = ;


	methods.startup = function() {
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

	methods.add_request_handler = function(route, method, handler) {
		// TODO
	};


	/*
	 virtual void addAdapter(const server::IAdapterPtr& adapter);

	 virtual void addRsrcHandler(const server::IResourceHandlerPtr& handler, const std::string& parentRoute = "");

	 virtual void addRsrcHandler(const server::IResourceDeclarationPtr& handler, const std::string& parentRoute = "");

	 virtual void addRequestHandler(const std::string& route, const std::string& action, HandlingCallback callback);
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
