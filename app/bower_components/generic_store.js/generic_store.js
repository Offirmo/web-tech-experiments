/* A generic store builder.
 *
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'generic_store/store_impl_memory',
	'generic_store/store_impl_local_storage'
],
function(InMemoryStore, LocalStorageStore) {
	"use strict";

	////////////////////////////////////
	var constants  = {};


	////////////////////////////////////
	constants.in_memory = "memory";
	constants.local_storage = "local";


	////////////////////////////////////
	function make_new_store(backend) {
		if(backend === constants.in_memory) {
			return InMemoryStore.make_new();
		}

		// any other backend is not recognized
		throw new Error("Unrecognized or incompatible backend for store creation : '" + backend + "'");
	}

	function get_existing_store(backend, optional_prefix) {

		if(backend === constants.local_storage) {
			return LocalStorageStore.get_facade(optional_prefix);
		}

		// any other backend is not recognized
		throw new Error("Unrecognized or incompatible backend for store access : '" + backend + "'");
	}

	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new'   : make_new_store,
		// or if global, retrieved
		'get_existing' : get_existing_store,
		// exposing these allows convenient syntax and also prototypal inheritance
		'constants'  : constants
	};
}); // requirejs module
