/** Rise of the replicators ...
 */
define(
[
	'lodash',
],
function(_) {
	'use strict';

	function CurrenciesRoute(server) {

		var config = server.config;
		var state = server.state;
		var Data = server.Data;

		this.id = 'actions'; // for debug

		this.match = function(uri) {
			return (uri === '/currencies');
		};

		function get_data() {
			// currencies must be sorted
			var currencies = [];
			_.forEach(Data.currencies, function(currency) {
				var currency_infos = state.currencies[currency.id];
				if(! currency_infos) return; // not known yet
				var exposed_infos = _.clone(currency);
				exposed_infos.count = currency_infos.count;
				currencies.push(exposed_infos);
			});
			return currencies;
		}

		this.get = function(uri, options, when) {
			return when.resolve(get_data());
		};

		this.emit_changes = function() {
			server.ee.emit('/currencies', get_data());
		};
	}

	return {
		make_new: function(server) { return new CurrenciesRoute(server); }
	};
});
