if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'offirmo/app/identity_list',
	'offirmo/app/identity',
	'mocha'
],
function(chai, CUT, Model) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('IdentityList', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = new CUT();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should have correct inheritance', function() {
				var out = new CUT();
				out.should.be.an.instanceof(CUT);
				//out.model.should.equal(Model);
			});

			it('should set default values', function() {
				var out = new CUT();
				//out.length.should.equal(0);
			});

		}); // describe feature

		describe('sync', function() {

			it('should be unpersistable', function() {
				var out = new CUT();

				// helper function
				var fetchFunc = function(){ out.fetch(); };

				// first
				fetchFunc.should.throw('IdentityList sync : list not linked to an account !');

				out.set('account_denomination', 'test account');

				//out.fetch();

			});

			it('should be persistable');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
