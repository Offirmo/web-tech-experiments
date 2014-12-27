/** Rise of the replicators ...
*/
define(
[
	'lodash',
	'../errors'
],
function(_, Errors) {
	'use strict';

	function extend(server) {
		var options = server.options;
		var logger = options.logger;
		var state = server.state;

		var actions = server.actions = {};

		actions.pause = function() {
			state.meta.speed = 0;
		};
		actions.unpause = function() {
			state.meta.speed = 1;
		};
		actions.fast_forward = function() {
			state.meta.speed += 1;
		};


	}

	return {
		extend: extend
	};
});
