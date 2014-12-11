/* Rise of the replicators static data.
*/
define(function() {
	'use strict';

	var data = {};

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
		},
		{
			id: 'explore',
			type: 'button',
			prerequisite: null
		},
		{
			id: 'gather_energy',
			type: 'button',
			prerequisite: null
		},
		{
			id: 'gather_resources',
			type: 'button',
			prerequisite: null
		},
		{
			id: 'replicate',
			type: 'button',
			prerequisite: null
		},
		{
			id: 'create_swarm',
			type: 'button',
			prerequisite: null
		},
		{
			id: 'send_swarm',
			type: 'button',
			prerequisite: null
		}
	];

	data.replicators = {
		cub: {
			id: 'cub',
			name: 'ror.cub',
			pieces: 64
		},
		crab: {
			id: 'crab',
			pieces: 128
		},
		beetle: {

		},
		queen: {

		},
		cluster: {

		},
		gatherer: {

		},
		shuttle: {

		},
		cruiser: {

		},
		planet: {

		}
	};

	return data;
});
