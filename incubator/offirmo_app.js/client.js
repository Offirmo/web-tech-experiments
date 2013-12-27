/* A client for executing REST operations on Backbone models
 * on a 'generic' server (distant or local)
 * with an integrated cache
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'when',
	'base-objects/mixins/startable',
	'restlink/client/client',
	'restlink/utils/backbone_sync_mixin',
	'offirmo_app/common/account',
	'offirmo_app/client/session_state_machine',
	'offirmo_app/client/session_footprint'
],
function(_, when, StartableMixin, RestlinkClient, BBRestlinkSyncMixin, Account, SessionStateMachine, SessionFootPrint) {
	"use strict";


	////////////////////////////////////
	var constants  = {};
	var defaults   = {};
	var exceptions = {};
	var methods    = {};


	////////////////////////////////////
	//constants. = ;

	////////////////////////////////////
	//defaults. = ;

	////////////////////////////////////
	//exceptions. = ;

	////////////////////////////////////
	methods.startup = function() {
		// call parent
		StartableMixin.methods.startup.apply(this, arguments);

		// then add our stuff :
		// launch state machine
		this.login_state_machine._init(); // this launch processing !
	};
	methods.reset_account = function() {

		// reset account
		this.account   = new Account();

		// configure backend
		this.account.restlink_ = this.restlink_;
		this.account.sync_to_restlink = BBRestlinkSyncMixin.methods.sync;;

		// add event listeners
		this.account.on("sync", function() {
			console.error("TODO sync footprint !");
			/*
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

			this.session_footprint_.set("ug_last_user_login", this.account.);
			*/
		});
	};

	methods.initiate_account_creation = function() {

		// fire the necessary event.
		// of course the state machine needs to be in a correct state !
		this.login_state_machine._account_creation_requested();
		// this will complain if bad state
	};


	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function OffirmoAppClient(restlink_client, optional_store) {
		_.defaults( this, defaults );

		// backbone event dispatcher mixin
		_.extend(this, Backbone.Events);

		// startable traits init
		this.initialize_startable.apply(this, arguments);

		// internal members
		this.restlink_ = restlink_client;
		this.store_    = optional_store; // ok if null
		this.session_footprint_ = SessionFootPrint.get_instance(this.store_);

		// public members
		// current session (may be a new session)
		this.session   = this.session_footprint_.get_session();
		// current account = new account (until we connect with the server)
		this.reset_account();
		// current identity (may be a new identity)
		this.identity  = this.session_footprint_.get_identity();

		// attach transactional objects to their persistence
		this.session.restlink_client_ = restlink_client;
		this.session.sync = BBRestlinkSyncMixin.methods.sync;
		this.account.restlink_client_ = restlink_client;
		this.account.sync = BBRestlinkSyncMixin.methods.sync;
		this.identity.restlink_client_ = restlink_client;
		this.identity.sync = BBRestlinkSyncMixin.methods.sync;

		// shortcuts for convenience. Must be maintained over the life of the session.
		this.logged_in  = false; // so far
		this.username   = this.identity.get('username');
		this.avatar_url = this.identity.get('avatar_url');

		// now set up events...
		/*this.listenTo(this.session, "change:[attribute]", function(model, value, options) {

		});*/

		// when everything is inited, we can start the state machine
		this.login_state_machine = SessionStateMachine.make_new(this);
	};

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);

	// prototypal inheritance of startable traits
	StartableMixin.mixin(DefinedClass.prototype);

	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new'   : function(restlink_client, optional_store) { return new DefinedClass(restlink_client, optional_store); },
		// but we still expose the constructor to allow class inheritance
		'klass'      : DefinedClass,
		// exposing these allows convenient syntax and also prototypal inheritance
		'constants'  : constants,
		'exceptions' : exceptions,
		'defaults'   : defaults,
		'methods'    : methods
	};
}); // requirejs module
