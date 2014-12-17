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
		console.log('checking requirement', requirement, accumulator);
		var feat = feats[requirement.feat];
		accumulator.ops_needed += requirement.needed_quantity;
		accumulator.ops_done +=  Math.min(feat.count, requirement.needed_quantity);
		return accumulator;
	};
	var check_achievement = function(achievement) {
		console.log('checking achievement', achievement);
		var result = _.reduce(achievement.requirements, reduce_requirement, {
			ops_needed: 0,
			ops_done: 0,
		});
		result.total = (result.ops_done === result.ops_needed);
		result.percent = Math.round( 100.0 * result.ops_done / result.ops_needed);
		console.log(result);
		if(result.total) {
			ee.emit('unlock:' + achievement.name);
		}
	};

	var update_achievements = this.update_achievements = function() {
		// loop over achievements and test them
		_.forEach(achievements, check_achievement);
	};


	////////////////////////////////////
	ee.on('feat:*', function() {
		console.log('seen event :', this.event, arguments);
		update_achievements();
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

