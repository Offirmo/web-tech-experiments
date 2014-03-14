/* Shared tests for compliance to the store.js API
 * >>> this.CUT MUST be set to the class under test.
 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'mocha'
],
function(chai) {
	"use strict";

	var expect = chai.expect;

	var should_implement_store_js_api = function() {
		describe('store.js API implementation [shared]', function() {

			describe("get() and set()", function() {

				it('should allow storage', function() {
					var out = this.CUT.make_new();

					// just checking the API exists
					// and doesn't trigger exceptions
					out.set("foo", "bar");
					out.set("toto", "titi");
					out.set("toto", "tata"); // replace
				});

				it('should allow retrieving', function() {
					var out = this.CUT.make_new();

					out.set("foo", "bar");
					expect( out.get('foo') ).to.equals( 'bar' );

					out.set("toto", "titi");
					expect( out.get('toto') ).to.equals( 'titi' );

					out.set("toto", "tata"); // replace
					expect( out.get('toto') ).to.equals( 'tata' );
				});

			}); // describe feature

			it('should allow remove()');

			it('should allow clear()');

			it('should allow getAll()');

			it('should allow forEach()');

			describe("underlying implementation", function() {

				it('should NOT store objects by reference', function() {
					var out = this.CUT.make_new();

					var obj1 = { answer: 42 };

					// simple set / get
					out.set("obj1", obj1);
					expect( out.get('obj1') ).to.deep.equals( { answer: 42 } );

					// now directly change our local copy of obj
					obj1.answer = 53;

					// and check it didn't change in the store
					expect( out.get('obj1') ).to.deep.equals( { answer: 42 } );

					// now level 2 : deep object
					var obj2 = { version: 3, result: obj1 };

					out.set("obj2", obj2);
					expect( out.get('obj2') ).to.deep.equals( { version: 3, result: { answer: 53 }} );

					// modify again our local copy of obj
					obj1.answer = 64;
					// and check it didn't change in the store
					expect( out.get('obj2') ).to.deep.equals( { version: 3, result: { answer: 53 }} );
				});

				it('should NOT serve accessed objects through a common reference', function() {
					var out = this.CUT.make_new();

					var obj1 = { answer: 42 };

					// set it and retrieve it 2 times
					out.set("obj1", obj1);
					var get11 = out.get('obj1');
					var get12 = out.get('obj1');

					// now change one of the instance : the other should not change
					get11.answer = 53;
					expect( get12 ).to.deep.equals( { answer: 42 } );

					// now level 2 : deep object
					var obj2 = { version: 3, result: obj1 };

					out.set("obj2", obj2);
					var get21 = out.get('obj2');
					var get22 = out.get('obj2');

					// now change one of the instance : the other should not change
					get22.version = 4;
					get22.result.answer = 64;

					expect( get21 ).to.deep.equals( { version: 3, result: { answer: 42 }} );
				});

			}); // describe feature

		}); // describe feature
	};

	return should_implement_store_js_api;

}); // requirejs module
