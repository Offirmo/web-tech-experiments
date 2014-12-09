/* Rise of the replicators static data.
*/
define(function() {
	'use strict';

	var data = {};

	data.controls = {
		pause: {
			action: 'pause'
			// todo
		},
		play: {

		}
	};

	data.replicators = {
		cub: {
			name: 'cub',
			size: 64
		},
		crab: {
			name: 'crab',
			size: 128
		},
		beetle: {},
		queen: {}
	};

	return data;
});
