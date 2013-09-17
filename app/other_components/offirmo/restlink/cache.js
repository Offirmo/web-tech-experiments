/* A very simple cache,
 * optionally saving to local storage (if available)
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'store'
],
function(_, store) {
	"use strict";

	// TODO use store
	// TODO add ability to create instances and create a default instance

	var cache = {
		internal_storage: {},

		set: function(key, value){
			//console.log("cache : storing : " + key + "...");
			this.internal_storage[key] = value;
		},

		get: function(key){
			//console.log("cache : accessing : " + key + "...");
			return this.internal_storage[key];
		}
	};

	return cache;
}); // requirejs module
