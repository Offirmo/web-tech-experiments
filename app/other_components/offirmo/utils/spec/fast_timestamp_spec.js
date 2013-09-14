if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/utils/fast_timestamp',
	'mocha'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('Fast timestamps', function() {

		describe('generation', function() {

			it('should work', function() {
				var t1 = CUT.get_timestamp();
				t1.should.be.above(0);

				var t2 = CUT.get_timestamp();
				t2.should.be.at.least(t1);
			});

		});

		describe('comparison and elapsed time computation', function() {

			it('should work', function() {
				var t1 = CUT.get_timestamp();

				var diff = CUT.diff_timestamps_in_millis(t1, t1);
				diff.should.equals(0);

				var t2 = CUT.get_timestamp();
				t2 += 1000000; // even if res in micro, guaranted to be above 1 ms

				diff = CUT.diff_timestamps_in_millis(t1, t2);
				diff.should.be.above(0);
			});

		}); // describe feature

	});
});
