/** Rise of the replicators options
 *  = dynamically injected or changeable in-game
 */
define(
[
	'lodash',
	'eventemitter2',
	'./errors'
],
function(_, EventEmitter2, Errors) {
	'use strict';

	function extend(server) {

		server.ee = new EventEmitter2({
			wildcard: true,
			delimiter: ':'
		});

		// setup forwarder
		server.on = function() {
			this.ee.on.apply(this.ee, arguments);
		};
	}

	return {
		extend: extend
	};
});
