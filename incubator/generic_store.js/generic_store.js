/* A generic store builder.
 *
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'extended-exceptions',

	'generic_store/store_impl_memory',
	'generic_store/store_impl_local_storage'
],
function(_, EE, InMemoryStore, LocalStorageStore) {
	"use strict";

	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};

	////////////////////////////////////
	constants.in_memory = "memory";
	constants.local_storage = "local";


	////////////////////////////////////
	//defaults. = ;


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods. = ;


	function make_new_store(backend) {
		if(backend === constants.in_memory) {
			return InMemoryStore.make_new();
		}

		// any other backend is not recognized
		throw new Error();
	}

	function get_existing_store(backend, optional_prefix) {

		if(backend === constants.local_storage) {
			return LocalStorageStore.get_facade(optional_prefix);
		}

		// any other backend is not recognized
		throw new Error();
	}

	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new'   : make_new_store,
		// or if global, retrieved
		'get_existing' : get_existing_store,
		// exposing these allows convenient syntax and also prototypal inheritance
		'constants'  : constants,
		'exceptions' : exceptions
	};
}); // requirejs module
