if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/app/account',
	'offirmo/base/named_object'
],
function(chai, CUT, CUTParent) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('Account', function() {
		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = new CUT();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should have correct inheritance', function() {
				var out = new CUT();
				out.should.be.an.instanceof(CUT);
				out.should.be.an.instanceof(CUTParent);
			});

			it('should set default values', function() {
				var out = new CUT();
				//...
			});

		});

		describe('sync', function() {

			it('should generate its url correctly', function() {
				// just testing backbone features
				var out = new CUT();
				out.set('denomination', 'Kevin');
				out.compute_url().should.equal('account/Kevin');
			});

			it('should be persistable');

			it('should be unpersistable', function() {
				var out = new CUT();

				// first a bad fetch
				expect(out.fetch()).to.throw('IdentityList sync : list not linked to an account !');

				// now we need a restlink server to be able to answer
				out.set('restlink', todo);

				out.set('account_denomination', 'test account');
				out.fetch();
			});

		});

	});
});
