/** Rise of the replicators internal state
*/
define(
[
	'lodash',
	'logator',
	'./errors',
],
function(_, Logator, Errors) {
	'use strict';

	function RorState(options) {
		//options.logger.log('Instantiating a new RoR state...');

		this.meta = {
			tick_count: 0,
			speed: 1, // 0 = stopped, x -> period = period * x
		};

		this.i = {
			next_replicator_id: 0, // for generating the unique id of each replicator
		};

		this.currencies = {};

		this.units = {};

		this.story = []; // empty so far
	}

	return {
		make_new: function(options) { return new RorState(options); }
	};
});
