/* ...
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'when',
	'offirmo_app/common/session'
],
function(_, when, Session) {
	"use strict";


	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};


	////////////////////////////////////
	//constants. = ;

	////////////////////////////////////
	defaults.url_root = "";

	////////////////////////////////////
	//exceptions. = ;

	////////////////////////////////////
	methods.register_on = function(restlink_server) {
		// register handlers
		// session may be created and accessed
		restlink_server.on(this.url_root + '/' + Session.constants.url, "POST", function(context, req, res, next, that) {
			// we must have some params
			res.set_to_not_implemented();
			res.send();
		});
		restlink_server.on(this.url_root + '/' + Session.constants.url + '/:id', "GET", function(context, req, res, next, that) {
			// we must have some params
			res.set_to_not_implemented();
			res.send();
		});
	};

	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function OffirmoAppSessionHandler(optional_url_root) {
		_.defaults( this, defaults );

		// internal members
		//...
	};

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);


	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new'   : function(optional_url_root) { return new DefinedClass(optional_url_root); },
		// but we still expose the constructor to allow class inheritance
		'klass'      : DefinedClass,
		// exposing these allows convenient syntax and also prototypal inheritance
		'constants'  : constants,
		'exceptions' : exceptions,
		'defaults'   : defaults,
		'methods'    : methods
	};
}); // requirejs module
