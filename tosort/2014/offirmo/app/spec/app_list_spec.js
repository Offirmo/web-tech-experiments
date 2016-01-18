if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'offirmo/app/app_list',
	'offirmo/app/app',
	'mocha'
],
function(chai, CUT, App) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('AppList', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = new CUT();

				out.should.exist;
				out.should.be.an('object');
			});

			it('should have correct inheritance', function() {
				var out = new CUT();

				out.should.be.an.instanceof(CUT);
				out.model.should.equal(App);
			});

			it('should set default values', function() {
				var out = new CUT();
				out.length.should.equal(0);
			});

		});

		describe('sync', function() {

			it('should be unpersistable', function() {
				var out = new CUT();

				out.fetch();

				out.each(function(app) {
					//console.log(app.get('denomination'));
					app.should.be.an.instanceof(App);
				});
				out.length.should.be.within(1, 50);
			});

		});

	});
});
