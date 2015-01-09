/** Gamifique = open gamification lib
 *
 */
'use strict';

var _ = require('lodash');
var EventEmitter = require('eventemitter2').EventEmitter2;
var expect = require('chai').expect;


function Gamifique(options) {

	var config = {
		achievements_update_debounce_ms: 250
	};

	var ee = this.ee = new EventEmitter({
		wildcard: true,
		delimiter: ':'
	});

	////////////////////////////////////
	var achievements = this.achievements = {};

	// API : add non-enumerable methods to our array
	Object.defineProperty(this.achievements, 'add', { value: function add_achievement(achievement) {
		// complete given achievement object with defaults
		_.defaults(achievement, {
			// name
			// description
			version: '', // to retain past achievements that were deprecated
			initially_hidden: false,
			requirements: []
		});
		// check params
		expect(achievement.name).to.be.a('string');
		expect(achievement.name).not.to.be.empty;
		// init state

		// TODO check param
		achievement.requirements = achievement.requirements || [];
		achievements[achievement.name] = achievement;
		_.forEach(achievement.requirements, function (requirement) {
			feats.add({name: requirement.feat});
		});
	}});
	Object.defineProperty(this.achievements, 'revealed', {
		enumerable: false,
		set: function(val) {
			throw new Error('not assignable !');
		},
		get: function() {
			return xxx;
		}
	});
	Object.defineProperty(this.achievements, 'unlocked', {
		enumerable: false,
		set: function(val) {
			throw new Error('not assignable !');
		},
		get: function() {
			return xxx;
		}
	});

	////////////////////////////////////
	// feat.name <-- id
	var feats = this.feats = {};

	Object.defineProperty(this.feats, 'add', {
		value: function (feat) {
			// TODO check param
			feat.count = 0;
			feats[feat.name] = feat;
			ee.on('feat:' + feat.name, function() {
				console.log('seen feat :', feat.name, arguments);
				feat.count++;
			});
		}
	});

	////////////////////////////////////
	// TODO !!
	// load_state
	// save_state



	////////////////////////////////////
	var reduce_requirement = function(accumulator, requirement) {
		//console.log('checking requirement', requirement, accumulator);
		var feat = feats[requirement.feat];
		accumulator.ops_needed += requirement.needed_quantity;
		accumulator.ops_done +=  Math.min(feat.count, requirement.needed_quantity);
		return accumulator;
	};
	var test_achievement = function(achievement) {
		var result = _.reduce(achievement.requirements, reduce_requirement, {
			ops_needed: 0,
			ops_done: 0,
		});
		result.total = (result.ops_done === result.ops_needed);
		result.percent = Math.round( 100.0 * result.ops_done / result.ops_needed);
		return result;
	};
	var unlock_achievement = function(achievement) {
		achievement.unlocked = true;
		ee.emit('unlock:' + achievement.name);
		ee.emit('feat:unlocked achievement ' + achievement.name);
	};
	var check_achievement = function(achievement) {
		if(achievement.unlocked) return; // obviously
		var result = test_achievement(achievement);
		if(result.total)
			unlock_achievement(achievement);
	};

	var update_achievements = this.update_achievements = function() {
		// loop over achievements and test them
		_.forEach(achievements, check_achievement);
	};
	var debounced_update_achievements = _.debounce(
		_.bind(update_achievements, this),
		config.achievements_update_debounce_ms
	);


	////////////////////////////////////
	ee.on('feat:*', function() {
		console.log('seen event :', this.event, arguments);
		debounced_update_achievements();
	});
	ee.on('unlock:*', function() {
		console.log('seen event :', this.event, arguments);
	});
	ee.on('reveal:*', function() {
		console.log('seen event :', this.event, arguments);
	});


	var emit_feat = this.emit_feat = function(feat_name) {
		// find the feat
		var feat = feats[feat_name];
		// todo tests
		ee.emit('feat:' + feat.name);
	};
}

// convenient + clean interface
function make_new(options) {
	return new Gamifique(options);
}
make_new.make_new = make_new;
module.exports = make_new;

