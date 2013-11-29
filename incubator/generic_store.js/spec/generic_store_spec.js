if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',

	'generic_store/generic_store',

	'mocha'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false




	describe('[Integration] Generic Store', function() {


		describe('instantiation', function() {

			it('should work for the in-memory store', function() {
				var out1 = CUT.make_new("memory");
				var out2 = CUT.make_new(CUT.constants.in_memory);
			});

			it('should work for the local storage store', function() {
				var out1 = CUT.get_existing("local");
				var out2 = CUT.get_existing(CUT.constants.local_storage);
			});

			it('should throw if unrecognized type');

			it('should throw if misused : in memory');

			it('should throw if misused : local storage');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
