/* An object with generic start/stop methods
 * This object is meant to be prototypally inherited.
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
		started_ : false
	};
	Object.freeze(defaults);


	////////////////////////////////////
	var methods = {
		startup : function() {
			// TODO check consistency
			this.started_ = true;
		},
		shutdown : function() {
			// TODO check consistency
			this.started_ = false;
		},
		is_started : function() {
			return this.started_;
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
