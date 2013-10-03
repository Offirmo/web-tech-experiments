/* A restlink RESTFUL resource handler
 * A base class for easily common REST operations on a resource
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

	// primitives

	// from a url id, returns an internal id
	// default implementation : identity
	methods.convert_url_id_to_internal_id = function(url_id) {
		return url_id;
	};

	// from an internal id, returns a url id
	// default implementation : identity
	methods.convert_internal_id_to_url_id = function(internal_id) {
		return internal_id;
	};

	// should add all rsrc ids in the list
	// TOREVIEW efficiency if great number ?
	methods.list_rsrcs = undefined;

	// precondition : id is valid
	methods.is_rsrc_existing = undefined;

	// precondition : id is valid and rsrc exists
	methods.delete_rsrc = undefined;

	// TODO put the following content-dependent primitives in a subclass dedicated to content type !

	// precondition : id is valid
	methods.dump_rsrc_representation = undefined;

	// new rsrc id should be in the result
	methods.create_new_rsrc = undefined;

	// precondition : id is valid and rsrc exists
	// BEWARE OF MASS ASSIGNMENT !
	methods.update_rsrc = undefined;

	// all common operations
	methods.handle_get_all = function(transaction) {

	};
	methods.handle_get_one = function(transaction) {

	};
	methods.handle_get_head = function(transaction) {

	};
	methods.handle_put_all = function(transaction) {

	};
	methods.handle_put_one = function(transaction) {

	};
	methods.handle_post = function(transaction) {

	};
	methods.handle_delete_all = function(transaction) {

	};
	methods.handleDeleteOne = function(transaction) {

	};

	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function BaseRsrcHandler() {
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
