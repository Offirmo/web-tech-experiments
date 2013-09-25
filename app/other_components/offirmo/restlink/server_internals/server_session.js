/* A restlink server session
 * A session is a set of data shared across several requests
 * Can contains login status, etc.
 * Can expire after a set of time, etc.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'underscore',
	'offirmo/utils/fast_timestamp',
	'offirmo/restlink/server_internals/server_transaction'
],
function(_, FastTimestamp, Transaction) {
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
	defaults.timeout_in_millis_ = 60000; // 1 min

	methods.init = function() {
		// init of member objects
		this.server_                = undefined;
		this.last_access_timestamp_ = this.creation_timestamp_ = FastTimestamp.get_timestamp();
		this.is_valid_              = true; // by default
		this.transactions_          = [];
	};


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods. = ;
	methods.set_server = function(server) {
		this.server_ = server;
	};
	methods.get_server = function() {
		return this.server_;
	};

	/**
	 * Sets the time in milliseconds that the session may remain idle before
	 * expiring.
	 */
	methods.set_timeout_in_millis = function(timeout) {
		this.timeout_in_millis_ = timeout;
		throw "not implemented";
	};

	/**
	 * Returns the time in milliseconds that the session session may remain
	 * idle before expiring.
	 */
	methods.get_timeout_in_millis = function() {
		return this.timeout_in_millis_;
	};

	/**
	 * Returns the time the session was created
	 * i.e. the time the system created the instance.
	 */
	methods.get_creation_timestamp = function() {
		return this.creation_timestamp_;
	};
	/**
	 * Returns the last time the application received a request or method invocation from the user associated
	 * with this session.  Application calls to this method do not affect access time.
	 */
	methods.get_last_access_timestamp = function() {
		return this.last_access_timestamp_;
	};

	/**
	 * Explicitly updates the {@link #getLastAccessTime lastAccessTime} of this session to the current
	 * time when this method is invoked.
	 */
	methods.touch = function() {
		this.last_access_timestamp_ = FastTimestamp.get_timestamp();
	};

	/**
	 * Explicitly invalidates this session and releases all associated
	 * resources. TOREVIEW
	 */
	methods.invalidate = function() {
		this.is_valid_ = false;
		// also invalidate all associated transactions
		_.each(this.transactions_, function(trans) {
			trans.invalidate();
		});
		this.transactions_ = []; // no need to keep invalidated transactions
	};

	/** check current validity
	 *
	 */
	methods.is_valid = function() {
		return this.is_valid_;
	};

	/**
	 *
	 */
	methods.create_transaction = function(restlink_request) {
		var new_transaction = undefined;

		if(this.is_valid())
		{
			new_transaction = Transaction.make_new();
			new_transaction.parent_session = this;
			if( typeof restlink_request !== "undefined")
				new_transaction.set_request(restlink_request);

			// keep ref for further inspection, invalidation or timeout
			this.transactions_.push(new_transaction);
		}

		return new_transaction;
	};

	/* Immediately terminate a transaction.
	 */
	methods.terminate_transaction = function(trans) {
		trans.invalidate();
		// keep only the valid one
		this.transactions_ = _.filter(this.transactions_, function(trans){ return trans.is_valid(); });
	};



	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function RestlinkServerSession() {
		_.defaults( this, defaults );
		// other inits...
		methods.init.apply(this, arguments);
	}

	DefinedClass.prototype.constants  = constants;
	DefinedClass.prototype.exceptions = exceptions;
	_.extend(DefinedClass.prototype, methods);


	////////////////////////////////////
	return {
		// objects are created via a factory, more future-proof
		'make_new'   : function() { return new DefinedClass(); },
		// but we still expose the constructor to allow class inheritance
		'klass'      : DefinedClass,
		// exposing these allows convenient syntax and also prototypal inheritance
		'constants'  : constants,
		'exceptions' : exceptions,
		'defaults'   : defaults,
		'methods'    : methods
	};
}); // requirejs module
