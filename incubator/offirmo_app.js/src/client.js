/* A client for executing REST operations on Backbone models
 * on a 'generic' server (distant or local)
 * with an integrated cache
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'when',
	'restlink/client/client',
	'offirmo_app/common/account',
	'offirmo_app/client/session_state_machine',
	'offirmo_app/client/session_footprint'
],
function(_, when, RestlinkClient, Account, SessionStateMachine, SessionFootPrint) {
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
	//methods. = ;

	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function OffirmoAppClient(restlink_client, optional_store) {
		_.defaults( this, defaults );

		// internal members
		this.restlink_ = restlink_client;
		this.store_    = optional_store; // ok if null
		this.session_footprint_ = SessionFootPrint.get_instance(this.store_);

		// public members
		// current session (may be a new session)
		this.session   = this.session_footprint_.get_session();
		// current account = new account (until we connect with the server)
		this.account   = new Account();
		// current identity (may be a new identity)
		this.identity  = this.session_footprint_.get_identity();

		// shortcuts for convenience. Must be maintained over the life of the session.
		this.logged_in  = false; // so far
		this.username   = this.identity.get('username');
		this.avatar_url = this.identity.get('avatar_url');

		// now set up events...

		// when everything is inited, we can start the state machine
		var state_machine = SessionStateMachine.make_new(this);
		state_machine._init();
	};

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);


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
