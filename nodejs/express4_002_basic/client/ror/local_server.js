/* Rise of the replicators server
 * Following code is made to run in browser, web worker or node.js.
*/
define(
[
	'lodash',
	'logator',
	'server',
	'client',
],
function(_, Logator, RorServer, RorClient) {
	'use strict';

	return {
		make_new: function(options) {
			var logger = options.logger = options.logger || Logator.make_new();

			var server = RorServer.make_new(options);

			var client = RorClient.make_new(server, options);

		}
	};
});
