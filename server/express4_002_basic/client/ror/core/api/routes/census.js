/** Rise of the replicators ...
 */
define(
[
	'lodash',
],
function(_) {
	'use strict';

	function CensusRoute(server) {

		var config = server.config;
		var state = server.state;
		var Data = server.Data;

		this.match = function(uri) {
			return (uri === '/census');
		};

		function get_data() {
			// census must be sorted
			var census = [];
			_.forEach(Data.replicator_models_by_rank, function(model) {
				var unit_infos = state.units[model.id];
				if(! unit_infos) return; // not known yet
				var model_infos = _.clone(model);
				model_infos.count = unit_infos.count;
				census.push(model_infos);
			});
			//census.units = state.census.units;
			//census.free_units = state.census.free_units;
			return census;
		}

		this.get = function(uri, options, when) {
			return when.resolve(get_data());
		};

		this.emit_changes = function() {
			server.ee.emit('/census', get_data());
		};
	}

	return {
		make_new: function(server) { return new CensusRoute(server); }
	};
});
