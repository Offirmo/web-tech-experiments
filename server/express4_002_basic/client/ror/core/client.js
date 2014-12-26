/** Rise of the replicators generic client
 */
define(
[
	'lodash',
	'when',
	'eventemitter2',
	'logator',
],
function(_, when, EventEmitter2, Logator) {
	'use strict';

	var EventEmitter = EventEmitter2.EventEmitter2;

	function RorClient(server, options) {
		// scan options
		options = options || {};
		options.max_log_count = options.max_log_count || 30;

		this.server = server;

		var logger = this.logger = options.logger || Logator.make_new();

		logger.log('Instantiating a new RoR client...');

		var state = this.state = {};
		this.story_log = [];

		// we'll be an event emitter
		var ee = this.ee = new EventEmitter2({
			wildcard: true,
			delimiter: ':'
		});
		// setup forwarder
		this.on = function() {
			this.ee.on.apply(this.ee, arguments);
		};


		/// accessors
		Object.defineProperty(this, 'log', {
			set: function(val) {
				throw new Error('not assignable !');
			},
			get: function() {
				return this.story_log;
			}
		});

		/// initial sync with server
		var initialMetas      = server.get('/metas');
		var initialCensus     = server.get('/census');
		var initialCurrencies = server.get('/currencies');

		when.all([
			initialMetas,
			initialCensus,
			initialCurrencies,
		])
		.then(function() {
			ee.emit('ready');
			ee.emit('fully_updated');
		});

		initialMetas.then(function(metas) {
			state.meta = metas;
			console.log('got meta', state.meta);
		});

		initialCensus.then(function(census) {
			state.census = census;
			console.log('got census', state.census);
			/*
			 server.on('census_update', function(census) {
			 var old = state.census;
			 state.census = census;
			 console.log('census updated', state.census, 'replacing', old);
			 });
			 */
		});

		initialCurrencies.then(function(currencies) {
			state.currencies = currencies;
			console.log('got currencies', state.currencies);
		});

		/// plug to server
		server.on('*', function() {
			console.log('seen server event :', this.event, arguments);
		});

		/*
		this.story_log = server.get_story();
		console.log('got story log', this.story_log);
		*/
	}
	RorClient.prototype.post_action = function(action_id, params) {
		this.server.post_action(action_id, params);
	};
	RorClient.prototype.clear_log = function() {
		this.story_log = [];
	};

	return {
		make_new: function(server, options) { return new RorClient(server, options); }
	};
});
