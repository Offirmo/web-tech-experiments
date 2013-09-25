if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'offirmo/restlink/request',
	'offirmo/restlink/response',
	'mocha'
],
function(chai, CUT, Response) {
	"use strict";

	var expect = chai.expect;
	chai.should();
	chai.Assertion.includeStack = true; // defaults to false

	describe('Restlink Request', function() {

		describe('instantiation', function() {

			it('should work', function() {
				var out = CUT.make_new();
				out.should.exist;
				out.should.be.an('object');
			});

			it('should set default values', function() {
				var out = CUT.make_new();
				//out.get('denomination').should.exist.and.equal('Anonymous');
			});

		}); // describe feature

		describe('utilities', function() {

			it('should provide convenient fluid setters', function() {
				var out = CUT.make_new()
						.with_uri("/stanford/teapot")
						.with_method("BREW")
						.with_content("Do it !")
						.with_meta({ 'traceroute': true });

				out.method.should.equal("BREW");
				out.uri.should.equal("/stanford/teapot");
				out.content.should.equal("Do it !");
				out.meta.should.deep.equal({ 'traceroute': true });
			});

			it('should allow easy response creation', function() {
				var out = CUT.make_new();
				out.method = 'BREW';
				out.uri = '/stanford/teapot';

				var resp1 = out.make_response();
				resp1.method.should.equal('BREW');
				resp1.uri.should.equal('/stanford/teapot');
				resp1.return_code.should.equal(500);
				resp1.meta.should.deep.equal({});
				expect(resp1.content).to.be.undefined;

				// check if it's the same result as another way of creating a response
				// this ensure coherency of both methods
				var resp2 = Response.make_new_from_request(out);
				resp1.method.should.equal(resp2.method);
				resp1.uri.should.equal(resp2.uri);
				resp1.return_code.should.equal(resp2.return_code);
				resp1.meta.should.deep.equal(resp2.meta);
				expect(resp1.content).to.equal(resp2.content);
			});

		}); // describe feature

	}); // describe CUT
}); // requirejs module
