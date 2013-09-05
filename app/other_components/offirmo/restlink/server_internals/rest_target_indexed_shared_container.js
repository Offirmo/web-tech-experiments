/* A special container indexed by the tuple (url, action)
 * and storing a hash where separate entities can set stuff
 */

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/restlink/route_indexed_container',
	'offirmo/utils/extended_exceptions'
],
function(_, RouteIndexedContainer, EE) {
	"use strict";


	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};


	////////////////////////////////////
	//constants. = ;
	constants.max_action_length = 30;



	////////////////////////////////////
	//defaults. = ;
	defaults.internal_container_ = undefined;


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	// private methods
	function route_indexed_container_entry() {
	}
	function action_container_entry() {
	}

	////////////////////////////////////
	//methods. = ;

	methods.get_bound_interface = function(key) {
		if(!_.isString(key)) throw new EE.InvalidArgument("key arg should be a string !");

		// prepare our closure
		var this_ = this;
		var key_ = key; // needed ?

		return {
			ensure : function(route, action) {
				return this_.internal_ensure(route, action, key_);
			},

			at : function(route, action) {
				return this_.internal_at(route, action, key_);
			},

			detailed_at : function(route, action) {
				return this_.internal_detailed_at(route, action, key_);
			}
		};
	};

	// naming notes :
	// ri = route indexed
	// rai = route+action indexed

	methods.internal_ensure = function(route, action, key) {
		if(!_.isString(route)) throw new EE.InvalidArgument("route arg should be a string !");
		if(!_.isString(action)) throw new EE.InvalidArgument("action arg should be a string !");
		if(!_.isString(key)) throw new EE.InvalidArgument("key arg should be a string !");

		var ri_entry = this.internal_container_.insert_if_not_present(route, new route_indexed_container_entry());
		if(! ri_entry.hasOwnProperty(action))
			ri_entry[action] = new action_container_entry();
		var rai_entry = ri_entry[action];
		if(! rai_entry.hasOwnProperty(key))
			rai_entry[key] = {};
		return rai_entry[key];
	};

	methods.internal_at = function(route, action, key) {
		if(!_.isString(route)) throw new EE.InvalidArgument("route arg should be a string !");
		if(!_.isString(action)) throw new EE.InvalidArgument("action arg should be a string !");
		if(!_.isString(key)) throw new EE.InvalidArgument("key arg should be a string !");

		var ri_entry = this.internal_container_.at(route);

		return ri_entry ? (ri_entry[action] ? ri_entry[action][key] : undefined) : undefined;
	};

	/* Note : key is optional
	 * because we may want to match once for all,
	 * then share the result with several users.
	 * So the resulting payload is slightly different according to the case
	 */
	methods.internal_detailed_at = function(route, action, key) {
		if(!_.isString(route)) throw new EE.InvalidArgument("route arg should be a string !");
		if(!_.isString(action)) throw new EE.InvalidArgument("action arg should be a string !");
		if(typeof key !== 'undefined' && !_.isString(key)) throw new EE.InvalidArgument("If it exists, key arg should be a string !");

		var ri_match_infos = this.internal_container_.detailed_at(route);

		// systematic
		ri_match_infos.route_found = ri_match_infos.found;
		ri_match_infos.action_found = false; // for now

		// alter result
		if (ri_match_infos.found) {

			if(!ri_match_infos.payload.hasOwnProperty(action)) {
				ri_match_infos.found = false;
			}
			else {
				ri_match_infos.action_found = true;
				var rai_entry = ri_match_infos.payload[action];

				if(typeof key !== 'undefined') {
					if(!rai_entry.hasOwnProperty(key)) {
						ri_match_infos.found = false;
					}
					else {
						ri_match_infos.payload = rai_entry[key];
					}
				}
				else {
					var get_data = function(key) {
						// note : rai_entry get scoped
						return rai_entry.hasOwnProperty(key) ? rai_entry[key] : undefined;
					};

					var get_and_optionally_create_data = function(key) {
						// note : rai_entry get scoped
						if(!rai_entry.hasOwnProperty(key))
							rai_entry[key] = {};
						return rai_entry[key];
					};

					ri_match_infos.payload = {
						'get_data' : get_data,
						'get_and_optionally_create_data' : get_and_optionally_create_data
					};
				}
			}
		}

		return ri_match_infos;
	};

	methods.shared_detailed_at = function(route, action) {
		return this.internal_detailed_at(route, action);
	};

	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function RESTIndexedContainer() {
		_.defaults( this, defaults );
		this.internal_container_ = RouteIndexedContainer.make_new();
	};

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);


	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new': function() { return new DefinedClass(); },
		// exposing these allows inheritance
		'constants'  : constants,
		'exceptions' : exceptions,
		'defaults'   : defaults,
		'methods'    : methods
	};
}); // requirejs module
