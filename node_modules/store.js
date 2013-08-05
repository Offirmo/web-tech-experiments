/* A shim of local storage for nodejs tests
 */
"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore'
],
function(_) {

	var store = {
		internal_storage: {},
		enabled: true,
		set: function(key, value){
			console.log("store : storing : " + key + "...");
			this.internal_storage[key] = value;
		},
		get: function(key){
			console.log("store : accessing : " + key + "...");
			return this.internal_storage[key];
		}
	};

	return store;
}); // requirejs module
