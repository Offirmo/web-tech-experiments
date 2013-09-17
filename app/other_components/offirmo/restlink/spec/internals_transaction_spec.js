if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'offirmo/restlink/server_internals/server_transaction',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'offirmo/restlink/server_internals/rest_target_indexed_shared_container',
	'mocha'
],
function(chai, CUT, Request, Response, RestIndexedContainer) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	var request = Request.make_new();
	request.method = 'BREW';
	request.uri = '/stanford/teapot';

	describe('Restlink server transaction', function() {

		describe('instantiation', function() {

			it('should be instantiable', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();

				out.is_valid().should.be.true;
			});

		}); // describe feature

		describe('matching infos', function() {

			it('should be computed on demand', function() {
				var out = CUT.make_new();

				// the object need to be full fledged this time
				out.parent_session = {
					get_server : function() {
						return {
							rest_indexed_shared_container: RestIndexedContainer.make_new()
						};
					}
				};
				out.request = request;

				var match_infos = out.get_match_infos();
				match_infos.should.exist;
				match_infos.found.should.be.false;
			});

		}); // describe feature

		describe('utilities', function() {

			it('should allow easy response', function() {
				var out = CUT.make_new();

				// the object need to be full fledged this time
				out.parent_session = {
					get_server : function() {
						return {
							rest_indexed_shared_container: RestIndexedContainer.make_new()
						};
					}
				};
				out.request = request;

				var response = Response.make_new_from_request(request);
				var match_infos = out.get_match_infos();
				match_infos.should.exist;
				match_infos.found.should.be.false;
			});

		}); // describe feature

		describe('termination', function() {

			it('should be doable manually', function() {
				var out = CUT.make_new();

				out.invalidate();
				out.is_valid().should.be.false;
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
