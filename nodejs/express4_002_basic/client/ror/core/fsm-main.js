/** Rise of the replicators finite state machine
 * Handled states :
 * -
*/
define(
[
	'lodash',
	'./errors'
],
function(_, Errors) {
	'use strict';

	// attach state callbacks to given fsm
	function extend(server) {

		// shortcuts
		var fsm = server.fsm;
		var logger = server.logger;
		var state = server.state;
		var StateMachine = fsm._.StateMachine;

		fsm._.schedule_next_tick = function Fsm_schedule_next_tick() {
			if(fsm._.pending_tick) throw new Error('Tick reentrency !');
			setTimeout(function() {
				if(fsm._.pending_tick) throw new Error('Tick collision !');

				fsm._.pending_tick = true;
				logger.log('tick !');
				if(fsm.is('_waiting_event'))
					fsm.tick(); // wake up the fsm immediately
				else {
					// fsm is already busy, no need to wake it up.
					// Tick will automatically be handled when fsm comes back in _waiting_event
				}
			}, server.config.tick_interval_ms / server.state.meta.speed);
		};


		fsm.onafterstarted = function() {
			// initiate tick
			fsm._.schedule_next_tick();
		};

		fsm.add_state_callback('_waiting_event', function() {
			if(fsm._.pending_actions.length) {
				setTimeout(function() {
					fsm.action();
				}, 1);
				return StateMachine.ASYNC;
			}
			else if(fsm._.pending_tick) {
				setTimeout(function() {
					fsm.tick();
				}, 1);
				return StateMachine.ASYNC;
			}

			// nothing more to process.
			// push changes to clients :
			server.emit_changes();

			// then sleep waiting for events
			logger.log('will sleep waiting for events...');
			return StateMachine.ASYNC;
		});

		fsm.add_state_callback('_processing_tick', function() {
			if(!fsm._.pending_tick) throw new Error('No tick to process !');

			state.meta.tick_count++;
			server.mark_API_data_as_dirty('/metas', 'tick_count');
			logger.log('processing tick #' + state.meta.tick_count +'...');

			// TODO do stuff

			logger.log('tick processed.', state);
			fsm._.pending_tick = false;

			// schedule next tick
			if(state.meta.speed !== 0)
				fsm._.schedule_next_tick();

			fsm.tick_handled();
			return true;
		});

		fsm.add_state_callback('_processing_actions', function() {
			if(!fsm._.pending_actions.length) throw new Error('No actions to process !');
			logger.log('processing actions...');

			// no foreach since actions may be appended anytime
			do {
				var action = fsm._.pending_actions.shift();

				if(! server.actions[action.id]) {
					var e = new Error.InternalError('Unknown action "' + action.id + '" !');
					return action.deferred.reject(e);
				};
				server.actions[action.id](action);

			} while(fsm._.pending_actions.length);

			logger.log('actions processed.');
			fsm.actions_handled();
			return true;
		});

	}


	return {
		extend: extend
	};
});
