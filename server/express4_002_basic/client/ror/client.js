define(
[
	'lodash',
	'logator',
],
function(_, Logator) {
	'use strict';

	function RorClient(server, options) {
		// scan options
		options = options || {};

		var logger = options.logger || Logator.make_new();

		logger.log('Instantiating a new RoR client...');

		var state = {
		};

		var server_interface = {
			send_response: function() {

			}
		};
		server.add_client(server_interface);

		var ui_interface = {
			click: function(action_id) {
				// TODO
			}
		};

	}

	return {
		make_new: function(server, options) { return new RorClient(server, options); }
	};
});
