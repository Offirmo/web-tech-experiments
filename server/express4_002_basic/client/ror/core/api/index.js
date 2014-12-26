/** Rise of the replicators ...
*/
define(
[
	'lodash',
	'when',
	'../errors',
	'./routes/meta',
	'./routes/currencies',
	'./routes/census'
],
function(_, when, Errors, MetaRoute, CurrenciesRoute, CensusRoute) {
	'use strict';

	function extend(server) {
		var options = server.options;
		var logger = options.logger;

		var handlers = [
			MetaRoute.make_new(server),
			CurrenciesRoute.make_new(server),
			CensusRoute.make_new(server),
		];

		function find_uri_handler(uri) {
			return _.find(handlers, function(possible_uri_handler) {
				return possible_uri_handler.match(uri);
			});
		}

		server.get = function Ror_GET(uri, options) {
			try {
				var uri_handler = find_uri_handler(uri);
				if(! uri_handler) return when.reject(new Errors.RouteNotFound());
				if(! uri_handler.get) return when.reject(new Errors.MethodNotAllowed());
				var ret = uri_handler.get(uri, options, when);
				if(! when.isPromiseLike(ret))
					return when.reject(new Errors.InternalError('internal get handler didnt return a promise'));
				return ret;
			}
			catch(e) {
				return when.reject(e);
			}
		};

		server.POST = function Ror_POST(uri, data, options) {
			try {
				var uri_handler = find_uri_handler(uri);
				if(! uri_handler) return when.reject(new Errors.RouteNotFound());
				if(! uri_handler.post) return when.reject(new Errors.MethodNotAllowed());
				var ret = uri_handler.post(uri, data, options, when);
				if(! when.isPromiseLike(ret))
					return when.reject(new Errors.InternalError('internal get handler didnt return a promise'));
				return ret;
			}
			catch(e) {
				return when.reject(e);
			}
		};
	}

	return {
		extend: extend
	};
});
