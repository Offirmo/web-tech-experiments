"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/account/account',
	'offirmo/base/named_object'
],
function(chai, CUT, CUTParent) {

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

	});
});
