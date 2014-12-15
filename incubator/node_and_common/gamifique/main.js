/** Gamifique = open gamification lib
 *
 */

// if node.js : use amdefine (add it with npm)
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
	'lodash',
	'eventemitter2'
],function(_, EventEmitter2 ) {
	'use strict';

	var EventEmitter = EventEmitter2.EventEmitter2;

	function Gamifique(options) {

		var ee = this.ee = new EventEmitter({
			wildcard: true,
			delimiter: ':',
		});

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


		ee.on('feat:*', function() {
			console.log(this.event, arguments);
		});
		ee.on('unlock:*', function() {
			console.log(this.event, arguments);
		});
		ee.on('reveal:*', function() {
			console.log(this.event, arguments);
		});


		var emit_feat = this.emit_feat = function(feat_id) {
			ee.emit('feat:' + feat_id);
		};
	}

	// convenient + clean interface
	function make_new(options) {
		return new Gamifique(options);
	}
	make_new.make_new = make_new;
	return make_new;
});
