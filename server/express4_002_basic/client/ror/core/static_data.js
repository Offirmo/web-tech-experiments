/* Rise of the replicators static data.
*/
define(
[
	'lodash'
],
function(_) {
	'use strict';

	function to_hash(array) {
		var hash = {};
		_.forEach(array, function(entry) {
			hash[entry.id] = entry;
		});
		return hash;
	}

	var data = {};

	data.actions = to_hash([
		{
			id: 'pause'
		},
		{
			id: 'unpause'
		},
		{
			id: 'wipe'
		},
		{
			id: 'replicate'
			// + count
		},
		{
			id: 'salvage'
			// + count
		},
		{
			id: 'assemble'
			// replicator model_id
		},
		{
			id: 'disassemble'
			// replicator model_id
		},
	]);

	data.events = to_hash([
		{
			id: 'story_progress'
		},
		{
			id: 'user_error'
		},
		{
			id: 'meta_update'
			// version
			// tick interval
			// speed
			// tick count
		},
		{
			id: 'census_update'
		},
		{
			id: 'resources_update'
		}
	]);

	data.story_steps = to_hash([
		{
			id: 'story_begins',
			type: 'log',
			msg: 'The story begins...'
		},
		{
			id: 'story_unfolds',
			type: 'log',
			msg: 'The story unfolds...'
		},
	]);

	data.replicator_models_by_rank = [
		{
			id: 'mini-crab',
			rank: 1,
			name: 'ror.mini-crab',
			min_units: 64
		},
		{
			id: 'crab',
			rank: 2,
			name: 'ror.crab',
			min_units: 128
		},
		{
			id: 'beetle',
			rank: 3,
			min_units: 256
		},
		{
			id: 'queen',
			rank: 4,
			min_units: 512
		},
		{
			id: 'cluster',
			rank: 5,
			min_units: 128
		},
		{
			id: 'gatherer',
			rank: 6,
			min_units: 128
		},
		{
			id: 'shuttle',
			rank: 7,
			min_units: 128
		},
		{
			id: 'cruiser',
			rank: 8,
			min_units: 128
		},
		{
			id: 'planet',
			rank: 9,
			units: 128
		}
	];
	data.replicator_models = to_hash(data.replicator_models_by_rank);

	data.currencies = to_hash([
		{
			id: 'units'
		},
		{
			id: 'energy'
		},
		{
			id: 'metal'
		},
		{
			id: 'pure_energy'
		}
	]);

	return data;
});
