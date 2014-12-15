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

		var config = {
		};

		var ee = this.ee = new EventEmitter({
			wildcard: true,
			delimiter: ':'
		});

		////////////////////////////////////
		var achievements = this.achievements = {};

		// achievement.name <-- id
		// achievement.
		achievements.add = function(achievement) {
			// TODO check param
			achievements[achievement.name] = achievement;
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

		////////////////////////////////////
		var feats = this.feats = {};
		var achieved_feats = this.achieved_feats = {};

		// feat.name <-- id
		feats.add = function(feat) {
			// TODO check param
			feat[feat.name] = feat;
			achieved_feats[feat.name] = {
				name: feat.name,
				feat: feat,
				count: 0
			};
		};


		////////////////////////////////////
		var check_achievement = function(achievement) {
			_.forEach(achievement.requirements, function(requirement) {

			});
		};

		var update_achievements = this.update_achievements = function() {
			// loop over achievements and test them
			_.forEach(achievements, check_achievement);
		};


		////////////////////////////////////
		ee.on('feat:*', function() {
			console.log(this.event, arguments);
		});
		ee.on('unlock:*', function() {
			console.log(this.event, arguments);
		});
		ee.on('reveal:*', function() {
			console.log(this.event, arguments);
		});


		var emit_feat = this.emit_feat = function(feat_name) {
			// find the feat
			var feat = feats[feat_id];
			// todo tests
			ee.emit('feat:' + feat.name + ' (' + feat.version + ')');
		};
	}

	// convenient + clean interface
	function make_new(options) {
		return new Gamifique(options);
	}
	make_new.make_new = make_new;
	return make_new;
});
