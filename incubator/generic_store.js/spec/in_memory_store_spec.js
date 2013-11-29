if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',

	'generic_store/store_impl_memory',

	'mocha'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false


	describe('In Memory Generic Store', function() {


		describe('instantiation', function() {

			it('should work', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();

				expect(out.internal_storage_).to.deep.equal({});
				expect(out.enabled).to.be.true
			});

		}); // describe feature

		describe('storage', function() {

			it('should allow storage', function() {
				var out = CUT.make_new();

				out.set("foo", "bar");
				out.set("toto", "titi");
				out.set("toto", "tata"); // replace
			});

			it('should allow retrieving', function() {
				var out = CUT.make_new();

				out.set("foo", "bar");
				expect( out.get('foo') ).to.equals( 'bar' );

				out.set("toto", "titi");
				expect( out.get('toto') ).to.equals( 'titi' );

				out.set("toto", "tata"); // replace
				expect( out.get('toto') ).to.equals( 'tata' );
			});

			it('should be isolated from other stores', function() {
				var out1 = CUT.make_new();
				var out2 = CUT.make_new();

				out1.set("toto", "titi");
				out2.set("toto", "tata"); // different value

				expect( out1.get('toto') ).to.equals( 'titi' );
				expect( out2.get('toto') ).to.equals( 'tata' );
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
