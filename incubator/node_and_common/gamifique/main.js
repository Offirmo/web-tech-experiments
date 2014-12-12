/** Gamifique = open gamification lib
 *
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash'
],function(_) {
	'use strict';

	function Gamifique(options) {
		var achievements = this.achievements = [];

		achievements.add = function(achievement) {
			// TODO check param
			achievements.push(achievement);
		};
		achievements.get_all = function() {
			return achievements;
		};
		achievements.get_revealed = function() {
			return xxx;
		};
		achievements.get_unlocked = function() {
			return xxx;
		};

	}

	// convenient + clean interface
	function make_new(options) {
		return new Gamifique(options);
	}
	make_new.make_new = make_new;
	return make_new;
});
