/** Rise of the replicators ...
 */
define(
[
	'lodash',
	'./errors'
],
function(_, Errors) {
	'use strict';

	function extend(server) {

		// shortcut
		var state = server.state;

		state.mark_as_dirty = function(stuff) {
			// TODO
		};

		// TODO emit dirty

	}


	return {
		extend: extend
	};
});
