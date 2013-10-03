/* A RESTful resource handler for testing and example
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'rsrc_handler_base'
],
function(_, BaseRsrcHandler) {
	"use strict";


	var tests = [
		{
			name: "test 1"
		},
		{
			name: "test 2"
		},
		{
			name: "test 3"
		}
	];
	var test_index = {};
	_.each(tests, function(element, index, list) {
		test_index[element.name] = element;
	});


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

	// should add all rsrc ids in the list
	// TOREVIEW efficiency if great number ?
	methods.list_rsrcs = function() {
		return test_index.keys();
	};

	// precondition : id is valid
	methods.is_rsrc_existing = function() {
		xxx
	};

	// precondition : id is valid and rsrc exists
	methods.delete_rsrc = function() {
		xxx
	};

	// TODO put the following content-dependent primitives in a subclass dedicated to content type !

	// precondition : id is valid
	methods.dump_rsrc_representation = function() {
		xxx
	};

	// new rsrc id should be in the result
	methods.create_new_rsrc = function() {
		xxx
	};

	// precondition : id is valid and rsrc exists
	// BEWARE OF MASS ASSIGNMENT !
	methods.update_rsrc = function() {
		xxx
	};


	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function TestRsrcHandler() {
		_.defaults( this, defaults ); // may also set parent's defaults, depending on how we inherited

		// optional : call parent ?

		// other inits...
		methods.init.apply(this, arguments);
	};

	// in this case, "class" inheritance via prototype chain
	DefinedClass.prototype = Object.create(BaseRsrcHandler.klass.prototype);
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
