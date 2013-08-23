if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/base/backbone/example_object',
	'offirmo/base/backbone/named_object',
	'mocha'
],
function(chai, CUT, CUTParent) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('ExampleObject', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = new CUT();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should have correct inheritance', function() {

				var out = new CUT();
				out.should.be.an.instanceof(CUT);
				// test immediate ancestor(s)
				out.should.be.an.instanceof(CUTParent);
			});

			it('should set default values', function() {
				var out = new CUT();
				//out.get('denomination').should.exist.and.equal('Anonymous');
			});

		}); // describe feature

		describe('denomination', function() {

			it('should be gettable and settable', function() {
				var out = new CUT();

				out.get('denomination').should.equal('Anonymous');

				var denom1 = 'Kevin';

				out.set('denomination', denom1);
				out.get('denomination').should.equal(denom1);
			});

			it('should be validated', function() {
				var out = new CUT();

				var denomEmpty  = '';
				var denomMin    = 'X';
				var denomOK     = 'Kevin';
				var denomMax    = '1111111111222222222233333333334444444444555555555566666666667777777777';
				var denomTooBig = '11111111112222222222333333333344444444445555555555666666666677777777778';

				// o.u.t. still has its default denomination
				out.validate(out.attributes).should.equal('Must have a non-default denomination !');

				out.set('denomination', undefined);
				out.isValid().should.be.false;
				out.validationError.should.equal('Must have a denomination !');

				out.set('denomination', denomEmpty);
				out.isValid().should.be.false;
				out.validationError.should.equal('Must have a non-empty denomination !');

				out.set('denomination', denomMin);
				out.isValid().should.be.true;

				out.set('denomination', denomOK);
				out.isValid().should.be.true;

				out.set('denomination', denomMax);
				out.isValid().should.be.true;

				out.set('denomination', denomTooBig);
				out.isValid().should.be.false;
				out.validationError.should.equal('Must have a denomination smaller than 70 chars !');
			});

		}); // describe feature

		describe('sync', function() {

			it('should generate its url correctly', function() {
				// just testing backbone features
				var out = new CUT();
				out.set('denomination', '123');
				out.compute_url().should.equal('exampleobject/123');
			});

			it('should be unpersistable', function() {
				var out = new CUT();

				//expect(out.fetch()).to.throw('IdentityList sync : list not linked to an account !');
			});

			it('should be persistable');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
