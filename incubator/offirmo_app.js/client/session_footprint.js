/* Offirmo App session footprint (client side)
 * = data stored locally (cookie like) that allows to restart a session
 * A store may be provided, will default to local storage.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'when',
	'base-objects/backbone/base_model',
	'generic_store/generic_store', // to generate default if not provided
	'offirmo_app/common/session',
	'offirmo_app/common/account',
	'offirmo_app/common/identity'
],
function(_, when, BaseModel, GenericStore, Session, Account, Identity) {
	"use strict";

	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};

	////////////////////////////////////
	constants.latest_serialization_version = 1;
	constants.keys = {
		ug_serialization_version  : "serialization_version",  //< kept even if manually disconnected

		ug_last_session_id        : "last_session_id",        //< current session id. undef if none/logged out
		ug_last_session_auth_data : "last_session_auth_data", //< additional password-like data
		                                                      //  to provide when retrieving session
		                                                      //  to prove that we are not just testing random session ids
		                                                      //  cleared if logged out
		ug_last_user_login        : "last_user_login",        //< Kept even if manually disconnected.
		                                                      //  Useful for pre-filling a login form.
		ug_last_account_id        : "last_account_id",        //< Uniquely identify an account.
		                                                      //  mandatory for every other auth scheme than login/pwd
		ug_last_identity          : "last_user_id",           //< last "how should I call you", kept even if manually disconnected
		ug_last_avatar_url        : "last_avatar_url",        //< same, kept even if manually disconnected

		ug_newly_created_account_credential : "newly_created_account_credential" //< a special "password-like" credential
		                                                      // for new accounts which still don't have user/pwd
		                                                      // of course if this is lost, account can never be recovered...
	};


	function retrieve_raw_data_snapshot(store) {

		// first check serialization version
		var current_version = store.get(constants.keys.ug_serialization_version);
		if(typeof current_version !== 'undefined' && current_version !== constants.latest_serialization_version) {
			// persisted data is from a different version !
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
	var ParentModel = BaseModel;
	var SessionFootprintModel = ParentModel.extend({
		defaults: function(){
			// model properties
			ParentModel.prototype.defaults.apply(this, arguments);
			this.set({
				serialization_version     : constants.latest_serialization_version,
				ug_serialization_version  : undefined, // may be different

				ug_last_session_id        : undefined,
				ug_last_session_auth_data : undefined,
				ug_last_user_login        : undefined,
				ug_last_identity          : undefined,
				ug_last_avatar_url        : undefined,

				ug_newly_created_account_credential : undefined
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
			var when_deferred = when.defer();

			// now simulate the operations
			if(method === "read") {
				var data = retrieve_raw_data_snapshot(this.store_);
				// pretend we recognized him and give him a server id
				model.id = 1;
				// copy fetched data
				this.set(data);
				// all in sync
				this.declare_in_sync();
				when_deferred.resolve( [model, undefined, options] );
			}
			else if(method === "create") {
				// give him a server id
				model.id = 1;
				// TODO persist
				console.error("TODO footprint sync");
				this.declare_in_sync();
				when_deferred.reject( [model, options] );
			}
			else if(method === "update") {
				// TODO persist
				console.error("TODO footprint sync");
				this.declare_in_sync();
				when_deferred.reject( [model, options] );
			}
			else if(method === "delete") {
				// TODO do it
				console.error("TODO footprint sync");
				this.declare_in_sync();
				when_deferred.reject( [model, options] );
			}
			else {
				// WAT ?
				console.error("TOHANDLE footprint sync");
				when_deferred.reject( [model, options] );
			}

			console.log("Sync end - Current changes = ", model.changed_attributes());
			return when_deferred.promise;
		},

		// ultimately, it's the goal of this object to restore a session and related stuff
		get_session: function() {
			if(typeof this.session_ === 'undefined') {
				var session = new Session();

				// fill members
				session.id = this.get('ug_last_session_id'); // ok if undefined
				// yes, that's all..

				// add event listeners
				// todo

				// memorize
				this.session_ = session;
			}
			return this.session_;
		},
		get_identity: function() {
			if(typeof this.identity_ === 'undefined') {
				var identity = new Identity();

				// fill members
				var temp;
				temp = this.get('ug_last_identity');
				if(typeof temp !== 'undefined') // we want to keep the default version
					identity.set('username', temp);

				temp = this.get('ug_last_avatar_url');
				if(typeof temp !== 'undefined') // we want to keep the default version
					identity.set('avatar_url', temp);

				// add event listeners

				// memorize
				this.identity_ = identity;
			}
			return this.identity_;
		},

		switch_identity: function(identity) {
			// TODO
		},

		disconnect: function() {
			// TODO
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
