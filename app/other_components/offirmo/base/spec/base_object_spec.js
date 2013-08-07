if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/base/base_object'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('BaseObject', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = new CUT();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should have correct inheritance', function() {

				var out = new CUT();
				out.should.be.an.instanceof(CUT);
				// no ancestors : this is the base !
			});

			it('should set default values', function() {
				var out = new CUT();
				out.get('serialization_version').should.exist.and.equal(0);
			});

		});

		describe('serialization version', function() {

			it('should be gettable and settable', function() {
				var out = new CUT();

				out.get('serialization_version').should.equal(0);

				var attr1 = 123;

				out.set('serialization_version', attr1);
				out.get('serialization_version').should.equal(attr1);
			});

			it('should be validated', function() {
				var out = new CUT();

				var attrUndef    = undefined;
				var attrBadType1 = "123";
				var attrBadType2 = 12.3;
				var attrTooSmall = -1;
				var attrMin      = 0;
				var attrOK       = 12345;

				// o.u.t. still has its default denomination
				expect(out.validate(out.attributes)).to.be.undefined; // REM : means OK for this method

				out.set('serialization_version', attrUndef);
				out.validate(out.attributes).should.equal('Must have a serialization version !');

				out.set('serialization_version', attrBadType1);
				out.validate(out.attributes).should.equal('Serialization version must be a number !');

				out.set('serialization_version', attrBadType2);
				// TODO reactivate
				//out.validate(out.attributes).should.equal('Must have a non-empty denomination !');

				out.set('serialization_version', attrTooSmall);
				out.validate(out.attributes).should.equal('Serialization version must be >= 0 !');

				out.set('serialization_version', attrMin);
				expect(out.validate(out.attributes)).to.be.undefined; // REM : means OK for this method

				out.set('serialization_version', attrOK);
				expect(out.validate(out.attributes)).to.be.undefined; // REM : means OK for this method
			});

		}); // describe feature

		describe('sync helpers', function() {

			it('should generate its url correctly', function() {
				// just testing backbone features
				var out = new CUT();
				out.set('id', 123);
				out.compute_url().should.equal('basemodel/123');
			});

			it('should use Backbone features', function() {
				// just testing backbone features
				var out = new CUT();
				/*console.log('id      = ' + out.get('id'));
				console.log('url     = ' + out.get('url'));
				console.log('urlRoot = ' + out.get('urlRoot'));
				console.log('cid     = ' + out.get('cid'));
				console.log('curl    = ' + out.compute_url());*/
			});

			it('should store cache informations');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
