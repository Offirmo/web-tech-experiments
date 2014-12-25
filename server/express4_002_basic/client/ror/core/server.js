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

	function RorServer(options) {
		// scan options
		options = options || {};

		var logger = options.logger || Logator.make_new();

		var config = {
			version: '0.0.2',
			tick_interval_ms: 5000,
			story_queue_size: 10
		};

		logger.log('Instantiating a new v' + config.version + ' RoR server...');

		var state = {
			tick_count: 0,
			speed: 1, // 0 = stopped, x -> period = period * x
			pending_tick: false,
			events_to_process: [],
			pending_actions: [],
			next_replicator_id: 0, // for generating the unique id of each replicator
			census: {
				units: 0,
				free_units: 0,
				replicators: {
				}
			},
			story: [] // empty so far
		};

		var ee = this.ee = new EventEmitter2({
			wildcard: true,
			delimiter: ':'
		});
		// forwarder
		this.on = function() {
			ee.on.apply(ee, arguments);
		}



		////////////////////////////////////

		/// data for external API
		this.get_meta = function get_meta() {
			return {
				version: config.version,
				tick_interval_ms: config.tick_interval_ms,
				speed: state.speed,
				tick_count: state.tick_count
			};
		};
		function emit_meta() {
			ee.emit('meta_update', get_meta());
		}

		this.get_story = function get_story() {
			return state.story;
		};
		function emit_story_progress(story_step) {
			ee.emit('story_progress', story_step);
		}

		var get_census = this.get_census = function get_census() {
			// census must be sorted
			var census = [];
			_.forEach(Data.replicator_models_by_rank, function(model) {
				var census_infos = state.census.replicators[model.id];
				if(! census_infos) return; // not known / none
				var model_infos = _.clone(model);
				model_infos.count = census_infos.length;
				census.push(model_infos);
			});
			census.units = state.census.units;
			census.free_units = state.census.free_units;
			return census;
		};
		function emit_census() {
			ee.emit('census_update', get_census());
		}


		////////////////////////////////////

		function init_blank_state() {
			add_new_units(Data.replicator_models['mini-crab'].min_units);
			assemble_replicator(Data.replicator_models['mini-crab']);
			progress_story(Data.story_steps.story_begins);
			progress_story(Data.story_steps.story_unfolds);
		}


		// send a story log line / story cutscene
		function progress_story(story_step) {
			state.story.push(story_step); // REM : add at the end
			if(state.story > config.story_queue_size)
				state.story.shift(); // REM : remove first
			emit_story_progress(story_step);
		}

		// add new replicator unit(s)
		function add_new_units(count) {
			state.census.units += count;
			// todo auto-assemble ?
			state.census.free_units += count;
			emit_census();
		}

		/**
		 * @param {Object} model - replicator model to assemble (from Data.replicator_models)
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
			emit_census();
		}

		function process_action(action) {
			var params = action;
			action = Data.actions[action.id];
			if(! action) throw new Errors.UnknownAction(action.id);
			// TODO generic prerequisites check
			if(action.id === 'replicate') {
				add_new_units(params.count);
			}
			else if(action.id === 'assemble') {
				assemble_replicator(params.model);
			}
			else {
				throw new Errors.EE.NotImplemented('action ' + action.id);
			}
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
				//{ name: 'cmd',               from: '_waiting_event',        to: '_processing_cmd' },
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
					init_blank_state();
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
					if(state.pending_actions.length) {
						fsm.action();
						return true;
					}
					else if(state.pending_tick) {
						fsm.tick();
						return true;
					}
					logger.log('will sleep waiting for events...');
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
				},

				on_processing_actions : function() {
					if(!state.pending_actions.length) throw new Error('No actions to process !');
					logger.log('processing actions...');
					// no foreach since actions may be appended anytime
					do {
						var action = state.pending_actions.shift();
						process_action(action);
					} while(state.pending_actions.length);
					logger.log('actions processed.');
					fsm.actions_handled();
					return true;
				}
			},
			error: function(name, from, to, args, error, msg, e) {
				console.error(arguments);
				throw e || msg;
			}
		});
		fsm.init_done();

		function schedule_next_tick() {
			if(state.pending_tick) throw new Error('Tick reentrency !');
			setTimeout(function() {
				if(state.pending_tick) throw new Error('Tick collision !');
				state.pending_tick = true;
				logger.log('tick !');
				if(fsm.is('_waiting_event'))
					fsm.tick(); // wake up the fsm immediately
				else {
					// fsm is already busy, no need to wake it up.
					// Tick will automatically be handled when fsm will arrive back in _waiting_event
				}
			}, config.tick_interval_ms);
		}

		//
		this.post_action = function(action_id, params) {
			// TODO add callback mechanism
			var action = params;
			action.id = action_id;
			state.pending_actions.push(action);
			console.log('server : an action was posted : ', action);

			if(fsm.is('_waiting_event'))
				fsm.action(); // wake up the fsm immediately
			else {
				// fsm is already busy, no need to wake it up.
				// Actions will automatically be handled when fsm will arrive back in _waiting_event
			}
		};
	}

	return {
		make_new: function(options) { return new RorServer(options); }
	};
});
