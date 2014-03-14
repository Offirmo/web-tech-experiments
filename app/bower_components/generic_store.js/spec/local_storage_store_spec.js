if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'generic_store/spec/common_store_api_spec',

	'generic_store/store_impl_local_storage',

	'mocha'
],
function(chai, should_implement_store_js_api, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false


	describe('Local Storage Generic Store', function() {


		describe('instantiation', function() {

			it('should work', function() {
				var out = CUT.instance();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.instance();

				expect(out.enabled).to.exist;
				//expect(out.internal_storage_).to.deep.equal({});
			});

		}); // describe feature

		describe('', function() {
			beforeEach(function(){
				this.CUT = CUT;
			});

			should_implement_store_js_api();
		});

		describe('implementation specifics', function() {

			it('should be shared', function() {
				var out1 = CUT.instance();
				var out2 = CUT.instance();

				out1.set("toto", "titi");
				out2.set("toto", "tata"); // different value

				// previous value was changed
				expect( out1.get('toto') ).to.equals( 'tata' );
				expect( out2.get('toto') ).to.equals( 'tata' );
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
