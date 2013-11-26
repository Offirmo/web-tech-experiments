/* Offirmo App session footprint (client side)
 * = data stored locally (cookie like) that allows to restart a session
 * A store may be provided, will default to local storage.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'base-objects/backbone/base_object',
	'generic_store/generic_store', // to generate default if not provided
	'offirmo_app/common/session',
	'offirmo_app/common/identity'
],
function(_, BBBaseObject, GenericStore, Session, Identity) {
	"use strict";

	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};

	////////////////////////////////////
	constants.latest_serialization_version = 1;
	constants.keys = {
		u_serialization_version : "serialization_version", //< kept even if manually disconnected
		u_current_session_id    : "current_session_id",    //< current session id. undef if none/logged out
		u_last_username         : "last_username",         //< how we should call the user, kept even if manually disconnected
		u_last_user_id          : "last_user_id"           //< user id, kept even if manually disconnected
	};


	function retrieve_raw_data_snapshot(store) {

		// first check serialization version
		var current_version = store.get(constants.keys.u_serialization_version);
		if(typeof current_version !== 'undefined' && current_version !== constants.latest_serialization_version) {
			// persisted data is of different version !
			// (older or newer)
			throw Error("TODO HANDLE");
		}

		// then get data
		var result = {};
		for(var key in constants.keys) {
			if(constants.keys.hasOwnProperty(key)) {
				// read data
				var temp = store.get(constants.keys[key]);
				if(typeof temp !== 'undefined')
					result[key] = temp;
			}
		}

		return result;
	}


	////////////////////////////////////
	// A Backbone model, serializable
	var ParentModel = BBBaseObject;
	var SessionFootprintModel = ParentModel.extend({
		defaults: function(){
			// model properties
			ParentModel.prototype.defaults.apply(this, arguments);
			this.set({
				serialization_version   : constants.latest_serialization_version,
				u_serialization_version : undefined,
				u_last_username         : undefined,
				u_last_user_id          : undefined,
				u_current_session_id    : undefined
			});
		},

		initialize: function() {
			ParentModel.prototype.initialize.apply(this, arguments);
			// meta properties (not in the model)
			var temp = this.get('store'); // was automatically added as attribute
			this.unset('store'); // not an attribute even if passed along
			this.store_ = temp; // keep for later
			this.session_ = undefined; // for now
		},

		// override of default.
		// this in an accepted technique
		sync: function(method, model, options) {
			console.log("Footprint sync('"+method+"',...) called with ", arguments);
			console.log("Sync begin - Current changes = ", model.changed_attributes());

			// now simulate the operations
			if(method === "read") {
				var data = retrieve_raw_data_snapshot(this.store_);
				// pretend we recognized him and give him a server id
				model.id = 1;
				// copy fetched data
				this.set(data);
				// all in sync
				this.declare_in_sync();
			}
			else if(method === "create") {
				// give him a server id
				model.id = 1;
				// TODO persist
				this.declare_in_sync();
			}
			else if(method === "update") {
				// TODO persist
				this.declare_in_sync();
			}
			else if(method === "delete") {
				// TODO do it
				this.declare_in_sync();
			}
			else {
				// WAT ?
			}

			console.log("Sync end - Current changes = ", model.changed_attributes());
		},

		// ultimately, it's the goal of this object to restore a session
		get_session: function() {
			if(typeof this.session_ === 'undefined') {
				var session = new Session();
				var identity = new Identity();
				identity.aggregation_parent = session;

				// fill members
				// u_last_user_id
				session.set('user_id', this.get('u_last_user_id')); // ok if undefined
				// u_current_session_id
				var temp = this.get('u_current_session_id');
				if(typeof temp !== 'undefined') {
					session.id = temp;
				}
				// u_last_username
				temp = this.get('u_last_username');
				if(typeof temp !== 'undefined') {
					identity.set('username', temp);
					session.current_identity = identity;
					session.set('current_identity_id', undefined);
				}
				this.session_ = session;
			}
			return this.session_;
		}
	});

	function retrieve_footprint(store, prefix) {

		if(typeof prefix === 'undefined')
			prefix = ""; // by default

		if(typeof store === 'undefined')
			store = GenericStore.get_existing("local", prefix); // by default

		// create a new model
		var footprint = new SessionFootprintModel({'store' : store});

		// unpersist it
		footprint.fetch();

		// done
		return footprint;
	}

	////////////////////////////////////
	return {
		// "global" object
		'get_instance'   : retrieve_footprint,
		// utilities
		'constants': constants
	};
}); // requirejs module
