/** Rise of the replicators ...
 */
define(
[
	'lodash',
],
function(_) {
	'use strict';

	function MetasRoute(server) {

		var config = server.config;
		var state = server.state;

		this.match = function(uri) {
			return (uri === '/metas');
		};

		this.get = function(uri, options, when) {
			var res = {
				version: config.version,
				tick_interval_ms: config.tick_interval_ms,
				speed: state.meta.speed,
				tick_count: state.meta.tick_count
			};
			return when.resolve(res);
		};
	}


	return {
		make_new: function(server) { return new MetasRoute(server); }
	};
});
