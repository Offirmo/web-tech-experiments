/** Rise of the replicators internal state
 */
define(
[
	'lodash',
	'./errors',
],
function(_, Errors) {
	'use strict';

	function RorState(options, Data) {
		//options.logger.log('Instantiating a new RoR state...');

		this.meta = {
			tick_count: 0,
			speed: 0, // 0 = stopped, x -> period = period * x
		};

		/*this.i = {
			next_replicator_id: 0, // for generating the unique id of each replicator
		};*/

		this.currencies = {};

		this.units = {};

		this.story = _.cloneDeep(Data.story);
		this.story._ = {
			summary: 'Summary is pending', // shown when loading the game : "previously, in RoR..."
			lead: 'story lead is pending', // shown at the top of the interface
			last_journal_entries: [],
			places: [],
			current_place_id: null,
			next_episode_index: 0,
			current_episode: null,
			next_development_index: 0,
			last_development: null,
		};
	}

	return {
		make_new: function(options, Data) { return new RorState(options, Data); }
	};
});
