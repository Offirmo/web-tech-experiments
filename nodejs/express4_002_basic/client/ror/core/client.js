/** Rise of the replicators generic client
 */
define(
[
	'lodash',
	'when',
	'eventemitter2',
	'logator',
	'./static_data',
],
function(_, when, EventEmitter2, Logator, Data) {
	'use strict';

	var EventEmitter = EventEmitter2.EventEmitter2;

	function RorClient(server, options) {
		// scan options
		options = options || {};
		options.max_log_count = options.max_log_count || 30;

		this.server = server;
		this.Data = Data;

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
		var initialStory      = server.get('/story');

		when.all([
			initialMetas,
			initialCensus,
			initialCurrencies,
			initialStory
		])
		.then(function() {
			ee.emit('ready');
			ee.emit('update');
		});

		initialMetas.then(function(metas) {
			state.meta = metas;
			console.log('got meta', state.meta);
			server.on('/metas', function(metas) {
				state.meta = metas;
				ee.emit('update');
			});
		});

		initialCensus.then(function(census) {
			state.census = census;
			console.log('got census', state.census);
			server.on('/census', function(census) {
				state.census = census;
				ee.emit('update');
			});
		});

		initialCurrencies.then(function(currencies) {
			state.currencies = currencies;
			console.log('got currencies', state.currencies);
			server.on('/currencies', function(currencies) {
				state.currencies = currencies;
				ee.emit('update');
			});
		});

		initialStory.then(function(story) {
			state.story = story;
			console.log('got story', state.story);
			server.on('/story', function(story) {
				state.story = story;
				ee.emit('update');
			});
		});


		/// plug to server

		/*
		this.story_log = server.get_story();
		console.log('got story log', this.story_log);
		*/
	}
	RorClient.prototype.post_action = function(action_id, params) {
		var action = params || {};
		action.id = action_id;
		return this.server.post('/actions', action);
	};
	RorClient.prototype.clear_log = function() {
		this.story_log = [];
	};

	return {
		make_new: function(server, options) { return new RorClient(server, options); }
	};
});
