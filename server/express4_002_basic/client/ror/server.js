/* Rise of the replicators server
 * Following code is made to run in browser, web worker or node.js.
*/
define(
[
	'lodash',
	'javascript-state-machine'
],
function(_, StateMachine) {
	'use strict';

	function RorServer(options) {
		this.config = {
			tick_period_ms : 500
		};

		this.state = {
			tick_count: 0
		};

		this.pending_tick = false;
		this.events_to_process = [];

		var server = this; // closure

		// https://github.com/jakesgordon/javascript-state-machine
		this.fsm = StateMachine.create({
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
				],                                                         to: '_error'  }
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
					console.log('[onenterstate] "' + to + '" from state "' + from + '" following event "' + event
						+ (msg ? ('(' + msg + ')') : '') + '".');
					return true;
				},
				onafterevent : function(event, from, to, msg) {
					//logger.log('[onafterevent]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
					return true;
				},

				on_error : function() {
					console.error('Unknown internal error !');
					return true;
				},

				on_loading_last_backup : function() {
					server.fsm.backup_load_error();
					return true;
				},

				on_starting_up : function() {
					// initiate tick
					server.schedule_next_tick();
					server.fsm.started();
					return true;
				},

				on_waiting_event : function() {
					console.log('now waiting for events...');
					return StateMachine.ASYNC;
				},

				on_processing_tick : function() {
					if(!server.pending_tick) throw new Error('No tick to process !');
					server.state.tick_count++;
					console.log('processing tick #' + server.state.tick_count +'...');
					// TODO do stuff
					console.log('tick processed.');
					server.pending_tick = false;
					// schedule next tick
					server.schedule_next_tick();
					server.fsm.tick_handled();
					return true;
				}
			}
		});
		this.fsm.init_done();
	}

	RorServer.prototype.schedule_next_tick = function() {
		if(this.pending_tick) throw new Error('Tick reentrency !');
		var server = this; // closure
		setTimeout(function() {
			if(server.pending_tick) throw new Error('Tick collision !');
			server.pending_tick = true;
			console.log('tick !');
			server.process_events();
		}, server.config.tick_period_ms);
	};

	RorServer.prototype.process_events = function() {
		if(this.pending_tick)
			this.fsm.tick();
		else if (this.events_to_process.length)
			this.fsm.cmd();
	};

	return {
		make_new: function(options) { return new RorServer(options); }
	};
});
