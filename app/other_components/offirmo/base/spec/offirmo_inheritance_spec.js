if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'offirmo/base/spec/offinh_sample_object',
	'offirmo/base/spec/offinh_sample_derived_object',
	'mocha'
],
function(chai, CUT1, CUT2) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('OffInh Inheritance', function() {

		describe('instantiation', function() {

			it('should work', function() {
				var out1 = CUT1.make_new();
				out1.should.exist;
				out1.should.be.an('object');

				var out2 = CUT2.make_new();
				out2.should.exist;
				out2.should.be.an('object');
			});

			it('should set default values', function() {
				var out1 = CUT1.make_new();
				//...
				var out2 = CUT2.make_new();
				//...
			});

		}); // describe feature

		describe('type detection', function() {

			it('should work', function() {
				var out1 = CUT1.make_new();
				out1.should.be.an.instanceOf(CUT1.klass);

				var out2 = CUT2.make_new();
				out2.should.be.an.instanceOf(CUT2.klass);
				out2.should.be.an.instanceOf(CUT1.klass);
			});

		}); // describe feature

		describe('defaults override', function() {

			it('should work');

		}); // describe feature

		describe('method override', function() {

			it('should work');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
