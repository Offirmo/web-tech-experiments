/* Rise of the replicators server
 * Following code is made to run in browser, web worker or node.js.
*/
define(
[
	'lodash',
	'javascript-state-machine',
	'eventemitter2',
	'logator',
	'./static_data',
	'./errors'
],
function(_, StateMachine, EventEmitter2, Logator, Data, Errors) {
	'use strict';

	var EventEmitter = EventEmitter2.EventEmitter2;

	function RorServer(options) {
		// scan options
		options = options || {};

		var logger = options.logger || Logator.make_new();

		var config = {
			version: '0.0.1',
			tick_period_ms : 5000
		};

		logger.log('Instantiating a new v' + config.version + ' RoR server...');

		var state = {
			tick_count: 0,
			pending_tick: false,
			events_to_process: [],
			next_replicator_id: 0, // for generating the unique id of each replicator
			census: {
				units: 0,
				free_units: 0,
				replicators: {
				}
			}
		};

		var clients = [];


		// add new unit(s)
		function add_new_units(count) {
			state.census.units += count;
			// todo auto-assemble ?
			state.census.free_units += count;
		}

		/**
		 * @param {Object} model - replicator model to assemble (from Data.replicators)
		 */
		function assemble_replicator(model) {
			// init just in case
			state.census.replicators[model.id] = state.census.replicators[model.id] || [];
			// shortcuts
			var units = state.census.replicators[model.id];
			// checks
			if(state.census.free_units < model.min_units) {
				var e = new Errors.NotEnoughResourcesToAssemble();
				e.model = model.id;
				e.free_units = state.census.free_units;
				e.required_units = model.min_units;
				throw e;
			}
			// build the new replicator
			var replicator = {
				id: state.next_replicator_id++,
				units: model.min_units
				// quality of pieces ?
			};
			state.census.free_units -= replicator.units;
			units.push(replicator);
		}

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
				{ name: 'cmd',               from: '_waiting_event',        to: '_processing_cmd' },
				{ name: 'action',            from: '_waiting_event',        to: '_processing_action' },

				{ name: 'tick_handled',      from: '_processing_tick',      to: '_waiting_event' },

				{ name: 'fatal_error',       from: [
					'_loading_last_backup',
					'_starting_up',
					'_waiting_event',
					'_processing_tick',
					'_processing_cmd',
					'_processing_action'
				],                                                          to: '_error'  }
			],
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
					//console.log('[onenterstate]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
					logger.log('[onenterstate] "' + to + '" from state "' + from + '" following event "' + event
						+ (msg ? ('(' + msg + ')') : '') + '".');
					return true;
				},
				onafterevent : function(event, from, to, msg) {
					//logger.log('[onafterevent]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
					return true;
				},

				on_error : function() {
					logger.error('Unknown internal error !');
					return true;
				},

				on_loading_last_backup : function() {
					add_new_units(Data.replicators.cub.min_units);
					assemble_replicator(Data.replicators.cub);
					fsm.backup_load_error();
					return true;
				},

				on_starting_up : function() {
					// initiate tick
					schedule_next_tick();
					fsm.started();
					return true;
				},

				on_waiting_event : function() {
					logger.log('now waiting for events...');
					return StateMachine.ASYNC;
				},

				on_processing_tick : function() {
					if(!state.pending_tick) throw new Error('No tick to process !');
					state.tick_count++;
					logger.log('processing tick #' + state.tick_count +'...');
					// TODO do stuff
					logger.log('tick processed.', state);
					state.pending_tick = false;
					// schedule next tick
					schedule_next_tick();
					fsm.tick_handled();
					return true;
				}
			}
		});
		fsm.init_done();

		function schedule_next_tick() {
			if(state.pending_tick) throw new Error('Tick reentrency !');
			setTimeout(function() {
				if(state.pending_tick) throw new Error('Tick collision !');
				state.pending_tick = true;
				logger.log('tick !');
				process_events();
			}, config.tick_period_ms);
		}

		function process_events() {
			if(state.pending_tick)
				fsm.tick();
			else if (state.events_to_process.length)
				fsm.cmd();
		}

		// this func MUST be synchronous
		function synchronize_client(client) {
			// TODO
		}


		// external API
		this.add_client = function(client) {
			client.state = {}; // init our knowledge of the client state
			clients.push(client);
			synchronize_client(client);
		};
	}

	return {
		make_new: function(options) { return new RorServer(options); }
	};
});
