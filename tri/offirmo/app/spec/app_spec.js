if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'offirmo/app/app',
	'offirmo/base/backbone/named_object',
	'mocha'
],
function(chai, CUT, CUTParent) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('App', function() {

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
				out.get('denomination').should.equal('Unnamed app');
				out.get('url').should.equal('app');
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
