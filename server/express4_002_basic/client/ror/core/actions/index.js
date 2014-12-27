/** Rise of the replicators ...
*/
define(
[
	'lodash',
	'../errors'
],
function(_, Errors) {
	'use strict';

	function extend(server) {
		var options = server.options;
		var logger = options.logger;
		var state = server.state;

		var actions = server.actions = {};

		actions.pause = function() {
			if(state.meta.speed === 0) throw new Errors.IllegalStateForAction('Already paused !');
			state.meta.speed = 0;
		};
		actions.unpause = function() {
			if(state.meta.speed !== 0) throw new Errors.IllegalStateForAction('Not paused !');
			state.meta.speed = 1;
			// kick the fsm again
			server.fsm._.schedule_next_tick();
		};
		actions.fast_forward = function() {
			if(state.meta.speed === 0) throw new Errors.IllegalStateForAction('Must unpause before accelerating !');
			state.meta.speed += 1;
		};
	}

	return {
		extend: extend
	};
});
