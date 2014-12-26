/** Rise of the replicators finite state machine
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
		var fsm = server.fsm;

		fsm.add_state_callback('_loading_last_backup', function() {
			server.state.init_blank();
			fsm.backup_load_error();
			return true;
		});


		fsm.add_state_callback('_starting_up', function() {
			// initiate tick
			fsm._.schedule_next_tick();
			fsm.started();
			return true;
		});
	}


	return {
		extend: extend
	};
});
