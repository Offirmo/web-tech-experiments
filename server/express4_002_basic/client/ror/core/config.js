/** Rise of the replicators static config
 * static config = Not changeable in-game, changes need restart.
 */
define(
[
	'lodash',
	'./errors'
],
function(_, Errors) {
	'use strict';

	return {
		version: '0.0.2',
		tick_interval_ms: 1000,
		story_queue_size: 10
	};
});
