/* Transaction = restlink server request processing context
 * It stores essential data for processing one and only one request.
 * Observing handlers may store data in this transaction
 * to retrieve them later in the processing.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'underscore',
	'offirmo/utils/extended_exceptions'
],
function(_, EE) {
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

	methods.init = function() {
		// init of member objects

		// direct access allowed
		this.parent_session = undefined;
		this.request        = undefined;
		this.shared_data    = {};

		// only through accessors
		this.match_infos_ = undefined;
		this.is_valid_ = true;
	};


	////////////////////////////////////
	//exceptions. = ;


	////////////////////////////////////
	//methods. = ;

	// result of url+action decoding
	methods.get_match_infos = function() {
		if(!this.match_infos_) {
			if(!this.request) {
				throw new EE.InvalidArgument("Can't compute match infos : This transaction request is unknown !");
			}
			else if(!this.parent_session_) {
				throw new EE.InvalidArgument("Can't compute match infos : This transaction parent session is unknown !");
			}
			else {
				var server = this.parent_session_.get_server();
				if(!server || !server.rest_indexed_shared_container) {
					throw new EE.InvalidArgument("Can't compute match infos : This transaction parents are not fully initialized !");
				}
				else {
					this.match_infos_ = server.rest_indexed_shared_container.shared_detailed_at(this.request.uri, this.request.method);
				}
			}
		}
		return this.match_infos_;
	};

	/* We may want to forcefully end a transaction.
	 * When marked for termination :
	 * - no request should be accepted (should not happen since 1 trans = 1 req)
	 * - only error messages may be sent back.
	 * - handlers or adapters must release their references (if any) on this transaction
	 *   and release associated resources (if any).
	 */
	methods.invalidate = function() {
		this.is_valid_ = false;
		this.parent_session = undefined; // for avoiding ref loops
	};

	methods.is_valid = function() {
		return this.is_valid_;
	};

	// TOREVIEW
	/* Depending on the underlying protocol,
	 * push may or may not be possible.
	 * Handlers must know it to either :
	 * - mitigate if possible (aggregation)
	 * - reject requests if no mitigation possible.
	 * Note : This flag should be set by the adapter,
	 *        for use by handlers.
	 */
	//virtual void setPushAllowed(bool) = 0;

	//virtual void setShouldKeepAlive(bool) = 0;


	/* Depending on the request,
	 * transaction may or may not end when a response arrives.
	 * This flag stores this info.
	 * Note : This flag should be set by handlers,
	 *        for use by the adapter.
	 * Default : false
	 */
	//virtual void setShouldKeepAlive(bool) = 0;

	//virtual bool shouldKeepAlive() const = 0;



	////////////////////////////////////
	Object.freeze(constants);
	Object.freeze(defaults);
	Object.freeze(exceptions);
	Object.freeze(methods);

	var DefinedClass = function RestlinkServerTransaction() {
		_.defaults( this, defaults );
		// other inits...
		methods.init.apply(this, arguments);
	};

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
