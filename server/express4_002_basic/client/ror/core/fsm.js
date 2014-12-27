/** Rise of the replicators internal finite state machine
 * Base : states + generic callbacks
*/
define(
[
	'lodash',
	'javascript-state-machine',
	'./errors',
	'./fsm-init',
	'./fsm-main'
],
function(_, StateMachine, Errors, FsmInit, FsmMain) {
	'use strict';

	function extend(server) {
		var options = server.options;
		var logger = options.logger;

		//logger.log('Instantiating a new RoR FSM...');

		// https://github.com/jakesgordon/javascript-state-machine
		var fsm = StateMachine.create({
			initial: '_waiting_init',
			events: [
				{ name: 'init_done',         from: '_waiting_init',         to: '_loading_last_backup' },

				{ name: 'no_backup_found',   from: '_loading_last_backup',  to: '_starting_up' },
				{ name: 'backup_load_error', from: '_loading_last_backup',  to: '_starting_up' },
				{ name: 'backup_loaded',     from: '_loading_last_backup',  to: '_starting_up' },

				{ name: 'started',           from: '_starting_up',          to: '_waiting_event' },

				{ name: 'tick',              from: '_waiting_event',        to: '_processing_tick' },
				{ name: 'action',            from: '_waiting_event',        to: '_processing_actions' },

				{ name: 'tick_handled',      from: '_processing_tick',      to: '_waiting_event' },
				{ name: 'actions_handled',   from: '_processing_actions',   to: '_waiting_event' },

				{ name: 'fatal_error',       from: [
					'_loading_last_backup',
					'_starting_up',
					'_waiting_event',
					'_processing_tick',
					'_processing_cmd',
					'_processing_action'
				],                                                          to: '_error'  }
			],


			////////////////////////////////////
			/// generic callbacks
			callbacks: {
				onbeforeevent : function(event, from, to, msg) {
					//logger.log('[onbeforeevent] "' + event + '(' + msg + ')" : "' + from + '" -> "' + to + '"');
					return true;
				},
				onleavestate : function(event, from, to, msg) {
					//logger.log('[onleavestate]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
					return true;
				},
				onenterstate : function(event, from, to, msg) {
					//logger.log('[onenterstate] "' + to + '" from state "' + from + '" following event "' + event + (msg ? ('(' + msg + ')') : '') + '".');
					return true;
				},
				onafterevent : function(event, from, to, msg) {
					//logger.log('[onafterevent]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
					return true;
				},

				// error state (TODO use it)
				on_error : function() {
					logger.error('Unknown FSM internal error ! Now stuck in error state !');
					return true;
				}
			},

			////////////////////////////////////
			/// another generic callback
			error: function(name, from, to, args, error, msg, e) {
				console.error('RoR FSM error !', arguments);
				throw e || msg; // rethrow
			}
		});
		server.fsm = fsm;

		fsm._ = { // internal stuff
			StateMachine: StateMachine, // for convenience
			pending_tick: false,
			pending_actions: [],

			enqueue_action: function Fsm_enqueue_action(action) {
				fsm._.pending_actions.push(action);
				console.log('server : an action was posted : ', action);

				if(fsm.is('_waiting_event'))
					fsm.action(); // wake up the fsm immediately
				else {
					// fsm is already busy, no need to wake it up.
					// Actions will automatically be handled as soon as fsm arrives in _waiting_event
				}
			},

			kick: function() {
				// kick fsm
				fsm.init_done();
			}
		};

		// special function to add callbacks
		fsm.add_state_callback = function add_RoR_FSM_state_callback(state_id, callback) {
			fsm['on' + state_id] = function() {
				var retval = true; // fsm continue (so far)
				// better catch it ourselves : more details than in FSM err handler
				try {
					retval = callback();
				}
				catch(e) {
					logger.error('Unexpected failure in FSM state handler for "' + state_id + '" !', e);
					fsm.fatal_error();
				}
				return retval;
			};
		};

		// add subparts
		FsmInit.extend(server);
		FsmMain.extend(server);

		server.start = function() {
			fsm.init_done();
		};
	}

	return {
		extend: extend
	};
});
