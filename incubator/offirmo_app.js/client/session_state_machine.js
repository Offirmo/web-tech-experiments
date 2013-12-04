/* Offirmo App session state machine !
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'backbone',
	'javascript-state-machine',
	'extended-exceptions',
	'offirmo_app/common/account'
],
function(Backbone, StateMachine, EE, Account) {
	"use strict";

	function create_state_machine(app_client) {

		var state_machine = StateMachine.create({
			events:
					[
						{ name: '_init',                        from: 'none',                        to: '_fetching_footprint'         },

						// main state machine

						// init
						{ name: '_session_restoration_failed',  from: [ '_fetching_footprint',
						                                                '_restoring_session'
						                                              ],                             to: '_logged_out'                 },
						{ name: '_footprint_fetched_ok',        from: '_fetching_footprint',         to: '_restoring_existing_session' },

						// restoring session
						{ name: '_session_restored',            from: '_restoring_existing_session', to: '_fetching_account'           },
						{ name: '_account_fetched',             from: '_fetching_account',           to: '_fetching_identities'        },
						{ name: '_identities_fetched',          from: '_fetching_identities',        to: '_matching_identities'        },
						{ name: '_identity_selected',           from: '_matching_identities',        to: '_logged_in'                  },

						// disconnection
						{ name: '_logout_requested',            from: [ '_logged_in' ],              to: '_logged_out'                 },

						// creating session
						{ name: '_login_requested',             from: '_logged_out',                 to: '_creating_new_session'       },
						{ name: '_login_failed',                from: '_creating_new_session',       to: '_logged_out'                 },
						{ name: '_new_session_created',         from: '_creating_new_session',       to: '_fetching_account'           },

						// creating account
						{ name: '_account_creation_requested',  from: '_logged_out',                 to: '_creating_new_account'       },
						{ name: '_account_created',             from: '_creating_new_account',       to: '_creating_new_identity'      },
						{ name: '_identity_created',            from: '_creating_new_identity',      to: '_creating_new_session'       }
					],
			callbacks:
			{
				///////
				onbeforeevent:  function onbeforeevent(event, from, to, msg) {
					console.log("[session_state_machine] event incoming : '", event, "' which will cause state change from '", from, "' to '", to, "'");
				},
				onleavestate:  function onleavestate(event, from, to, msg) {
					console.log("[session_state_machine] leaving state '", from, "' for '", to, "'");
				},
				onenterstate:  function onenterstate(event, from, to, msg) {
					console.log("[session_state_machine] entering state '", to, "' from '", from, "'");
					this.trigger("onenter" + to, from);
				},
				onafterevent:  function onafterevent(event, from, to, msg) {
					console.log("[session_state_machine] event done : '", event, "' which has caused state change from '", from, "' to '", to, "'");
				},
			///////
				/////// STATES ///////
				///////
				onenter_creating_new_account: function (event, from, to, msg) {
					// let's go
					this.client.reset_account(); // just in case
					var promise = this.client.account.save(); // will trigger a create
					promise.when(function() {
						throw new EE.NotImplementedError();
					});
					promise.otherwise(function() {
						// WAT ? maybe server is not responding ? (if any)
						throw new EE.NotImplementedError();
					});
				},
				onenter_restoring_existing_session:  function (event, from, to, msg) {
					// fetch it !
					var promise = app_client.session.fetch();
					// todo make this callback cancellable ?
					promise.when(function() {
						state_machine.attempt_event('_session_restored');
					});
					promise.otherwise(function() {
						// WAT ? maybe server is not responding ? (if any)
						state_machine.attempt_event('_session_restoration_failed'); // todo should retry ? or auto ?
					});
				},
				///////
				onenter_logged_in:  function onenter_logged_in(event, from, to, msg) {
					// todo memorize some stuff
				},
				onenter_fetching_footprint: function (event, from, to, msg) {
					// does the footprint contain enough data to attempt a session restoration ?
					var last_session_id        = app_client.session_footprint_.get('ug_last_session_id');
					var last_session_auth_data = app_client.session_footprint_.get('ug_last_session_auth_data');
					if(    typeof last_session_id === 'undefined'
						|| typeof last_session_auth_data === 'undefined') {
						// not enough data...
						this.attempt_event('_session_restoration_failed');
					}
					else {
						// yes, it may be feasible !
						this.attempt_event('_footprint_fetched_ok');
					}
				},
				///////
				/////// EVENTS
				///////
				/*onafter_connection_success:  function onafter_connection_success(event, from, to, msg) {
					$("#connected-navbar .brand").text(current_server);
				},*/
				///////
			}
		});

		// a utility func
		state_machine.attempt_event = function(event_name, msg) {
			if(this.cannot(event_name))
			{
				// bad !
				// TODO handle this better !
				console.error("current state : " + this.current);
				console.error("   event sent : " + event_name);
				alert("Can't in this state !");
			}
			else
			{
				this[event_name](msg);
			}
		};

		// backbone event dispatcher mixin
		_.extend(state_machine, Backbone.Events);

		// keep a link to the offirmo app object
		state_machine.client = app_client;

		return state_machine;
	}


	////////////////////////////////////
	return {
		'make_new'   : function(app_client) { return create_state_machine(app_client); }
		// utilities
	};
}); // requirejs module
