if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',

	'generic_store/generic_store', // to create test stores
	'offirmo_app/client/session_footprint',

	'mocha'
],
function(chai, GenericStore, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false


	describe('Offirmo App Session Footprint', function() {


		describe('instantiation', function() {

			it('should work', function() {
				var store = GenericStore.make_new("memory");
				var out = CUT.instance(store);

				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var store = GenericStore.make_new("memory");
				var out = CUT.instance(store);

				out.return_code.should.equal(http_constants.status_codes.status_500_server_error_internal_error);
				expect(out.content).to.equals("");
			});

			it('should retrieve existing values', function() {
				var store = GenericStore.make_new("memory");
				// pre-fill the store with data

				var out = CUT.instance(store);
				// ...
			});

		}); // describe feature

		describe('utilities', function() {

			it('should allow full reset');
			it('should allow prefix usage');

		}); // describe feature

	}); // describe CUT
}); // requirejs module
