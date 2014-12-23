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

		var logger = options.logger || Logator.make_new();

		logger.log('Instantiating a new RoR client...');

		var state = this.state = {};
		var story_log = this.story_log = [];

		/// accessors
		Object.defineProperty(this, 'log', {
			set: function(val) {
				throw new Error('not assignable !');
			},
			get: function() {
				return story_log;
			}
		});

		/// synchronize with server
		state.meta = server.get_meta();
		console.log('got meta', state.meta);

		state.census = server.get_census();
		console.log('got census', state.census);

		/// plug to server
		server.on('*', function() {
			console.log('seen server event :', this.event, arguments);
		});
	}
	RorClient.prototype.post_action = function(action_id, params) {
		// TODO
	};
	RorClient.prototype.clear_log = function() {
		this.story_log = [];
	};

	return {
		make_new: function(server, options) { return new RorClient(server, options); }
	};
});
