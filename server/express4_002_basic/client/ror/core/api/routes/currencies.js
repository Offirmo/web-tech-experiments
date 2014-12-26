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

		this.match = function(uri) {
			return (uri === '/currencies');
		};

		this.get = function(uri, options, when) {
			// currencies must be sorted
			var currencies = [];
			_.forEach(Data.currencies, function(currency) {
				var currency_infos = state.currencies[currency.id];
				if(! currency_infos) return; // not known yet
				var exposed_infos = _.clone(currency);
				exposed_infos.count = currency_infos.count;
				currencies.push(exposed_infos);
			});
			return when.resolve(currencies);
		};
	}

	return {
		make_new: function(server) { return new CurrenciesRoute(server); }
	};
});
