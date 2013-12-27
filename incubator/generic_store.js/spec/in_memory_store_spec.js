if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'generic_store/spec/common_store_api_spec',

	'generic_store/store_impl_memory',

	'mocha'
],
function(chai, should_implement_store_js_api, CUT) {
	"use strict";

	var expect = chai.expect;
	//chai.should();
	chai.Assertion.includeStack = true; // defaults to false


	describe('In Memory Generic Store', function() {


		describe('instantiation', function() {

			it('should work', function() {
				var out = CUT.make_new();
				expect( out ).to.exist;
				expect( out ).to.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();

				expect(out.internal_storage_).to.deep.equal({});
				expect(out.enabled).to.be.true
			});

		}); // describe feature

		describe('', function() {
			beforeEach(function(){
				this.CUT = CUT;
			});

			should_implement_store_js_api();
		});

		describe('implementation specifics', function() {

			it('should allow creation of several isolated stores', function() {
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
