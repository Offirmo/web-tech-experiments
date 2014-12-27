/** Rise of the replicators ...
 */
define(
[
	'lodash',
],
function(_) {
	'use strict';

	function StoryRoute(server) {

		var config = server.config;
		var state = server.state;

		this.match = function(uri) {
			return (uri === '/story');
		};

		function get_data() {
			var story = _.cloneDeep(state.story._);
			return story;
		}

		this.get = function(uri, options, when) {
			return when.resolve(get_data());
		};

		this.emit_changes = function() {
			server.ee.emit('/story', get_data());
		};
	}


	return {
		make_new: function(server) { return new StoryRoute(server); }
	};
});
