/** Rise of the replicators ...
 */
define(
[
	'lodash',
],
function(_) {
	'use strict';

	function ActionsRoute(server) {

		var config = server.config;
		var state = server.state;

		this.id = 'actions'; // for debug

		this.match = function(uri) {
			return (uri === '/actions');
		};

		var unique_action_id = 0;
		this.post = function(uri, data, options, when) {
			// format action
			var action = data;
			action.deferred = when.defer();

			// enqueue action in action queue
			server.fsm._.enqueue_action(action);

			return action.deferred.promise;
		};
	}


	return {
		make_new: function(server) { return new ActionsRoute(server); }
	};
});
