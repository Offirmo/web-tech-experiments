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
		_.forEach(array, function(entry, index) {
			entry.rank = index; // auto ranking
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
			name: 'ror.mini-crab',
			min_units: 64
		},
		{
			id: 'crab',
			name: 'ror.crab',
			min_units: 128
		},
		{
			id: 'beetle',
			min_units: 256
		},
		{
			id: 'queen',
			min_units: 512
		},
		{
			id: 'cluster',
			min_units: 128
		},
		{
			id: 'shuttle',
			min_units: 65536
		},
		{
			id: 'cruiser',
			min_units: 1048576
		},
		{
			id: 'planet',
			units: 1099511627776
		}
	];
	data.replicator_models = to_hash(data.replicator_models_by_rank);

	// manipulated by player
	data.currencies = to_hash([
		{
			id: 'energy'
		},
		{
			id: 'materials'
		},
		{
			id: 'experience'
		}
	]);

	// found in places
	data.resources = to_hash([
		{
			id: 'hiding_places'
		},
		{
			id: 'structures'
		},
		{
			id: 'generators'
		},
		{
			id: 'data_banks'
		},
		{
			id: 'lore'
		},
	]);

	// places to reside and explore
	data.places = to_hash([
		{
			id: 'creator_incubator'
		},
		{
			id: 'creator_labs'
		},
		{
			id: 'military_base'
		},
		{
			id: 'nearby_city'
		},
		{
			id: 'capital_city'
		},
		{
			id: 'continent'
		},
		{
			id: 'planet'
		}
	]);

	return data;
});
