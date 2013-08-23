/* A generic REST 'server' executing REST operations
 * transport agnostic : can run on server or in client
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/base/offinh/named_object',
	'offirmo/base/offinh/startable_object'
],
function(_, NamedObject, StartableObject) {
	"use strict";

	// http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/
	// http://javascript.crockford.com/private.html


	////////////////////////////////////
	var constants = {
		// ...
	};
	_.defaults(constants, NamedObject.constants, StartableObject.constants);
	Object.freeze(constants);


	////////////////////////////////////
	var defaults = {
		// ...
	};
	_.defaults(defaults, NamedObject.defaults, StartableObject.defaults);
	Object.freeze(defaults);


	////////////////////////////////////
	var methods = {
		add_request_handler : function(route, method, handler) {
			// TODO
		},
		add_rsrc_handler : function(route, method, handler) {
			// TODO
		},
	};
	_.defaults(methods, NamedObject.methods, StartableObject.methods);
	Object.freeze(methods);
/*
	virtual void addAdapter(const server::IAdapterPtr& adapter);

	virtual void addRsrcHandler(const server::IResourceHandlerPtr& handler, const std::string& parentRoute = "");

	virtual void addRsrcHandler(const server::IResourceDeclarationPtr& handler, const std::string& parentRoute = "");

	virtual void addRequestHandler(const std::string& route, const std::string& action, HandlingCallback callback);
*/


	////////////////////////////////////
	function DefinedClass() {
		_.defaults( this, defaults );
	}

	DefinedClass.prototype.constants = constants;

	_.extend(DefinedClass.prototype, methods);


	////////////////////////////////////
	return {
		'make_new': function() { return new DefinedClass(); },
		'constants': constants,
		'defaults' : defaults,
		'methods'  : methods
	};
}); // requirejs module
