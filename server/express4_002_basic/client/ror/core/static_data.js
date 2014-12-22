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

	/*
	data.interface = [
		{
			id: 'pause',
			type: 'button',
			prerequisite: null
		},
		{
			id: 'unpause',
			type: 'button',
			prerequisite: null
		},
		{
			id: 'wipe',
			type: 'button',
			prerequisite: null
		},
		{
			id: 'clear_log',
			type: 'button',
			prerequisite: null
		}
	];
	*/

	data.replicators = to_hash([
		{
			id: 'cub',
			name: 'ror.cub',
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
			id: 'gatherer',
			min_units: 128
		},
		{
			id: 'shuttle',
			min_units: 128
		},
		{
			id: 'cruiser',
			min_units: 128
		},
		{
			id: 'planet',
			units: 128
		}
	]);

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
