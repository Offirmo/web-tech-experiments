/* A generic startable object
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore'
],
function(_) {
	"use strict";

	// http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/
	// http://javascript.crockford.com/private.html


	////////////////////////////////////
	var constants = {
		// ...
	};
	Object.freeze(constants);


	////////////////////////////////////
	var defaults = {
		denomination_ : "Anonymous"
	};
	Object.freeze(defaults);


	////////////////////////////////////
	var methods = {
		set_denomination : function(name) {
			this.denomination_ = name;
		},
		get_denomination : function() {
			return this.denomination_;
		}
	};
	Object.freeze(methods);


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
