/** Rise of the replicators ...
*/
define(
[
	'lodash',
	'when',
	'../errors',
	'./routes/meta',
	'./routes/currencies',
	'./routes/census',
	'./routes/story/index',
	'./routes/actions',
],
function(_, when, Errors, MetaRoute, CurrenciesRoute, CensusRoute, StoryRoute, ActionsRoute) {
	'use strict';

	function extend(server) {
		var options = server.options;
		var logger = options.logger;

		var handlers = [
			      MetaRoute.make_new(server),
			CurrenciesRoute.make_new(server),
			    CensusRoute.make_new(server),
			     StoryRoute.make_new(server),
			   ActionsRoute.make_new(server),
		];

		function find_uri_handler(uri) {
			return _.find(handlers, function(possible_uri_handler) {
				return possible_uri_handler.match(uri);
			});
		}

		server.get = function Ror_GET(uri, options) {
			var promise;
			try {
				var uri_handler = find_uri_handler(uri);
				if(! uri_handler) return when.reject(new Errors.RouteNotFound());
				if(! uri_handler.get) return when.reject(new Errors.MethodNotAllowed());
				promise = uri_handler.get(uri, options, when);
				if(! when.isPromiseLike(promise))
					promise = when.reject(new Errors.InternalError('internal get handler didn’t return a promise !'));
			}
			catch(e) {
				promise = when.reject(e);
			}
			promise.catch(function(e) {
				logger.error('GET "' + uri + '" failed :', e);
			});
			return promise;
		};

		server.post = function Ror_POST(uri, data, options) {
			var promise;
			try {
				var uri_handler = find_uri_handler(uri);
				if(! uri_handler) return when.reject(new Errors.RouteNotFound());
				if(! uri_handler.post) return when.reject(new Errors.MethodNotAllowed());
				promise = uri_handler.post(uri, data, options, when);
				if(! when.isPromiseLike(promise))
					promise = when.reject(new Errors.InternalError('internal post handler didn’t return a promise !'));
			}
			catch(e) {
				promise = when.reject(e);
			}
			promise.catch(function(e) {
				logger.error('POST "' + uri + '" failed :', e);
			});
			return promise;
		};

		server.mark_API_data_as_dirty = function (uri, field) {
			// TODO
		};

		server.emit_changes = function () {
			_.forEach(handlers, function(handler) {
				if(handler.get) {
					if(! handler.emit_changes)
						throw new Errors.InternalError('API handler "' + handler.id + '" is missing its emit_changes() callback !');

					setTimeout(function() {
						handler.emit_changes();
					}, 0);
				}
			});
		};
	}

	return {
		extend: extend
	};
});
