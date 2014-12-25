define(
[
	'lodash',
	'eventemitter2',
	'logator',
],
function(_, EventEmitter2, Logator) {
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
		state.meta = server.get_meta();
		console.log('got meta', state.meta);

		state.census = server.get_census();
		console.log('got census', state.census);

		this.story_log = server.get_story();
		console.log('got story log', this.story_log);

		/// plug to server
		server.on('*', function() {
			console.log('seen server event :', this.event, arguments);
		});
		server.on('census_update', function(census) {
			var old = state.census;
			state.census = census;
			console.log('census updated', state.census, 'replacing', old);
		});

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
