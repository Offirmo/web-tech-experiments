/* ...
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'when',

	// restlink stuff
	'restlink/server',

	// our models
	'offirmo_app/common/account',
	'offirmo_app/common/identity',
	'offirmo_app/common/session',
	'offirmo_app/common/app'
],
function(_, when, RestlinkServer, AccountModel, IdentityModel, SessionModel, AppModel) {
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
	methods.get_latest_api_route = function() {
		return "/api/v0.1";
	}

	////////////////////////////////////
	function register_legacy_models(options) {
		// nothing for now
	}

	function register_latest_models(options) {
		var api_root = this.get_latest_api_route();

		TOIMPROVE

		// REM : we must NOT use the models directly
		// for they may be shared (if this server run in the same space as the client)
		// and we may want to customize them. Better to customize our copy.
		var ServerLatestAccountModel  = AccountModel.extend({});
		var ServerLatestIdentityModel = IdentityModel.extend({});
		var ServerLatestSessionModel  = SessionModel.extend({});
		var ServerLatestAppModel      = AppModel.extend({});

		options.sync_install_func(ServerLatestAccountModel);
		options.sync_install_func(ServerLatestIdentityModel);
		options.sync_install_func(ServerLatestSessionModel);
		options.sync_install_func(ServerLatestAppModel);

		this.serve_model_at(api_root, ServerLatestAccountModel);
		this.serve_model_at(api_root, ServerLatestIdentityModel);
		this.serve_model_at(api_root, ServerLatestSessionModel);
		this.serve_model_at(api_root, ServerLatestAppModel);
	}

	function register_models(options) {
		register_legacy_models.call(this, options);
		register_latest_models.call(this, options);
	}

	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var ParentClass = RestlinkServer.klass;
	var DefinedClass = function OffirmoAppServer(options) {
		// example : call parent constructor (after setting our defaults)
		ParentClass.prototype.constructor.apply(this, arguments);

		_.defaults( this, defaults );

		options = options || {};
		options.sync_install_func = options.sync_install_func || default_sync_install_func;

		// register models we serve
		register_models.call(this, options);
	};

	// classical inheritance from a Restlink server
	DefinedClass.prototype = Object.create(ParentClass.prototype);
	DefinedClass.prototype.constructor = DefinedClass;

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);


	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new'   : function(options) { return new DefinedClass(options); },
		// but we still expose the constructor to allow class inheritance
		'klass'      : DefinedClass,
		// exposing these allows convenient syntax and also prototypal inheritance
		'constants'  : constants,
		'exceptions' : exceptions,
		'defaults'   : defaults,
		'methods'    : methods
	};
}); // requirejs module
