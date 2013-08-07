"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
[
	'chai',
	'offirmo/utils/http_constants'
],
function(chai, CUT) {

	var expect = chai.expect;
	chai.should();

	describe('HTTP constants', function() {

		describe('access', function() {

			it('should be direct', function() {
				var out = CUT;
				out.should.exist;
				out.should.be.an('object');
			});

			it('should be protected', function() {
				var out = CUT;

				var modify_prop = function() {
					out.status_codes.status_500_server_error_internal_error = 508;
				}
				modify_prop.should.throw('x');
				modify_prop.should.throw('"status_500_server_error_internal_error" is read-only').or.throw("Cannot assign to read only property 'status_500_server_error_internal_error' of #<Object>");
			});

		});

		describe('methods', function() {



		}); // describe feature

	});
});
