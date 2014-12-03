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

	var config = {
		tick_period_ms : 500
	};

	var state = {
		tick_count: 0
	};

	var pending_tick = false;
	var events_to_process = [];

	function schedule_next_tick() {
		if(pending_tick) throw new Error('Tick reentrency !');
		setTimeout(function() {
			if(pending_tick) throw new Error('Tick collision !');
			pending_tick = true;
			console.log('tick !');
			process_events();
		}, config.tick_period_ms);
	}

	console.log('Hello from worker !', self.location);

	function postMessage(o) {
		// for convenience, raw strings are turned into a log
		if(_.isString(o)) {
			o = {
				verb: 'POST',
				url: '/console/log',
				data: [ o ]
			};
		}
		if(! _.isObject(o) || !(o.verb && o.url)) {
			throw new Error('Incorrect argument for postMessage !');
		}
		if (in_web_worker) {
			var c = WebworkerHelper.clone_for_msg_passing(o);
			//console.log('from worker, sending to parent :', o, 'cloned as', c);
			self.postMessage(c);
		}
		else {
			if (WebworkerHelper.process_log_message(o)) return;
			console.error("Unknown msg sent from worker : ", o);
		}
	}
	postMessage('I loaded successfully and I’m ready.');

	var logger = {
		log: function log() {
			postMessage({
				verb: 'POST',
				url: '/console/log',
				data: _.values(arguments)
			});
		}
	};

	if (in_web_worker)
		logger.log('Worker started', debug_infos);

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
				console.log('[onenterstate]  "' + event + '(' + msg + ')" from state "' + from + '" to state "' + to + '"');
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
				console.log('now waiting for events...');
				return StateMachine.ASYNC;
			},

			on_processing_tick : function() {
				if(!pending_tick) throw new Error('No tick to process !');
				state.tick_count++;
				console.log('processing tick #' + state.tick_count +'...');
				// TODO do stuff
				console.log('tick processed.');
				pending_tick = false;
				// schedule next tick
				schedule_next_tick();
				fsm.tick_handled();
				return true;
			}
		}
	});
	//fsm.init_done();

	function process_events() {
		if(pending_tick)
			fsm.tick();
		else if (events_to_process.length)
			fsm.cmd();
	}

	self.onmessage = function(e) {
		console.log('worker : seen message from parent : ', e); //, JSON.stringify(e));
		//self.postMessage('Response from worker ! (to : ' + e.data + ')');
		events_to_process.push(e);
	};

});
