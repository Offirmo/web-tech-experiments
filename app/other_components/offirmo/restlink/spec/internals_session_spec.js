if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/restlink/server_internals/server_session',
	'mocha'
],
function(chai, CUT) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	describe('Restlink server session', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();

				out.get_creation_timestamp().should.be.above(0);
				out.get_last_access_timestamp().should.equals(out.get_creation_timestamp());

				out.get_timeout_in_millis().should.be.above(1000);

				out.is_valid().should.be.true;
			});

		}); // describe feature

		describe('termination', function() {

			it('should be automatic');

			it('should be doable manually', function() {
				var out = CUT.make_new();

				out.invalidate();
				out.is_valid().should.be.false;
			});

		}); // describe feature

		describe('transaction management', function() {

			it('should allow creation', function() {
				var out = CUT.make_new();

				var req = {};
				var trans = out.create_transaction(req);
				trans.should.exist;
				trans.should.be.an('object');
				trans.parent_session.should.equals(out);
				trans.request.should.equals(req);
			});

			it('should allow termination', function() {
				var out = CUT.make_new();

				var req = {};
				var trans = out.create_transaction(req);

				out.terminate_transaction(trans);
				trans.is_valid().should.be.false;
			});

			it('should propagate session termination', function() {
				var out = CUT.make_new();

				var req = {};
				var trans = out.create_transaction(req);

				out.invalidate();
				trans.is_valid().should.be.false; // invalidation propagated
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
