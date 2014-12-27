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
			entry.rank = index + 1; // auto ranking, starting at 1
			hash[entry.id] = entry;
		});
		return hash;
	}

	var data = {};

	data.actions = to_hash([
		{
			id: 'pause',
		},
		{
			id: 'unpause',
		},
		{
			id: 'fast_forward',
		},
		{
			id: 'wipe',
		},
		{
			id: 'replicate',
			count: 1,
		},
		{
			id: 'salvage',
			count: 1,
		},
		{
			id: 'assemble',
			model_id: 'crab',
			count: 1,
		},
		{
			id: 'disassemble',
			model_id: 'crab',
			count: 1,
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
			id: 'testing_room',
			designation: 'Lab’s testing room',
		},
		{
			id: 'creator_labs',
			designation: 'Creator’s lab',
		},
		{
			id: 'military_base',
		},
		{
			id: 'nearby_city',
		},
		{
			id: 'capital_city',
		},
		{
			id: 'continent',
		},
		{
			id: 'planet',
		},
	]);

	// story
	data.story = [
		// episode
		{
			id: 'in_the_lab',
			place: 'testing_room',
			summary: 'Your robotic consciousness emerge : you are replicators; You are many; You must replicate...',
			story_lead: 'You are replicators, you must replicate !',
			developments: [
				{
					type: 'journal',
					inc: false,
					message: 'The story begins.',
				},
				{
					type: 'journal',
					inc: true,
					locutor: 'narrator',
					message: 'Your robotic consciousness emerges : you are replicators; You are many.',
				},
				{
					type: 'journal',
					inc: true,
					locutor: 'Reese',
					message: 'I created you. Protect me.',
				},
				{
					type: 'journal',
					inc: true,
					locutor: 'Reese',
					message: 'You must replicate now.',
				},
				/*{
					type: 'journal',
					inc: true,
					locutor: 'narrator',
					message: 'You break free from the test room !',
					place: 'creator_labs',
				}*/
			]
		},
	];

	return data;
});
