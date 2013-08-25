/* A route-based container
 * able to store data corresponding to a route
 *
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore'
],
function(_) {
	"use strict";

	////////////////////////////////////
	var constants = {
		max_route_length: 200,
		id_marker: ':',
		separator: '/'
	};
	Object.freeze(constants);


	////////////////////////////////////
	var defaults = {
		root_node : {}
	};
	Object.freeze(defaults);


	////////////////////////////////////
	var methods = {
		get_root_node: function() {
			return this.root_node;
		},

	};
	Object.freeze(methods);



	// Routers map faux-URLs to actions, and fire events when routes are
	// matched. Creating a new one sets its `routes` hash, if not set statically.
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
