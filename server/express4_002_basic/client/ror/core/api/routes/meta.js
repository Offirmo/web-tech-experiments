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

		this.id = 'actions'; // for debug

		this.match = function(uri) {
			return (uri === '/metas');
		};

		function get_data() {
			var metas = {
				version: config.version,
				tick_interval_ms: config.tick_interval_ms,
				speed: state.meta.speed,
				tick_count: state.meta.tick_count
			};
			return metas;
		}

		this.get = function(uri, options, when) {
			return when.resolve(get_data());
		};

		this.emit_changes = function() {
			server.ee.emit('/metas', get_data());
		};
	}


	return {
		make_new: function(server) { return new MetasRoute(server); }
	};
});
