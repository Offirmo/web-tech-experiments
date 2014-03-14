/* A "in memory" local storage for tests
 * or special uses.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'lodash' // for cloneDeep
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

		// mimic store.js API
		this.internal_storage_ = {};
		this.enabled = true;
	};


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	methods.set = function(key, value){
		//console.log("store : storing : " + key + "...");
		if(typeof key === 'undefined') {
			// very likely to be an error
			throw new Error("store in memory : set() with undefined key !");
		}

		// we need to deep clone or else we would store a ref
		// and any later modif of the source would be wrongly effective in store.
		if(_.isObject(value))
			value = _.cloneDeep(value); // Thank you lodash

		this.internal_storage_[key] = value;
	};

	methods.get = function(key){
		//console.log("store : accessing : " + key + "...");

		var value = this.internal_storage_[key];

		// we need to deep clone
		// or else the store content would be modifiable through the ref !
		if(_.isObject(value))
			value = _.cloneDeep(value); // Thank you lodash

		return value;
	};

	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function InMemoryStore() {
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
