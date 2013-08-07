if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/app/session'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('Session', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = new CUT();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should have correct inheritance', function() {

				var out = new CUT();
				out.should.be.an.instanceof(CUT);
				//out.should.be.an.instanceof(CUTParent);
			});

			it('should set default values', function() {
				var out = new CUT();
				//...
			});

		});

		describe('sync', function() {

			it('should be unpersistable', function() {
				var out = new CUT();

				out.fetch();

				// TODO
			});

			it('should be persistable'); /*, function() {
				var out = new CUT();

				out.save();

				// TODO
			});*/

		});

	});
});
