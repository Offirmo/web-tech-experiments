/** Rise of the replicators options
 *  = dynamically injected or changeable in-game
 */
define(
[
	'lodash',
	'logator',
	'./errors'
],
function(_, Logator, Errors) {
	'use strict';

	function check_and_complete(options) {
		// scan options and complete options
		options = options || {};
		options.logger = options.logger || Logator.make_new();

		return options;
	}

	return {
		check_and_complete: check_and_complete
	};
});
