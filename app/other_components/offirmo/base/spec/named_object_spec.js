"use strict";

if (typeof define !== 'function') { var define = require('amdefine')(module) }
//if (typeof requirejs !== 'function') { var requirejs = require('requirejs') }

describe('NamedObject', function() {

	var Backbone = require('backbone');
	var chai = require('chai');
	var CUT = require('offirmo/base/named_object');

	var expect = chai.expect;
	chai.should();

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
			// (none at this time)
		});

		it('should set default values', function() {
			var out = new CUT();
			out.get('denomination').should.exist.and.equal('Anonymous');
		});

	});

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
			out.validate(out.attributes).should.equal('Must have a denomination !');

			out.set('denomination', denomEmpty);
			out.validate(out.attributes).should.equal('Must have a non-empty denomination !');

			out.set('denomination', denomMin);
			expect(out.validate(out.attributes)).to.be.undefined; // REM : means OK for this method

			out.set('denomination', denomOK);
			expect(out.validate(out.attributes)).to.be.undefined; // REM : means OK for this method

			out.set('denomination', denomMax);
			expect(out.validate(out.attributes)).to.be.undefined; // REM : means OK for this method

			out.set('denomination', denomTooBig);
			out.validate(out.attributes).should.equal('Must have a denomination smaller than 70 chars !');
		});

	});

});
