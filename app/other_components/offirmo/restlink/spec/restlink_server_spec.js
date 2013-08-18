if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'underscore',
	'jquery',
	'offirmo/restlink/restlink_server',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/utils/http_constants',
	'mocha'
],
function(chai, _, jQuery, CUT, Request, Response, http_constants) {
	"use strict";

	var expect = chai.expect;
	chai.should();

	describe('restlink_server', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();

				out.is_started().should.be.false;
			});

		}); // describe feature

		describe('startup / shutdown', function() {

			it('should be able to start and stop', function() {
				var out = CUT.make_new();

				out.is_started().should.be.false;
				out.startup();
				out.is_started().should.be.true;
				out.shutdown();
				out.is_started().should.be.false;
			});

			it('should properly forward start and stop to adapters', function() {
				var out = CUT.make_new();

				var test_adapter
				out.startup();
				out.is_started().should.be.true;
				out.shutdown();
				out.is_started().should.be.false;
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
